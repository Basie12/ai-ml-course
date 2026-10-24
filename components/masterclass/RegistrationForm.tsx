"use client";

import { FormEvent, useState } from "react";
import { IconArrow, IconCalendar, IconCheck, IconVideo } from "./Icons";
import {
  downloadText,
  formatEventDate,
  formatEventTime,
  googleCalendarUrl,
  masterclassIcs,
  registerForMasterclass,
  safeHref,
  type Masterclass,
  type RegisterResult,
} from "@/lib/masterclasses";

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i;

export function RegistrationForm({ mc, onRegistered }: { mc: Masterclass; onRegistered?: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never see it
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RegisterResult | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    const n = fullName.trim();
    if (n.length < 2) e.fullName = "Please enter your full name.";
    else if (n.length > 120) e.fullName = "Name must be 120 characters or fewer.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email address.";
    if (profession.trim().length > 160) e.profession = "Keep this under 160 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setFormError("");
    if (website) {
      setResult({ status: "registered", meeting_link: "" });
      return;
    }
    if (!validate()) return;
    setBusy(true);
    try {
      const r = await registerForMasterclass({
        masterclassId: mc.id,
        fullName: fullName.trim(),
        email: email.trim(),
        profession: profession.trim(),
      });
      setResult(r);
      onRegistered?.();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    const pageUrl = typeof window !== "undefined" ? window.location.href : "https://aiwithbassa.com/masterclasses/";
    const link = safeHref(result.meeting_link);
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (
      <div className="mc-success" role="status" aria-live="polite">
        <span className="mc-success-icon">
          <IconCheck />
        </span>
        <h2>{result.status === "registered" ? "You're registered!" : "You're already registered"}</h2>
        <p>
          {result.status === "registered"
            ? `See you on ${formatEventDate(mc.starts_at, mc.timezone)} at ${formatEventTime(mc.starts_at, mc.timezone)}.`
            : `This email is already on the list for ${formatEventDate(mc.starts_at, mc.timezone)}. No need to register again.`}
        </p>
        {local && local !== mc.timezone && (
          <p className="mc-success-local">
            That&rsquo;s {formatEventTime(mc.starts_at, local)} on {formatEventDate(mc.starts_at, local)} where you are.
          </p>
        )}
        {link ? (
          <a className="btn btn-primary btn-block" href={link} target="_blank" rel="noopener noreferrer">
            <IconVideo /> Join link
          </a>
        ) : (
          <p className="mc-success-note">The join link will be emailed to you before the session starts.</p>
        )}
        <div className="mc-cal">
          <a className="btn btn-outline btn-sm" href={googleCalendarUrl(mc, link || "", pageUrl)} target="_blank" rel="noopener noreferrer">
            <IconCalendar /> Google Calendar
          </a>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => downloadText(`${mc.slug}.ics`, masterclassIcs(mc, link || "", pageUrl), "text/calendar")}
          >
            <IconCalendar /> Apple / Outlook (.ics)
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="mc-form" onSubmit={onSubmit} noValidate>
      <div className="mc-field">
        <label htmlFor="mc-name">Full name</label>
        <input
          id="mc-name"
          name="name"
          autoComplete="name"
          value={fullName}
          maxLength={120}
          onChange={(e) => setFullName(e.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "mc-name-err" : undefined}
          placeholder="Jane Doe"
        />
        {errors.fullName && <p className="mc-err" id="mc-name-err">{errors.fullName}</p>}
      </div>
      <div className="mc-field">
        <label htmlFor="mc-email">Email address</label>
        <input
          id="mc-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          maxLength={254}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "mc-email-err" : undefined}
          placeholder="jane@example.com"
        />
        {errors.email && <p className="mc-err" id="mc-email-err">{errors.email}</p>}
      </div>
      <div className="mc-field">
        <label htmlFor="mc-prof">
          Current profession <span className="mc-optional">(optional)</span>
        </label>
        <input
          id="mc-prof"
          name="profession"
          autoComplete="organization-title"
          value={profession}
          maxLength={160}
          onChange={(e) => setProfession(e.target.value)}
          aria-invalid={Boolean(errors.profession)}
          placeholder="e.g. Data Analyst, Software Engineer"
        />
        {errors.profession && <p className="mc-err">{errors.profession}</p>}
      </div>
      <div className="mc-hp" aria-hidden="true">
        <label htmlFor="mc-website">Website</label>
        <input id="mc-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {formError && (
        <p className="mc-alert" role="alert">
          {formError}
        </p>
      )}
      <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
        {busy ? "Registering…" : (
          <>
            Reserve my free seat <IconArrow />
          </>
        )}
      </button>
      <p className="mc-fine">Free. We&rsquo;ll use your email to send you the session details.</p>
    </form>
  );
}
