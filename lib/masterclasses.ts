"use client";

import { createClient } from "@/lib/supabase/client";

/* ==========================================================================
   Masterclasses — types, Supabase queries, time-zone and export helpers.
   All security is enforced in Postgres (RLS + functions in
   supabase/migrations/20261024120000_masterclasses.sql); these helpers only
   shape requests and errors for the UI.
   ========================================================================== */

export type MasterclassStatus = "draft" | "published" | "archived";

export type Masterclass = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  starts_at: string;
  timezone: string;
  duration_minutes: number;
  instructor_name: string;
  instructor_title: string;
  banner_url: string;
  price_label: string;
  capacity: number | null;
  registration_deadline: string | null;
  next_step_title: string;
  next_step_body: string;
  next_step_points: string[];
  next_step_url: string;
  next_step_cta: string;
  status: MasterclassStatus;
  created_at: string;
  updated_at: string;
};

export type MasterclassInput = Omit<Masterclass, "id" | "created_at" | "updated_at">;

export type Availability = { masterclass_id: string; registered: number | null; seats_left: number | null };

export type Registration = {
  id: string;
  masterclass_id: string;
  full_name: string;
  email: string;
  profession: string;
  created_at: string;
};

export type RegisterResult = { status: "registered" | "already_registered"; meeting_link: string };

const PUBLIC_COLUMNS =
  "id, slug, title, subtitle, description, topics, starts_at, timezone, duration_minutes, instructor_name, instructor_title, banner_url, price_label, capacity, registration_deadline, next_step_title, next_step_body, next_step_points, next_step_url, next_step_cta, status, created_at, updated_at";

export const BANNER_BUCKET = "masterclass-banners";

export const TIMEZONES = [
  { value: "America/New_York", label: "Eastern (ET)" },
  { value: "America/Chicago", label: "Central (CT)" },
  { value: "America/Denver", label: "Mountain (MT)" },
  { value: "America/Los_Angeles", label: "Pacific (PT)" },
  { value: "UTC", label: "UTC" },
];

function friendly(err: { message?: string } | null | undefined, fallback: string): Error {
  const msg = err?.message || fallback;
  if (/duplicate key value.*slug/i.test(msg)) return new Error("That URL slug is already used by another masterclass.");
  if (/violates check constraint/i.test(msg)) return new Error("Some fields are invalid or too long. Please review the form.");
  if (/row-level security|permission denied/i.test(msg)) return new Error("You don't have permission to do that. Sign in with an admin account.");
  if (/Failed to fetch|NetworkError/i.test(msg)) return new Error("Network error. Check your connection and try again.");
  return new Error(msg);
}

/* ----------------------------- time helpers ------------------------------ */

export function endsAt(mc: Pick<Masterclass, "starts_at" | "duration_minutes">): Date {
  return new Date(new Date(mc.starts_at).getTime() + mc.duration_minutes * 60_000);
}

export function registrationClosesAt(mc: Pick<Masterclass, "starts_at" | "duration_minutes" | "registration_deadline">): Date {
  return mc.registration_deadline ? new Date(mc.registration_deadline) : endsAt(mc);
}

export function isRegistrationOpen(mc: Masterclass, now = new Date()): boolean {
  return mc.status === "published" && now < registrationClosesAt(mc);
}

/** Offset (ms) between UTC and wall-clock time in `tz` at instant `date`. */
function tzOffset(date: Date, tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/** "2026-11-01" + "14:00" in "America/New_York" → ISO UTC string (DST-aware). */
export function zonedToUtcIso(date: string, time: string, tz: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let ts = guess - tzOffset(new Date(guess), tz);
  ts = guess - tzOffset(new Date(ts), tz); // second pass settles DST boundaries
  return new Date(ts).toISOString();
}

/** ISO instant → { date: "YYYY-MM-DD", time: "HH:MM" } as seen in `tz`. */
export function utcToZoned(iso: string, tz: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value || "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}

export function formatEventDate(iso: string, tz: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date(iso));
}

export function formatEventTime(iso: string, tz: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(iso));
}

export function formatShortDate(iso: string, tz: string) {
  const d = new Date(iso);
  return {
    month: new Intl.DateTimeFormat("en-US", { timeZone: tz, month: "short" }).format(d).toUpperCase(),
    day: new Intl.DateTimeFormat("en-US", { timeZone: tz, day: "numeric" }).format(d),
  };
}

export function formatDuration(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr${h > 1 ? "s" : ""}`;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

/** Only allow http(s) and site-relative links to be rendered as hrefs. */
export function safeHref(url: string): string | null {
  const u = url.trim();
  if (!u) return null;
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  try {
    const parsed = new URL(u);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

/* ------------------------------ public API ------------------------------- */

export async function listPublishedMasterclasses(): Promise<Masterclass[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("masterclasses")
    .select(PUBLIC_COLUMNS)
    .eq("status", "published")
    .order("starts_at", { ascending: true });
  if (error) throw friendly(error, "Could not load masterclasses");
  return (data || []) as Masterclass[];
}

export async function getMasterclassBySlug(slug: string): Promise<Masterclass | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("masterclasses").select(PUBLIC_COLUMNS).eq("slug", slug).maybeSingle();
  if (error) throw friendly(error, "Could not load this masterclass");
  return (data as Masterclass) || null;
}

export async function getAvailability(ids: string[]): Promise<Record<string, Availability>> {
  if (!ids.length) return {};
  const supabase = createClient();
  const { data, error } = await supabase.rpc("masterclass_availability", { p_ids: ids });
  if (error) return {};
  const out: Record<string, Availability> = {};
  for (const row of (data || []) as Availability[]) out[row.masterclass_id] = row;
  return out;
}

export async function registerForMasterclass(input: {
  masterclassId: string;
  fullName: string;
  email: string;
  profession: string;
}): Promise<RegisterResult> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("register_for_masterclass", {
    p_masterclass_id: input.masterclassId,
    p_full_name: input.fullName,
    p_email: input.email,
    p_profession: input.profession,
  });
  if (error) throw friendly(error, "Registration failed. Please try again.");
  return data as RegisterResult;
}

/* ------------------------------- admin API ------------------------------- */

export async function adminListMasterclasses(): Promise<Masterclass[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("masterclasses").select(PUBLIC_COLUMNS).order("starts_at", { ascending: false });
  if (error) throw friendly(error, "Could not load masterclasses");
  return (data || []) as Masterclass[];
}

export async function adminGetMasterclass(id: string): Promise<{ mc: Masterclass; meetingLink: string } | null> {
  const supabase = createClient();
  const [{ data, error }, priv] = await Promise.all([
    supabase.from("masterclasses").select(PUBLIC_COLUMNS).eq("id", id).maybeSingle(),
    supabase.from("masterclass_private").select("meeting_link").eq("masterclass_id", id).maybeSingle(),
  ]);
  if (error) throw friendly(error, "Could not load masterclass");
  if (!data) return null;
  return { mc: data as Masterclass, meetingLink: (priv.data?.meeting_link as string) || "" };
}

async function saveMeetingLink(id: string, meetingLink: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("masterclass_private")
    .upsert({ masterclass_id: id, meeting_link: meetingLink.trim() }, { onConflict: "masterclass_id" });
  if (error) throw friendly(error, "Could not save the meeting link");
}

export async function adminCreateMasterclass(input: MasterclassInput, meetingLink: string): Promise<Masterclass> {
  const supabase = createClient();
  const { data, error } = await supabase.from("masterclasses").insert(input).select(PUBLIC_COLUMNS).single();
  if (error) throw friendly(error, "Could not create masterclass");
  await saveMeetingLink((data as Masterclass).id, meetingLink);
  return data as Masterclass;
}

export async function adminUpdateMasterclass(id: string, input: Partial<MasterclassInput>, meetingLink?: string): Promise<Masterclass> {
  const supabase = createClient();
  const { data, error } = await supabase.from("masterclasses").update(input).eq("id", id).select(PUBLIC_COLUMNS).single();
  if (error) throw friendly(error, "Could not save masterclass");
  if (meetingLink !== undefined) await saveMeetingLink(id, meetingLink);
  return data as Masterclass;
}

export async function adminSetStatus(id: string, status: MasterclassStatus) {
  return adminUpdateMasterclass(id, { status });
}

export async function adminDeleteMasterclass(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("masterclasses").delete().eq("id", id);
  if (error) throw friendly(error, "Could not delete masterclass");
}

export async function adminDuplicateMasterclass(id: string): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("duplicate_masterclass", { p_id: id });
  if (error) throw friendly(error, "Could not duplicate masterclass");
  return data as string;
}

export async function adminListRegistrations(masterclassId: string): Promise<Registration[]> {
  const supabase = createClient();
  const rows: Registration[] = [];
  const page = 1000;
  for (let from = 0; ; from += page) {
    const { data, error } = await supabase
      .from("masterclass_registrations")
      .select("id, masterclass_id, full_name, email, profession, created_at")
      .eq("masterclass_id", masterclassId)
      .order("created_at", { ascending: true })
      .range(from, from + page - 1);
    if (error) throw friendly(error, "Could not load registrations");
    rows.push(...((data || []) as Registration[]));
    if (!data || data.length < page) break;
  }
  return rows;
}

export async function adminDeleteRegistration(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("masterclass_registrations").delete().eq("id", id);
  if (error) throw friendly(error, "Could not remove registration");
}

export async function adminUploadBanner(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Banner must be an image (JPG, PNG or WebP).");
  if (file.size > 5 * 1024 * 1024) throw new Error("Banner must be 5 MB or smaller.");
  const supabase = createClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${new Date().getFullYear()}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BANNER_BUCKET).upload(path, file, { upsert: false, contentType: file.type });
  if (error) throw friendly(error, "Banner upload failed");
  return supabase.storage.from(BANNER_BUCKET).getPublicUrl(path).data.publicUrl;
}

/* ----------------------------- export helpers ---------------------------- */

function csvCell(v: string): string {
  let s = v ?? "";
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // neutralise spreadsheet formula injection
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function registrationsToCsv(rows: Registration[], mc: Masterclass): string {
  const header = ["Full name", "Email", "Profession", "Registered at (UTC)", "Masterclass", "Event date"];
  const eventDate = `${formatEventDate(mc.starts_at, mc.timezone)} ${formatEventTime(mc.starts_at, mc.timezone)}`;
  const lines = rows.map((r) =>
    [r.full_name, r.email, r.profession, new Date(r.created_at).toISOString().replace("T", " ").slice(0, 19), mc.title, eventDate]
      .map(csvCell)
      .join(","),
  );
  return "\uFEFF" + [header.join(","), ...lines].join("\r\n");
}

export function downloadText(filename: string, text: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function icsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);
}

export function masterclassIcs(mc: Masterclass, meetingLink: string, pageUrl: string): string {
  const desc = [mc.subtitle, meetingLink ? `Join: ${meetingLink}` : "The join link will be shared before the session.", pageUrl]
    .filter(Boolean)
    .join("\n\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AI with Bassa//Masterclass//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${mc.id}@aiwithbassa.com`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(new Date(mc.starts_at))}`,
    `DTEND:${icsDate(endsAt(mc))}`,
    `SUMMARY:${icsEscape(mc.title)}`,
    `DESCRIPTION:${icsEscape(desc)}`,
    `LOCATION:${icsEscape(meetingLink || "Online")}`,
    `URL:${pageUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function googleCalendarUrl(mc: Masterclass, meetingLink: string, pageUrl: string): string {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: mc.title,
    dates: `${icsDate(new Date(mc.starts_at))}/${icsDate(endsAt(mc))}`,
    details: [mc.subtitle, meetingLink ? `Join: ${meetingLink}` : "", pageUrl].filter(Boolean).join("\n\n"),
    location: meetingLink || "Online",
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export function eventPath(slug: string) {
  return `/masterclasses/event/?slug=${encodeURIComponent(slug)}`;
}
