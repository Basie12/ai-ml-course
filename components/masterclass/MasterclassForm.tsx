"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { MasterclassBanner } from "./MasterclassBanner";
import {
  TIMEZONES,
  adminUploadBanner,
  slugify,
  utcToZoned,
  zonedToUtcIso,
  safeHref,
  type Masterclass,
  type MasterclassInput,
  type MasterclassStatus,
} from "@/lib/masterclasses";

type Props = {
  initial?: Masterclass | null;
  initialMeetingLink?: string;
  saving: boolean;
  onSubmit: (input: MasterclassInput, meetingLink: string) => Promise<void> | void;
  onCancel: () => void;
};

const DEFAULT_NEXT_BODY =
  "The masterclass is your starting point. The accelerator takes you from ML foundations to production AI systems over 24 weeks, with live sessions, project reviews and six industry-standard portfolio projects.";
const DEFAULT_NEXT_POINTS = [
  "Customer Churn Prediction System",
  "Risk Prediction API",
  "Full MLOps Pipeline on AWS",
  "Production RAG System",
  "Multi-Agent Support System",
  "Your Production AI Platform",
];

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

export function MasterclassForm({ initial, initialMeetingLink = "", saving, onSubmit, onCancel }: Props) {
  const tz0 = initial?.timezone || "America/New_York";
  const start0 = initial ? utcToZoned(initial.starts_at, tz0) : { date: "", time: "14:00" };
  const dl0 = initial?.registration_deadline ? utcToZoned(initial.registration_deadline, tz0) : { date: "", time: "" };

  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [subtitle, setSubtitle] = useState(initial?.subtitle || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [topics, setTopics] = useState((initial?.topics || []).join("\n"));
  const [date, setDate] = useState(start0.date);
  const [time, setTime] = useState(start0.time);
  const [timezone, setTimezone] = useState(tz0);
  const [duration, setDuration] = useState(String(initial?.duration_minutes ?? 90));
  const [instructorName, setInstructorName] = useState(initial?.instructor_name ?? "Bassa (Basazin Belhu)");
  const [instructorTitle, setInstructorTitle] = useState(initial?.instructor_title ?? "AI/ML Engineer · Instructor, AI with Bassa");
  const [meetingLink, setMeetingLink] = useState(initialMeetingLink);
  const [bannerUrl, setBannerUrl] = useState(initial?.banner_url || "");
  const [priceLabel, setPriceLabel] = useState(initial?.price_label ?? "FREE");
  const [capacity, setCapacity] = useState(initial?.capacity != null ? String(initial.capacity) : "");
  const [dlDate, setDlDate] = useState(dl0.date);
  const [dlTime, setDlTime] = useState(dl0.time);
  const [nextTitle, setNextTitle] = useState(initial?.next_step_title ?? "Ready to go further? The 24-Week AI & ML Engineering Accelerator");
  const [nextBody, setNextBody] = useState(initial ? initial.next_step_body : DEFAULT_NEXT_BODY);
  const [nextPoints, setNextPoints] = useState((initial ? initial.next_step_points : DEFAULT_NEXT_POINTS).join("\n"));
  const [nextUrl, setNextUrl] = useState(initial?.next_step_url ?? "/#pricing");
  const [nextCta, setNextCta] = useState(initial?.next_step_cta ?? "Explore the 24-week accelerator");
  const [status, setStatus] = useState<MasterclassStatus>(initial?.status || "draft");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const effectiveSlug = slugTouched ? slug : slugify(title);
  const previewTz = useMemo(() => {
    if (!date || !time) return "";
    try {
      const iso = zonedToUtcIso(date, time, timezone);
      return new Intl.DateTimeFormat("en-US", { timeZone: timezone, dateStyle: "full", timeStyle: "short" }).format(new Date(iso)) +
        ` (${new Intl.DateTimeFormat("en-US", { timeZone: timezone, timeZoneName: "short" }).formatToParts(new Date(iso)).find((p) => p.type === "timeZoneName")?.value})`;
    } catch {
      return "";
    }
  }, [date, time, timezone]);

  async function onBanner(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setFormError("");
    try {
      setBannerUrl(await adminUploadBanner(file));
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function validate(): MasterclassInput | null {
    const e: Record<string, string> = {};
    if (title.trim().length < 3) e.title = "Title must be at least 3 characters.";
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(effectiveSlug) || effectiveSlug.length < 3) e.slug = "Use lowercase letters, numbers and dashes (3–80 chars).";
    if (!date) e.date = "Pick a date.";
    if (!/^\d{2}:\d{2}$/.test(time)) e.time = "Pick a start time.";
    const dur = Number(duration);
    if (!Number.isInteger(dur) || dur < 15 || dur > 600) e.duration = "Between 15 and 600 minutes.";
    const cap = capacity.trim() ? Number(capacity) : null;
    if (cap !== null && (!Number.isInteger(cap) || cap < 1)) e.capacity = "Leave blank for unlimited, or enter a whole number.";
    if (meetingLink.trim() && !safeHref(meetingLink)) e.meetingLink = "Enter a full https:// link.";
    if (bannerUrl.trim() && !safeHref(bannerUrl)) e.bannerUrl = "Enter a full https:// image URL.";
    if (nextUrl.trim() && !safeHref(nextUrl)) e.nextUrl = "Use a site path like /#pricing or a full https:// URL.";
    if ((dlDate && !dlTime) || (!dlDate && dlTime)) e.deadline = "Set both a date and time, or leave both empty.";
    if (lines(topics).length > 20) e.topics = "Up to 20 topics.";
    if (lines(nextPoints).length > 12) e.nextPoints = "Up to 12 items.";

    let startsAt = "";
    let deadline: string | null = null;
    if (!e.date && !e.time) startsAt = zonedToUtcIso(date, time, timezone);
    if (dlDate && dlTime && !e.deadline) {
      deadline = zonedToUtcIso(dlDate, dlTime, timezone);
      if (startsAt && new Date(deadline) > new Date(new Date(startsAt).getTime() + dur * 60000)) {
        e.deadline = "Deadline must be before the session ends.";
      }
    }
    setErrors(e);
    if (Object.keys(e).length) {
      setFormError("Please fix the highlighted fields.");
      return null;
    }
    setFormError("");
    return {
      slug: effectiveSlug,
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      topics: lines(topics),
      starts_at: startsAt,
      timezone,
      duration_minutes: dur,
      instructor_name: instructorName.trim(),
      instructor_title: instructorTitle.trim(),
      banner_url: bannerUrl.trim(),
      price_label: priceLabel.trim() || "FREE",
      capacity: cap,
      registration_deadline: deadline,
      next_step_title: nextTitle.trim(),
      next_step_body: nextBody.trim(),
      next_step_points: lines(nextPoints),
      next_step_url: nextUrl.trim(),
      next_step_cta: nextCta.trim() || "Learn more",
      status,
    };
  }

  async function submit(e: FormEvent, override?: MasterclassStatus) {
    e.preventDefault();
    const input = validate();
    if (!input) return;
    if (override) input.status = override;
    try {
      await onSubmit(input, meetingLink);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    }
  }

  const err = (k: string) => (errors[k] ? <p className="mc-err">{errors[k]}</p> : null);

  return (
    <form className="mca-form" onSubmit={(e) => submit(e)} noValidate>
      <div className="mca-form-main">
        <fieldset className="mca-card">
          <legend>Event details</legend>
          <label className="mca-field">
            <span>Title *</span>
            <input value={title} maxLength={160} onChange={(e) => setTitle(e.target.value)} placeholder="Build Your First Machine Learning Model in Python — LIVE!" aria-invalid={!!errors.title} />
            {err("title")}
          </label>
          <label className="mca-field">
            <span>URL slug *</span>
            <div className="mca-slug">
              <span className="mca-slug-prefix">/masterclasses/event/?slug=</span>
              <input
                value={effectiveSlug}
                maxLength={80}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value.toLowerCase());
                }}
                aria-invalid={!!errors.slug}
              />
            </div>
            {err("slug")}
          </label>
          <label className="mca-field">
            <span>Short tagline</span>
            <input value={subtitle} maxLength={300} onChange={(e) => setSubtitle(e.target.value)} placeholder="One sentence shown on cards and under the title" />
          </label>
          <label className="mca-field">
            <span>Description</span>
            <textarea rows={6} value={description} maxLength={10000} onChange={(e) => setDescription(e.target.value)} placeholder="Leave a blank line between paragraphs." />
          </label>
          <label className="mca-field">
            <span>Topics covered <em>(one per line)</em></span>
            <textarea rows={5} value={topics} onChange={(e) => setTopics(e.target.value)} placeholder={"How machine learning works\nBuilding a prediction model using Python"} aria-invalid={!!errors.topics} />
            {err("topics")}
          </label>
        </fieldset>

        <fieldset className="mca-card">
          <legend>Schedule &amp; access</legend>
          <div className="mca-row3">
            <label className="mca-field">
              <span>Date *</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-invalid={!!errors.date} />
              {err("date")}
            </label>
            <label className="mca-field">
              <span>Start time *</span>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} aria-invalid={!!errors.time} />
              {err("time")}
            </label>
            <label className="mca-field">
              <span>Time zone</span>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                {TIMEZONES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {previewTz && <p className="mca-hint">Shows as: {previewTz}</p>}
          <div className="mca-row3">
            <label className="mca-field">
              <span>Duration (minutes) *</span>
              <input type="number" min={15} max={600} step={5} value={duration} onChange={(e) => setDuration(e.target.value)} aria-invalid={!!errors.duration} />
              {err("duration")}
            </label>
            <label className="mca-field">
              <span>Capacity</span>
              <input type="number" min={1} value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Unlimited" aria-invalid={!!errors.capacity} />
              {err("capacity")}
            </label>
            <label className="mca-field">
              <span>Price label</span>
              <input value={priceLabel} maxLength={40} onChange={(e) => setPriceLabel(e.target.value)} />
            </label>
          </div>
          <div className="mca-row2">
            <label className="mca-field">
              <span>Registration deadline — date</span>
              <input type="date" value={dlDate} onChange={(e) => setDlDate(e.target.value)} aria-invalid={!!errors.deadline} />
            </label>
            <label className="mca-field">
              <span>Deadline — time</span>
              <input type="time" value={dlTime} onChange={(e) => setDlTime(e.target.value)} aria-invalid={!!errors.deadline} />
            </label>
          </div>
          {errors.deadline ? err("deadline") : <p className="mca-hint">Leave empty to accept registrations until the session ends.</p>}
          <label className="mca-field">
            <span>Meeting link (Zoom, Google Meet, Teams…)</span>
            <input type="url" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} placeholder="https://zoom.us/j/…" aria-invalid={!!errors.meetingLink} />
            {errors.meetingLink ? err("meetingLink") : <p className="mca-hint">Private. Shown only to people right after they register (and on the Attendees page).</p>}
          </label>
        </fieldset>

        <fieldset className="mca-card">
          <legend>Instructor</legend>
          <div className="mca-row2">
            <label className="mca-field">
              <span>Name</span>
              <input value={instructorName} maxLength={120} onChange={(e) => setInstructorName(e.target.value)} />
            </label>
            <label className="mca-field">
              <span>Title</span>
              <input value={instructorTitle} maxLength={160} onChange={(e) => setInstructorTitle(e.target.value)} />
            </label>
          </div>
        </fieldset>

        <fieldset className="mca-card">
          <legend>Next step (promote your program)</legend>
          <label className="mca-field">
            <span>Heading</span>
            <input value={nextTitle} maxLength={160} onChange={(e) => setNextTitle(e.target.value)} />
          </label>
          <label className="mca-field">
            <span>Text</span>
            <textarea rows={3} value={nextBody} maxLength={2000} onChange={(e) => setNextBody(e.target.value)} />
          </label>
          <label className="mca-field">
            <span>Highlights <em>(one per line, e.g. your six projects)</em></span>
            <textarea rows={6} value={nextPoints} onChange={(e) => setNextPoints(e.target.value)} aria-invalid={!!errors.nextPoints} />
            {err("nextPoints")}
          </label>
          <div className="mca-row2">
            <label className="mca-field">
              <span>Button label</span>
              <input value={nextCta} maxLength={60} onChange={(e) => setNextCta(e.target.value)} />
            </label>
            <label className="mca-field">
              <span>Button link</span>
              <input value={nextUrl} maxLength={500} onChange={(e) => setNextUrl(e.target.value)} placeholder="/#pricing" aria-invalid={!!errors.nextUrl} />
              {err("nextUrl")}
            </label>
          </div>
        </fieldset>
      </div>

      <aside className="mca-form-side">
        <div className="mca-card">
          <p className="mca-side-label">Banner</p>
          <MasterclassBanner url={bannerUrl} title={title || "Masterclass"} className="mca-banner-preview" />
          <div className="mca-banner-actions">
            <label className="btn btn-outline btn-sm mca-upload">
              {uploading ? "Uploading…" : bannerUrl ? "Replace image" : "Upload image"}
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => onBanner(e.target.files?.[0])} disabled={uploading} />
            </label>
            {bannerUrl && (
              <button type="button" className="linkish mca-link-danger" onClick={() => setBannerUrl("")}>
                Remove
              </button>
            )}
          </div>
          <label className="mca-field">
            <span>…or image URL</span>
            <input type="url" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} placeholder="https://…" aria-invalid={!!errors.bannerUrl} />
            {err("bannerUrl")}
          </label>
          <p className="mca-hint">16:9, at least 1200×675, under 5 MB. Without one, a branded graphic is used.</p>
        </div>

        <div className="mca-card mca-publish">
          <label className="mca-field">
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as MasterclassStatus)}>
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published (public, accepting registrations)</option>
              <option value="archived">Archived (hidden)</option>
            </select>
          </label>
          {formError && (
            <p className="mc-alert" role="alert">
              {formError}
            </p>
          )}
          <button type="submit" className="btn btn-primary btn-block" disabled={saving || uploading}>
            {saving ? "Saving…" : initial ? "Save changes" : status === "published" ? "Create & publish" : "Save draft"}
          </button>
          {status !== "published" && (
            <button type="button" className="btn btn-outline btn-block" disabled={saving || uploading} onClick={(e) => submit(e as unknown as FormEvent, "published")}>
              {initial ? "Save & publish" : "Create & publish"}
            </button>
          )}
          <button type="button" className="linkish mca-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </aside>
    </form>
  );
}
