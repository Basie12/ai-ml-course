"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { MasterclassBanner } from "@/components/masterclass/MasterclassBanner";
import { RegistrationForm } from "@/components/masterclass/RegistrationForm";
import { IconArrow, IconCalendar, IconCheck, IconClock, IconSeat, IconTimer, IconUser } from "@/components/masterclass/Icons";
import {
  formatDuration,
  formatEventDate,
  formatEventTime,
  getAvailability,
  getMasterclassBySlug,
  isRegistrationOpen,
  registrationClosesAt,
  safeHref,
  type Availability,
  type Masterclass,
} from "@/lib/masterclasses";

function EventView() {
  const params = useSearchParams();
  const slug = params.get("slug") || "";
  const [mc, setMc] = useState<Masterclass | null | undefined>(undefined);
  const [avail, setAvail] = useState<Availability | null>(null);
  const [error, setError] = useState("");
  const [justRegistered, setJustRegistered] = useState(false);

  const loadAvail = useCallback(async (id: string) => {
    const a = await getAvailability([id]);
    setAvail(a[id] || null);
  }, []);

  useEffect(() => {
    if (!slug) {
      setMc(null);
      return;
    }
    getMasterclassBySlug(slug)
      .then((m) => {
        setMc(m);
        if (m) {
          document.title = `${m.title} · AI with Bassa`;
          loadAvail(m.id);
        }
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Could not load this masterclass");
        setMc(null);
      });
  }, [slug, loadAvail]);

  if (mc === undefined) {
    return (
      <main id="main" className="mc-page">
        <section className="mc-hero mc-hero-event">
          <div className="wrap">
            <div className="mc-skeleton-line" />
            <div className="mc-skeleton-line short" />
          </div>
        </section>
      </main>
    );
  }

  if (!mc) {
    return (
      <main id="main" className="mc-page">
        <section className="mc-hero">
          <div className="wrap">
            <p className="eyebrow">Masterclass</p>
            <h1>Masterclass not found</h1>
            <p className="mc-hero-sub">{error || "This session may have ended or been moved."}</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href="/masterclasses">
                See upcoming masterclasses <IconArrow />
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Once this visitor registers, keep their confirmation on screen even if they took the last seat.
  const open = isRegistrationOpen(mc) || justRegistered;
  const full = avail?.seats_left === 0 && !justRegistered;
  const nextHref = safeHref(mc.next_step_url);
  const paragraphs = mc.description.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const closes = registrationClosesAt(mc);

  return (
    <main id="main" className="mc-page">
      <section className="mc-hero mc-hero-event">
        <div className="wrap mc-hero-grid">
          <div>
            <nav className="mc-crumbs" aria-label="Breadcrumb">
              <Link href="/masterclasses">Masterclasses</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Event</span>
            </nav>
            <p className="mc-live-pill">
              <span className="dot" aria-hidden="true" /> Live online · {mc.price_label || "FREE"}
            </p>
            <h1>{mc.title}</h1>
            {mc.subtitle && <p className="mc-hero-sub">{mc.subtitle}</p>}
            <ul className="mc-meta mc-meta-dark">
              <li>
                <IconCalendar />
                {formatEventDate(mc.starts_at, mc.timezone)}
              </li>
              <li>
                <IconClock />
                {formatEventTime(mc.starts_at, mc.timezone)}
              </li>
              <li>
                <IconTimer />
                {formatDuration(mc.duration_minutes)}
              </li>
              {mc.instructor_name && (
                <li>
                  <IconUser />
                  {mc.instructor_name}
                </li>
              )}
            </ul>
          </div>
          <div className="mc-hero-media">
            <MasterclassBanner url={mc.banner_url} title={mc.title} />
          </div>
        </div>
      </section>

      <section className="mc-body">
        <div className="wrap mc-body-grid">
          <div className="mc-content">
            {paragraphs.length > 0 && (
              <div className="mc-block">
                <h2>About this masterclass</h2>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {mc.topics.length > 0 && (
              <div className="mc-block">
                <h2>What you&rsquo;ll learn</h2>
                <ul className="mc-topics">
                  {mc.topics.map((t, i) => (
                    <li key={i}>
                      <span className="mc-topic-num">{String(i + 1).padStart(2, "0")}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mc.instructor_name && (
              <div className="mc-block mc-instructor">
                <span className="mc-avatar" aria-hidden="true">
                  {mc.instructor_name.replace(/\(.*\)/, "").trim().charAt(0)}
                </span>
                <div>
                  <p className="mc-label">Your instructor</p>
                  <h3>{mc.instructor_name}</h3>
                  {mc.instructor_title && <p>{mc.instructor_title}</p>}
                </div>
              </div>
            )}

            {(mc.next_step_title || mc.next_step_body) && (
              <div className="mc-next">
                <p className="eyebrow">Your next step</p>
                {mc.next_step_title && <h2>{mc.next_step_title}</h2>}
                {mc.next_step_body && <p className="mc-next-body">{mc.next_step_body}</p>}
                {mc.next_step_points.length > 0 && (
                  <ol className="mc-next-points">
                    {mc.next_step_points.map((p, i) => (
                      <li key={i}>
                        <span className="mc-next-num">{i + 1}</span>
                        {p}
                      </li>
                    ))}
                  </ol>
                )}
                {nextHref && (
                  <Link className="btn btn-primary" href={nextHref}>
                    {mc.next_step_cta || "Learn more"} <IconArrow />
                  </Link>
                )}
              </div>
            )}
          </div>

          <aside className="mc-aside" aria-labelledby="mc-reg-title">
            <div className="mc-reg-card" id="register">
              <div className="mc-reg-head">
                <h2 id="mc-reg-title">{justRegistered ? "Registration confirmed" : open && !full ? "Reserve your free seat" : full ? "This session is full" : "Registration closed"}</h2>
                <p className="mc-reg-price">{mc.price_label || "FREE"}</p>
              </div>
              <ul className="mc-reg-facts">
                <li>
                  <IconCheck /> Live, interactive Q&amp;A
                </li>
                <li>
                  <IconCheck /> {formatDuration(mc.duration_minutes)} hands-on session
                </li>
                {avail?.seats_left != null && !full && !justRegistered && (
                  <li>
                    <IconSeat /> {avail.seats_left} {avail.seats_left === 1 ? "seat" : "seats"} left
                  </li>
                )}
              </ul>
              {open && !full ? (
                <RegistrationForm
                  mc={mc}
                  onRegistered={() => {
                    setJustRegistered(true);
                    loadAvail(mc.id);
                  }}
                />
              ) : (
                <div className="mc-closed-box">
                  <p>
                    {full
                      ? "All seats have been taken. Check out other upcoming sessions."
                      : `Registration closed on ${formatEventDate(closes.toISOString(), mc.timezone)}.`}
                  </p>
                  <Link className="btn btn-outline btn-block" href="/masterclasses">
                    See other masterclasses
                  </Link>
                </div>
              )}
              {open && !full && !justRegistered && mc.registration_deadline && (
                <p className="mc-fine">
                  Registration closes {formatEventDate(closes.toISOString(), mc.timezone)},{" "}
                  {formatEventTime(closes.toISOString(), mc.timezone)}.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function MasterclassEventPage() {
  return (
    <Suspense fallback={<main id="main" className="mc-page" />}>
      <EventView />
    </Suspense>
  );
}
