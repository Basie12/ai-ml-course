# Masterclasses — setup and admin guide

Free live masterclasses that you create, publish and manage from the website. No code changes or redeploys are needed after the one-time setup below.

| Page | Who | What |
|------|-----|------|
| `/masterclasses/` | Public | Upcoming published masterclasses |
| `/masterclasses/event/?slug=<slug>` | Public | Event details + registration form |
| `/admin/masterclasses/` | Admins | Add, edit, publish, duplicate, archive, delete; view attendees; export CSV |

The **🚀 Join Free AI/ML Masterclass** button in the header and the homepage hero links to `/masterclasses/`.

---

## One-time setup (about 5 minutes)

### 1. Run the database migration

Supabase dashboard → project **bassa academy** → **SQL Editor** → **New query**. Then:

1. Paste the contents of `supabase/migrations/20261024120000_masterclasses.sql` and click **Run**.
2. Paste the contents of `supabase/seed/first_masterclass.sql` and click **Run**. This creates the first event (*Build Your First Machine Learning Model in Python — LIVE!*, Sun Nov 1, 2026, 2:00 PM ET).

Both scripts are safe to run more than once.

The migration creates:

| Object | Purpose |
|--------|---------|
| `masterclasses` table | Event content (title, schedule, topics, banner, capacity, deadline, status…) |
| `masterclass_private` table | Meeting link — **admin-only**, never readable by the public |
| `masterclass_registrations` table | Attendees; unique per event + email (case-insensitive) |
| `register_for_masterclass()` | The only way to register. Validates input server-side, enforces published status, deadline and capacity, blocks duplicates, returns the meeting link to the registrant |
| `masterclass_availability()` | Seats left for the public; registration counts for admins only |
| `duplicate_masterclass()` | Admin-only copy (as a draft, one week later) |
| `is_admin()` | Reads `profiles.is_admin`, the same flag the existing `/admin` uses |
| `masterclass-banners` storage bucket | Public-read banner images; only admins can upload |

### 2. Make sure your account is an admin

If you already use `/admin` for course materials, you're done. Otherwise, sign up once, then run:

```sql
update public.profiles set is_admin = true where email = 'your@email.com';
```

### 3. Environment variables

No new variables. The pages use the existing:

| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Safe in the browser; RLS protects the data |

Never put `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_` variable.

### 4. Build and deploy as usual

```bash
npm run build      # static export, as before
```

Upload `out/` to cPanel the same way you do today. The new routes are plain static pages.

---

## Using the admin dashboard

1. Sign in at `/login`, then open `/admin/masterclasses/`. The existing `/admin` page also has a **Masterclasses** tab.
2. Click **+ Add masterclass**.
3. Fill in:
   - title (the slug is generated automatically)
   - tagline and description
   - topics, one per line
   - date, time and time zone (a preview shows exactly what visitors will see)
   - duration
   - capacity (blank means unlimited)
   - optional registration deadline
   - meeting link
   - instructor
   - banner (upload, or paste an image URL)
   - the "Next step" box that promotes the accelerator
4. Click **Create & publish**. The event is live on `/masterclasses/` immediately. Use **Save draft** to keep it hidden.

On the list, each event has:

| Action | Effect |
|--------|--------|
| **Edit** | Change anything, including the meeting link, at any time |
| **Attendees** | Search, remove a registration, copy all emails, **Export CSV** |
| **Publish / Unpublish** | Show or hide it publicly |
| **Duplicate** | Copies everything, including the meeting link, as a draft one week later. Update the date and publish |
| **Archive** | Hides it and keeps the registrations (recommended after an event) |
| **Delete** | Permanent; also deletes its registrations |

Filters: **Upcoming · Drafts · Past · Archived · All**.

### Meeting link

The meeting link stays private. A registrant sees a **Join link** button on the confirmation screen right after registering, plus "Add to Google Calendar / Apple / Outlook". If the link is still empty, they're told it will be emailed before the session. In that case, export the CSV (or use **Copy all emails**) and send it from your email tool.

### Time zones

Times are stored in UTC and displayed in the event's time zone, with daylight saving handled automatically. Note that **Nov 1, 2026 is the day US clocks fall back**, so 2:00 PM Eastern that afternoon is EST (UTC−5). The confirmation screen also shows the visitor's local time.

---

## Security model

The site is a static export, so the browser talks to Supabase directly. Row Level Security is the security boundary:

- **Anonymous visitors and students:**
  - can read **published** events only;
  - cannot read drafts, archived events, meeting links or any registration;
  - cannot insert into tables directly.
- **Registration** goes only through `register_for_masterclass()`, which:
  - re-validates name, email and profession on the server (length, format, no markup or links in names);
  - locks the event row while checking capacity, so two people can't take the last seat.
- **Admins** (`profiles.is_admin = true`) can manage everything. Non-admins are refused by the database even if they open `/admin/masterclasses/`.
- **Other protections:**
  - the CSV export neutralises spreadsheet formula injection;
  - only `http(s)` links and site paths are ever rendered as links;
  - the form has a hidden honeypot field to catch simple bots.

If you see spam registrations later, the next step is adding Cloudflare Turnstile in front of `register_for_masterclass` through a Supabase Edge Function.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `/masterclasses` says "Could not load masterclasses" | The migration hasn't been run, or the env vars are missing in the build |
| Admin page says "Admin access required" | Set `is_admin = true` for your email (step 2), then sign out and back in |
| Banner upload fails | Confirm the migration created the `masterclass-banners` bucket (Storage tab). Images must be 5 MB or smaller |
| "That URL slug is already used" | Pick a different slug; each event needs a unique one |
