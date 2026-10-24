-- =============================================================================
-- Masterclasses: admin-managed free live events with public registration.
--
-- Run once in Supabase → SQL Editor (or `supabase db push`). Safe to re-run:
-- every statement is idempotent.
--
-- Security model (the site is a static export, so the browser talks to
-- Supabase directly with the anon key — RLS is the security boundary):
--   * Anyone can read PUBLISHED masterclasses (never drafts or archived).
--   * Meeting links live in a separate admin-only table and are revealed only
--     to someone who has just registered (via register_for_masterclass).
--   * Registrations can only be created through register_for_masterclass(),
--     which validates every field, enforces deadline/capacity and blocks
--     duplicates. Nobody but an admin can read registrations.
--   * Admin = profiles.is_admin = true (same flag the existing /admin uses).
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Admin helper (SECURITY DEFINER so it can read profiles regardless of RLS)
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.masterclasses (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique
                           check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 3 and 80),
  title                  text not null check (char_length(btrim(title)) between 3 and 160),
  subtitle               text not null default '' check (char_length(subtitle) <= 300),
  description            text not null default '' check (char_length(description) <= 10000),
  topics                 text[] not null default '{}' check (cardinality(topics) <= 20),
  starts_at              timestamptz not null,
  timezone               text not null default 'America/New_York' check (char_length(timezone) <= 64),
  duration_minutes       integer not null default 60 check (duration_minutes between 15 and 600),
  instructor_name        text not null default '' check (char_length(instructor_name) <= 120),
  instructor_title       text not null default '' check (char_length(instructor_title) <= 160),
  banner_url             text not null default '' check (char_length(banner_url) <= 1000),
  price_label            text not null default 'FREE' check (char_length(price_label) <= 40),
  capacity               integer check (capacity is null or capacity between 1 and 100000),
  registration_deadline  timestamptz,
  next_step_title        text not null default '' check (char_length(next_step_title) <= 160),
  next_step_body         text not null default '' check (char_length(next_step_body) <= 2000),
  next_step_points       text[] not null default '{}' check (cardinality(next_step_points) <= 12),
  next_step_url          text not null default '' check (char_length(next_step_url) <= 500),
  next_step_cta          text not null default 'Learn more' check (char_length(next_step_cta) <= 60),
  status                 text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by             uuid default auth.uid(),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists masterclasses_status_starts_idx
  on public.masterclasses (status, starts_at);

-- Admin-only details that must never be readable by the public.
create table if not exists public.masterclass_private (
  masterclass_id  uuid primary key references public.masterclasses (id) on delete cascade,
  meeting_link    text not null default '' check (char_length(meeting_link) <= 1000),
  updated_at      timestamptz not null default now()
);

create table if not exists public.masterclass_registrations (
  id              uuid primary key default gen_random_uuid(),
  masterclass_id  uuid not null references public.masterclasses (id) on delete cascade,
  full_name       text not null check (char_length(full_name) between 2 and 120),
  email           text not null check (char_length(email) between 5 and 254),
  profession      text not null default '' check (char_length(profession) <= 160),
  created_at      timestamptz not null default now()
);

-- One registration per email per event (case-insensitive).
create unique index if not exists masterclass_registrations_unique_email
  on public.masterclass_registrations (masterclass_id, lower(email));
create index if not exists masterclass_registrations_event_idx
  on public.masterclass_registrations (masterclass_id, created_at);

-- Keep updated_at fresh.
create or replace function public.masterclasses_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists masterclasses_touch on public.masterclasses;
create trigger masterclasses_touch before update on public.masterclasses
  for each row execute function public.masterclasses_touch();

drop trigger if exists masterclass_private_touch on public.masterclass_private;
create trigger masterclass_private_touch before update on public.masterclass_private
  for each row execute function public.masterclasses_touch();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.masterclasses enable row level security;
alter table public.masterclass_private enable row level security;
alter table public.masterclass_registrations enable row level security;

drop policy if exists "Public reads published masterclasses" on public.masterclasses;
create policy "Public reads published masterclasses" on public.masterclasses
  for select to anon, authenticated
  using (status = 'published' or public.is_admin());

drop policy if exists "Admins insert masterclasses" on public.masterclasses;
create policy "Admins insert masterclasses" on public.masterclasses
  for insert to authenticated with check (public.is_admin());

drop policy if exists "Admins update masterclasses" on public.masterclasses;
create policy "Admins update masterclasses" on public.masterclasses
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins delete masterclasses" on public.masterclasses;
create policy "Admins delete masterclasses" on public.masterclasses
  for delete to authenticated using (public.is_admin());

drop policy if exists "Admins manage private details" on public.masterclass_private;
create policy "Admins manage private details" on public.masterclass_private
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins read registrations" on public.masterclass_registrations;
create policy "Admins read registrations" on public.masterclass_registrations
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins delete registrations" on public.masterclass_registrations;
create policy "Admins delete registrations" on public.masterclass_registrations
  for delete to authenticated using (public.is_admin());
-- No insert/update policy on registrations: inserts go through the function below.

grant select on public.masterclasses to anon, authenticated;
grant insert, update, delete on public.masterclasses to authenticated;
grant select, insert, update, delete on public.masterclass_private to authenticated;
grant select, delete on public.masterclass_registrations to authenticated;
revoke insert, update on public.masterclass_registrations from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Public: register for a masterclass (all validation happens here, server-side)
-- Returns json: { status: 'registered' | 'already_registered', meeting_link }
-- Raises a readable error for anything invalid.
-- ---------------------------------------------------------------------------
create or replace function public.register_for_masterclass(
  p_masterclass_id uuid,
  p_full_name text,
  p_email text,
  p_profession text default ''
)
returns json
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_mc          public.masterclasses%rowtype;
  v_name        text := btrim(coalesce(p_full_name, ''));
  v_email       text := lower(btrim(coalesce(p_email, '')));
  v_profession  text := btrim(coalesce(p_profession, ''));
  v_taken       integer;
  v_link        text;
  v_inserted    uuid;
begin
  if char_length(v_name) < 2 or char_length(v_name) > 120 then
    raise exception 'Please enter your full name (2–120 characters).' using errcode = '22023';
  end if;
  if v_name ~ '[<>]' or v_name ~ '(https?://|www\.)' then
    raise exception 'Please enter a valid name.' using errcode = '22023';
  end if;
  if char_length(v_email) > 254
     or v_email !~ '^[a-z0-9._%+''-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$' then
    raise exception 'Please enter a valid email address.' using errcode = '22023';
  end if;
  if char_length(v_profession) > 160 or v_profession ~ '[<>]' then
    raise exception 'Profession must be 160 characters or fewer.' using errcode = '22023';
  end if;

  -- Lock the event row so capacity checks can't race.
  select * into v_mc from public.masterclasses where id = p_masterclass_id for update;
  if not found or v_mc.status <> 'published' then
    raise exception 'This masterclass is not open for registration.' using errcode = 'P0002';
  end if;
  if now() > coalesce(v_mc.registration_deadline, v_mc.starts_at + make_interval(mins => v_mc.duration_minutes)) then
    raise exception 'Registration for this masterclass has closed.' using errcode = 'P0001';
  end if;

  select meeting_link into v_link from public.masterclass_private where masterclass_id = v_mc.id;

  if exists (
    select 1 from public.masterclass_registrations
    where masterclass_id = v_mc.id and lower(email) = v_email
  ) then
    return json_build_object('status', 'already_registered', 'meeting_link', coalesce(v_link, ''));
  end if;

  if v_mc.capacity is not null then
    select count(*) into v_taken from public.masterclass_registrations where masterclass_id = v_mc.id;
    if v_taken >= v_mc.capacity then
      raise exception 'This masterclass is full.' using errcode = 'P0001';
    end if;
  end if;

  insert into public.masterclass_registrations (masterclass_id, full_name, email, profession)
  values (v_mc.id, v_name, v_email, v_profession)
  on conflict do nothing
  returning id into v_inserted;

  if v_inserted is null then
    return json_build_object('status', 'already_registered', 'meeting_link', coalesce(v_link, ''));
  end if;

  return json_build_object('status', 'registered', 'meeting_link', coalesce(v_link, ''));
end;
$$;

revoke all on function public.register_for_masterclass(uuid, text, text, text) from public;
grant execute on function public.register_for_masterclass(uuid, text, text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Public: seats left for published events (counts only, never attendee data)
-- ---------------------------------------------------------------------------
create or replace function public.masterclass_availability(p_ids uuid[])
returns table (masterclass_id uuid, registered integer, seats_left integer)
language sql
stable
security definer
set search_path = public
as $$
  select m.id,
         case when public.is_admin() then count(r.id)::int else null end,
         case when m.capacity is null then null
              else greatest(m.capacity - count(r.id)::int, 0) end
  from public.masterclasses m
  left join public.masterclass_registrations r on r.masterclass_id = m.id
  where m.id = any(p_ids)
    and (m.status = 'published' or public.is_admin())
  group by m.id, m.capacity;
$$;

revoke all on function public.masterclass_availability(uuid[]) from public;
grant execute on function public.masterclass_availability(uuid[]) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Admin: duplicate an event (copies details + meeting link, resets to draft)
-- ---------------------------------------------------------------------------
create or replace function public.duplicate_masterclass(p_id uuid)
returns uuid
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_src  public.masterclasses%rowtype;
  v_new  uuid;
  v_slug text;
  v_n    integer := 2;
begin
  if not public.is_admin() then
    raise exception 'Admin access required.' using errcode = '42501';
  end if;
  select * into v_src from public.masterclasses where id = p_id;
  if not found then
    raise exception 'Masterclass not found.' using errcode = 'P0002';
  end if;

  v_slug := left(regexp_replace(v_src.slug, '-copy(-[0-9]+)?$', ''), 70) || '-copy';
  while exists (select 1 from public.masterclasses where slug = v_slug) loop
    v_slug := left(regexp_replace(v_src.slug, '-copy(-[0-9]+)?$', ''), 70) || '-copy-' || v_n;
    v_n := v_n + 1;
  end loop;

  insert into public.masterclasses (
    slug, title, subtitle, description, topics, starts_at, timezone, duration_minutes,
    instructor_name, instructor_title, banner_url, price_label, capacity, registration_deadline,
    next_step_title, next_step_body, next_step_points, next_step_url, next_step_cta, status, created_by
  ) values (
    v_slug, left(v_src.title || ' (copy)', 160), v_src.subtitle, v_src.description, v_src.topics,
    v_src.starts_at + interval '7 days', v_src.timezone, v_src.duration_minutes,
    v_src.instructor_name, v_src.instructor_title, v_src.banner_url, v_src.price_label, v_src.capacity,
    case when v_src.registration_deadline is null then null else v_src.registration_deadline + interval '7 days' end,
    v_src.next_step_title, v_src.next_step_body, v_src.next_step_points, v_src.next_step_url, v_src.next_step_cta,
    'draft', auth.uid()
  ) returning id into v_new;

  insert into public.masterclass_private (masterclass_id, meeting_link)
  select v_new, meeting_link from public.masterclass_private where masterclass_id = p_id;

  return v_new;
end;
$$;

revoke all on function public.duplicate_masterclass(uuid) from public;
grant execute on function public.duplicate_masterclass(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Storage bucket for banner images (public read, admin write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('masterclass-banners', 'masterclass-banners', true)
on conflict (id) do nothing;

drop policy if exists "Public reads masterclass banners" on storage.objects;
create policy "Public reads masterclass banners" on storage.objects
  for select to anon, authenticated using (bucket_id = 'masterclass-banners');

drop policy if exists "Admins upload masterclass banners" on storage.objects;
create policy "Admins upload masterclass banners" on storage.objects
  for insert to authenticated with check (bucket_id = 'masterclass-banners' and public.is_admin());

drop policy if exists "Admins update masterclass banners" on storage.objects;
create policy "Admins update masterclass banners" on storage.objects
  for update to authenticated using (bucket_id = 'masterclass-banners' and public.is_admin());

drop policy if exists "Admins delete masterclass banners" on storage.objects;
create policy "Admins delete masterclass banners" on storage.objects
  for delete to authenticated using (bucket_id = 'masterclass-banners' and public.is_admin());
