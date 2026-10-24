"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MasterclassBanner } from "@/components/masterclass/MasterclassBanner";
import { IconArrow, IconCalendar, IconClock, IconSeat, IconTimer } from "@/components/masterclass/Icons";
import {
  endsAt,
  eventPath,
  formatDuration,
  formatEventDate,
  formatEventTime,
  formatShortDate,
  getAvailability,
  isRegistrationOpen,
  listPublishedMasterclasses,
  type Availability,
  type Masterclass,
} from "@/lib/masterclasses";

export default function MasterclassesPage() {
  const [items, setItems] = useState<Masterclass[] | null>(null);
  const [avail, setAvail] = useState<Record<string, Availability>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Free AI/ML Masterclasses · AI with Bassa";
    listPublishedMasterclasses()
      .then(async (all) => {
        const now = new Date();
        const upcoming = all.filter((m) => endsAt(m) > now);
        setItems(upcoming);
        setAvail(await getAvailability(upcoming.map((m) => m.id)));
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Could not load masterclasses");
        setItems([]);
      });
  }, []);

  return (
    <main id="main" className="mc-page">
      <section className="mc-hero">
        <div className="wrap">
          <p className="eyebrow">Free live sessions</p>
          <h1>
            AI/ML masterclasses, <span className="grad-text">live and free</span>
          </h1>
          <p className="mc-hero-sub">
            Join a hands-on session with a working AI/ML engineer. Build something real, ask questions live, and see what
            it takes to grow into an AI engineering role.
          </p>
        </div>
      </section>

      <section className="mc-list-section">
        <div className="wrap">
          {items === null && (
            <div className="mc-grid" aria-busy="true" aria-label="Loading masterclasses">
              {[0, 1].map((i) => (
                <div key={i} className="mc-card mc-skeleton" />
              ))}
            </div>
          )}

          {error && (
            <p className="mc-alert" role="alert">
              {error}
            </p>
          )}

          {items && items.length === 0 && !error && (
            <div className="mc-empty">
              <h2>No upcoming masterclasses right now</h2>
              <p>New sessions are announced regularly. In the meantime, explore the full 24-week program.</p>
              <Link className="btn btn-primary" href="/#roadmap">
                Explore the program <IconArrow />
              </Link>
            </div>
          )}

          {items && items.length > 0 && (
            <div className="mc-grid">
              {items.map((mc) => {
                const sd = formatShortDate(mc.starts_at, mc.timezone);
                const a = avail[mc.id];
                const open = isRegistrationOpen(mc);
                const full = a?.seats_left === 0;
                return (
                  <article key={mc.id} className="mc-card">
                    <Link href={eventPath(mc.slug)} className="mc-card-media" tabIndex={-1} aria-hidden="true">
                      <MasterclassBanner url={mc.banner_url} title={mc.title} />
                      <span className="mc-date-badge">
                        <b>{sd.month}</b>
                        <span>{sd.day}</span>
                      </span>
                      <span className="mc-price-badge">{mc.price_label || "FREE"}</span>
                    </Link>
                    <div className="mc-card-body">
                      <h2 className="mc-card-title">
                        <Link href={eventPath(mc.slug)}>{mc.title}</Link>
                      </h2>
                      {mc.subtitle && <p className="mc-card-sub">{mc.subtitle}</p>}
                      <ul className="mc-meta">
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
                        {a?.seats_left != null && !full && (
                          <li>
                            <IconSeat />
                            {a.seats_left} {a.seats_left === 1 ? "seat" : "seats"} left
                          </li>
                        )}
                      </ul>
                      <div className="mc-card-foot">
                        {open && !full ? (
                          <Link className="btn btn-primary btn-sm" href={eventPath(mc.slug)}>
                            Register free <IconArrow />
                          </Link>
                        ) : (
                          <span className="mc-closed">{full ? "Fully booked" : "Registration closed"}</span>
                        )}
                        <Link className="mc-details-link" href={eventPath(mc.slug)}>
                          View details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
