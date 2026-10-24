"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSessionUser, type SessionUser } from "@/lib/auth";
import { api, type Material } from "@/lib/api";
import type { PaidPlan } from "@/lib/plans";
import { appPath } from "@/lib/paths";
import { AdminTabs } from "@/components/masterclass/AdminTabs";

const TIERS: PaidPlan[] = ["SELF_PACED", "COHORT", "MENTORSHIP"];

export default function AdminPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [documentUrl, setDocumentUrl] = useState("");
  const [phase, setPhase] = useState("Phase 1");
  const [sortOrder, setSortOrder] = useState(0);
  const [visibleTo, setVisibleTo] = useState<PaidPlan[]>(["COHORT"]);

  async function refresh() {
    const data = await api.listMaterials();
    setMaterials(data.items || []);
  }

  useEffect(() => {
    getSessionUser().then(async (session) => {
      if (!session) {
        window.location.href = appPath("/login?next=/admin");
        return;
      }
      setUser(session);
      if (!session.isAdmin) {
        setError("Admin access required.");
        return;
      }
      try {
        await refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    });
  }, []);

  function toggleTier(tier: PaidPlan) {
    setVisibleTo((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!visibleTo.length) {
      setError("Select at least one subscriber type");
      return;
    }
    if (!file && !documentUrl.trim()) {
      setError("Upload a file and/or add a document URL");
      return;
    }
    setBusy(true);
    setError("");
    setOk("");
    try {
      let fileUrl: string | undefined;
      if (file) {
        setOk("Uploading file…");
        fileUrl = await api.uploadCourseFile(file);
      }
      await api.createMaterial({
        title,
        description,
        fileUrl,
        documentUrl: documentUrl.trim() || undefined,
        phase,
        sortOrder,
        visibleToTiers: visibleTo,
      });
      setOk("Material published");
      setTitle("");
      setDescription("");
      setFile(null);
      setDocumentUrl("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this material?")) return;
    await api.deleteMaterial(id);
    await refresh();
  }

  if (!user) {
    return (
      <main className="admin">
        <h1>Loading admin…</h1>
      </main>
    );
  }

  if (!user.isAdmin) {
    return (
      <main className="admin">
        <h1>Admin</h1>
        <p className="error">{error}</p>
      </main>
    );
  }

  return (
    <main className="admin">
      <AdminTabs active="materials" />
      <h1>Admin · Course materials</h1>
      <p className="meta">
        Title, description, upload a video/file, and optionally a document link.
        Visibility by subscriber type.
      </p>

      <div className="admin-grid">
        <form className="panel" style={{ margin: 0 }} onSubmit={onCreate}>
          <h1 style={{ fontSize: "1.35rem" }}>New material</h1>
          <div className="form">
            <label>
              Title
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Week 1 — Python foundations"
              />
            </label>
            <label>
              Description
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What students will learn…"
              />
            </label>
            <label>
              File upload (video or file)
              <input
                type="file"
                accept="video/*,.pdf,.doc,.docx,.ppt,.pptx,.zip,audio/*,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            {file && (
              <p className="meta" style={{ margin: 0 }}>
                Selected: {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            )}
            <label>
              Document URL (Google Doc, Notion, etc.)
              <input
                type="url"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                placeholder="https://docs.google.com/…"
              />
            </label>
            <label>
              Phase / section
              <input value={phase} onChange={(e) => setPhase(e.target.value)} />
            </label>
            <label>
              Sort order
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />
            </label>
            <div>
              <p style={{ margin: "0 0 0.5rem", color: "var(--muted)" }}>
                Visible to
              </p>
              <div className="checks">
                {TIERS.map((t) => (
                  <label key={t}>
                    <input
                      type="checkbox"
                      checked={visibleTo.includes(t)}
                      onChange={() => toggleTier(t)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            {ok && <p className="success">{ok}</p>}
            <button className="btn btn-block" disabled={busy} type="submit">
              {busy ? "Publishing…" : "Publish material"}
            </button>
          </div>
        </form>

        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>
            Published ({materials.length})
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Links</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.title}</strong>
                    <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                      {m.phase} · {(m.visible_to_tiers ?? []).join(", ")}
                    </div>
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>
                    {(m.file_url || m.url) && (
                      <div>
                        <a
                          href={m.file_url || m.url || "#"}
                          target="_blank"
                          rel="noreferrer"
                        >
                          File
                        </a>
                      </div>
                    )}
                    {m.document_url && (
                      <div>
                        <a
                          href={m.document_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Doc
                        </a>
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="linkish"
                      onClick={() => onDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
