"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { getSessionUser, type SessionUser } from "@/lib/auth";
import { appPath } from "@/lib/paths";
import { MasterclassForm } from "@/components/masterclass/MasterclassForm";
import { AdminTabs } from "@/components/masterclass/AdminTabs";
import {
  adminCreateMasterclass,
  adminDeleteMasterclass,
  adminDeleteRegistration,
  adminDuplicateMasterclass,
  adminGetMasterclass,
  adminListMasterclasses,
  adminListRegistrations,
  adminSetStatus,
  adminUpdateMasterclass,
  downloadText,
  endsAt,
  eventPath,
  formatDuration,
  formatEventDate,
  formatEventTime,
  getAvailability,
  registrationsToCsv,
  type Availability,
  type Masterclass,
  type MasterclassInput,
  type Registration,
} from "@/lib/masterclasses";

type Filter = "upcoming" | "draft" | "past" | "archived" | "all";

function StatusBadge({ mc }: { mc: Masterclass }) {
  const past = endsAt(mc) < new Date();
  const label = mc.status === "published" ? (past ? "Ended" : "Published") : mc.status === "draft" ? "Draft" : "Archived";
  return <span className={`mca-status s-${past && mc.status === "published" ? "ended" : mc.status}`}>{label}</span>;
}

/* ------------------------------- list view -------------------------------- */

function ListView({ onChanged }: { onChanged: (msg: string) => void }) {
  const router = useRouter();
  const [items, setItems] = useState<Masterclass[] | null>(null);
  const [avail, setAvail] = useState<Record<string, Availability>>({});
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const load = useCallback(async () => {
    try {
      const all = await adminListMasterclasses();
      setItems(all);
      setAvail(await getAvailability(all.map((m) => m.id)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const now = new Date();
    const list = items || [];
    const out = list.filter((m) => {
      const past = endsAt(m) < now;
      if (filter === "upcoming") return m.status === "published" && !past;
      if (filter === "draft") return m.status === "draft";
      if (filter === "past") return m.status === "published" && past;
      if (filter === "archived") return m.status === "archived";
      return true;
    });
    return filter === "upcoming" || filter === "draft" ? [...out].sort((a, b) => a.starts_at.localeCompare(b.starts_at)) : out;
  }, [items, filter]);

  const counts = useMemo(() => {
    const now = new Date();
    const list = items || [];
    return {
      upcoming: list.filter((m) => m.status === "published" && endsAt(m) >= now).length,
      draft: list.filter((m) => m.status === "draft").length,
      past: list.filter((m) => m.status === "published" && endsAt(m) < now).length,
      archived: list.filter((m) => m.status === "archived").length,
      all: list.length,
    };
  }, [items]);

  async function act(id: string, fn: () => Promise<unknown>, msg: string) {
    setBusyId(id);
    setError("");
    try {
      await fn();
      onChanged(msg);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusyId("");
    }
  }

  async function duplicate(mc: Masterclass) {
    setBusyId(mc.id);
    try {
      const id = await adminDuplicateMasterclass(mc.id);
      onChanged("Duplicated as a draft. Update the date and details, then publish.");
      router.push(`/admin/masterclasses?edit=${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Duplicate failed");
      setBusyId("");
    }
  }

  return (
    <>
      <div className="mca-head">
        <div>
          <h1>Masterclasses</h1>
          <p className="meta">Create, publish and manage free live sessions. Changes go live immediately, with no code or deploy needed.</p>
        </div>
        <Link className="btn btn-primary" href="/admin/masterclasses?new=1">
          + Add masterclass
        </Link>
      </div>

      <div className="mca-filters" role="tablist" aria-label="Filter masterclasses">
        {(["upcoming", "draft", "past", "archived", "all"] as Filter[]).map((f) => (
          <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
            {{ upcoming: "Upcoming", draft: "Drafts", past: "Past", archived: "Archived", all: "All" }[f]}
            <span>{counts[f]}</span>
          </button>
        ))}
      </div>

      {error && <p className="mc-alert" role="alert">{error}</p>}
      {items === null && <p className="meta">Loading…</p>}
      {items && filtered.length === 0 && (
        <div className="mca-empty">
          <p>No masterclasses here yet.</p>
          <Link className="btn btn-outline btn-sm" href="/admin/masterclasses?new=1">
            Add masterclass
          </Link>
        </div>
      )}

      <div className="mca-list">
        {filtered.map((mc) => {
          const a = avail[mc.id];
          const busy = busyId === mc.id;
          return (
            <article key={mc.id} className="mca-item" aria-busy={busy}>
              <div className="mca-item-main">
                <div className="mca-item-top">
                  <StatusBadge mc={mc} />
                  <span className="mca-item-date">
                    {formatEventDate(mc.starts_at, mc.timezone)} · {formatEventTime(mc.starts_at, mc.timezone)} · {formatDuration(mc.duration_minutes)}
                  </span>
                </div>
                <h2>{mc.title}</h2>
                <p className="mca-item-stats">
                  <strong>{a?.registered ?? 0}</strong> registered
                  {mc.capacity != null && <> of {mc.capacity}</>}
                  {mc.registration_deadline && <> · deadline {formatEventDate(mc.registration_deadline, mc.timezone)}</>}
                </p>
              </div>
              <div className="mca-actions">
                <Link className="btn btn-outline btn-sm" href={`/admin/masterclasses?edit=${mc.id}`}>
                  Edit
                </Link>
                <Link className="btn btn-outline btn-sm" href={`/admin/masterclasses?attendees=${mc.id}`}>
                  Attendees
                </Link>
                <div className="mca-more">
                  {mc.status !== "published" ? (
                    <button type="button" className="linkish" disabled={busy} onClick={() => act(mc.id, () => adminSetStatus(mc.id, "published"), "Published. It's now live on /masterclasses.")}>
                      Publish
                    </button>
                  ) : (
                    <button type="button" className="linkish" disabled={busy} onClick={() => act(mc.id, () => adminSetStatus(mc.id, "draft"), "Unpublished (moved to drafts).")}>
                      Unpublish
                    </button>
                  )}
                  <button type="button" className="linkish" disabled={busy} onClick={() => duplicate(mc)}>
                    Duplicate
                  </button>
                  {mc.status !== "archived" && (
                    <button type="button" className="linkish" disabled={busy} onClick={() => act(mc.id, () => adminSetStatus(mc.id, "archived"), "Archived.")}>
                      Archive
                    </button>
                  )}
                  {mc.status === "published" && (
                    <a className="linkish" href={appPath(eventPath(mc.slug))} target="_blank" rel="noreferrer">
                      View page ↗
                    </a>
                  )}
                  <button
                    type="button"
                    className="linkish mca-link-danger"
                    disabled={busy}
                    onClick={() => {
                      const n = a?.registered ?? 0;
                      if (!window.confirm(`Delete "${mc.title}" permanently?${n ? ` This also deletes ${n} registration${n > 1 ? "s" : ""}.` : ""} Tip: Archive keeps the data.`)) return;
                      act(mc.id, () => adminDeleteMasterclass(mc.id), "Deleted.");
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* ------------------------------- editor view ------------------------------ */

function EditorView({ id, onDone }: { id: string | null; onDone: (msg: string) => void }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState<{ mc: Masterclass; meetingLink: string } | null | undefined>(id ? undefined : null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    adminGetMasterclass(id)
      .then((r) => {
        if (!r) setError("Masterclass not found.");
        setLoaded(r);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to load");
        setLoaded(null);
      });
  }, [id]);

  async function save(input: MasterclassInput, meetingLink: string) {
    setSaving(true);
    try {
      if (id) await adminUpdateMasterclass(id, input, meetingLink);
      else await adminCreateMasterclass(input, meetingLink);
      onDone(input.status === "published" ? "Saved and published. It's live on /masterclasses." : "Saved.");
      router.push("/admin/masterclasses");
    } finally {
      setSaving(false);
    }
  }

  if (id && loaded === undefined) return <p className="meta">Loading…</p>;
  if (id && !loaded) return <p className="mc-alert">{error || "Masterclass not found."}</p>;

  return (
    <>
      <div className="mca-head">
        <div>
          <Link className="mca-back" href="/admin/masterclasses">
            ← All masterclasses
          </Link>
          <h1>{id ? "Edit masterclass" : "Add masterclass"}</h1>
        </div>
      </div>
      <MasterclassForm
        initial={loaded?.mc}
        initialMeetingLink={loaded?.meetingLink}
        saving={saving}
        onSubmit={save}
        onCancel={() => router.push("/admin/masterclasses")}
      />
    </>
  );
}

/* ------------------------------ attendees view ---------------------------- */

function AttendeesView({ id }: { id: string }) {
  const [mc, setMc] = useState<Masterclass | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [rows, setRows] = useState<Registration[] | null>(null);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      const [r, regs] = await Promise.all([adminGetMasterclass(id), adminListRegistrations(id)]);
      if (!r) throw new Error("Masterclass not found.");
      setMc(r.mc);
      setMeetingLink(r.meetingLink);
      setRows(regs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setRows([]);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (rows || []).filter((r) => !s || `${r.full_name} ${r.email} ${r.profession}`.toLowerCase().includes(s));
  }, [rows, q]);

  async function remove(r: Registration) {
    if (!window.confirm(`Remove ${r.full_name} (${r.email}) from this masterclass?`)) return;
    try {
      await adminDeleteRegistration(r.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not remove");
    }
  }

  async function copyEmails() {
    try {
      await navigator.clipboard.writeText((rows || []).map((r) => r.email).join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy. Use Export CSV instead.");
    }
  }

  return (
    <>
      <div className="mca-head">
        <div>
          <Link className="mca-back" href="/admin/masterclasses">
            ← All masterclasses
          </Link>
          <h1>Attendees</h1>
          {mc && (
            <p className="meta">
              {mc.title} · {formatEventDate(mc.starts_at, mc.timezone)}, {formatEventTime(mc.starts_at, mc.timezone)}
            </p>
          )}
        </div>
        {mc && rows && (
          <div className="mca-head-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={copyEmails} disabled={!rows.length}>
              {copied ? "Copied ✓" : "Copy all emails"}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!rows.length}
              onClick={() => downloadText(`${mc.slug}-registrations-${new Date().toISOString().slice(0, 10)}.csv`, registrationsToCsv(rows, mc), "text/csv;charset=utf-8")}
            >
              Export CSV
            </button>
          </div>
        )}
      </div>

      {mc && (
        <div className="mca-statrow">
          <div className="mca-stat">
            <b>{rows?.length ?? "–"}</b>
            <span>registered{mc.capacity != null ? ` of ${mc.capacity}` : ""}</span>
          </div>
          <div className="mca-stat">
            <b>{rows ? rows.filter((r) => Date.now() - new Date(r.created_at).getTime() < 86400000).length : "–"}</b>
            <span>in the last 24 hours</span>
          </div>
          <div className="mca-stat mca-stat-link">
            <span>Meeting link</span>
            {meetingLink ? <code>{meetingLink}</code> : <Link href={`/admin/masterclasses?edit=${id}`}>Not set. Add it →</Link>}
          </div>
        </div>
      )}

      {error && <p className="mc-alert" role="alert">{error}</p>}

      <div className="mca-card mca-table-card">
        <div className="mca-table-tools">
          <input type="search" placeholder="Search name, email or profession" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search attendees" />
          <span className="meta">{shown.length} shown</span>
        </div>
        {rows === null ? (
          <p className="meta">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="meta mca-pad">No registrations yet. Share the event page to start collecting sign-ups.</p>
        ) : (
          <div className="mca-table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Profession</th>
                  <th scope="col">Registered</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={r.id}>
                    <td>{r.full_name}</td>
                    <td><a href={`mailto:${r.email}`}>{r.email}</a></td>
                    <td>{r.profession || <span className="meta">—</span>}</td>
                    <td className="mca-nowrap">{new Date(r.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</td>
                    <td>
                      <button type="button" className="linkish mca-link-danger" onClick={() => remove(r)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* --------------------------------- shell ---------------------------------- */

function AdminMasterclasses() {
  const params = useSearchParams();
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    document.title = "Admin · Masterclasses";
    getSessionUser().then((u) => {
      if (!u) {
        window.location.href = appPath("/login?next=/admin/masterclasses/");
        return;
      }
      setUser(u);
    });
  }, []);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(""), 5000);
    return () => clearTimeout(t);
  }, [flash]);

  if (user === undefined || user === null) {
    return (
      <main id="main" className="mca">
        <div className="wrap">
          <p className="meta">Checking access…</p>
        </div>
      </main>
    );
  }

  if (!user.isAdmin) {
    return (
      <main id="main" className="mca">
        <div className="wrap">
          <h1>Admin</h1>
          <p className="mc-alert">Admin access required. You&rsquo;re signed in as {user.email}.</p>
        </div>
      </main>
    );
  }

  const edit = params.get("edit");
  const isNew = params.get("new");
  const attendees = params.get("attendees");

  return (
    <main id="main" className="mca">
      <div className="wrap">
        <AdminTabs active="masterclasses" />
        {flash && (
          <p className="mca-flash" role="status">
            {flash}
          </p>
        )}
        {attendees ? (
          <AttendeesView id={attendees} />
        ) : edit || isNew ? (
          <EditorView key={edit || "new"} id={edit} onDone={setFlash} />
        ) : (
          <ListView onChanged={setFlash} />
        )}
      </div>
    </main>
  );
}

export default function AdminMasterclassesPage() {
  return (
    <Suspense fallback={<main id="main" className="mca" />}>
      <AdminMasterclasses />
    </Suspense>
  );
}
