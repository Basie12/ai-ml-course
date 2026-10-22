"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSessionUser, type SessionUser } from "@/lib/auth";
import { api, type Material } from "@/lib/api";
import { planLabel, type SubscriptionTier } from "@/lib/plans";
import { appPath } from "@/lib/paths";

function DashboardInner() {
  const params = useSearchParams();
  const checkout = params.get("checkout");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [tier, setTier] = useState<SubscriptionTier>("NONE");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const session = await getSessionUser();
      if (!session) {
        window.location.href = appPath("/login?next=/dashboard");
        return;
      }
      setUser(session);
      try {
        const data = await api.listMaterials();
        setTier((data.tier as SubscriptionTier) || "NONE");
        setMaterials(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <main className="dashboard">
        <h1>Loading your courses…</h1>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <h1>My course materials</h1>
      <p className="meta">
        {user?.email} · Plan: <strong>{planLabel(tier)}</strong>
      </p>

      {checkout === "success" && (
        <p className="success">
          Payment received. Refresh if materials take a moment to appear.
        </p>
      )}
      {error && <p className="error">{error}</p>}

      {tier === "NONE" && !user?.isAdmin ? (
        <div className="panel" style={{ margin: "0 0 2rem" }}>
          <h1 style={{ fontSize: "1.4rem" }}>No active subscription</h1>
          <p>Choose a plan to unlock videos and documents.</p>
          <Link className="btn" href="/pricing">
            View pricing
          </Link>
        </div>
      ) : materials.length === 0 ? (
        <p className="meta">No materials for your plan yet.</p>
      ) : (
        <div className="material-list">
          {materials.map((m) => {
            const fileHref = m.file_url || m.url;
            return (
              <article className="material" key={m.id}>
                <div>
                  <h3>{m.title}</h3>
                  <p>
                    {m.phase && <span className="tag">{m.phase}</span>}
                    {m.description}
                  </p>
                </div>
                <div className="cta-row">
                  {fileHref && (
                    <a
                      className="btn btn-sm"
                      href={fileHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open file
                    </a>
                  )}
                  {m.document_url && (
                    <a
                      className="btn btn-sm btn-ghost"
                      href={m.document_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Document
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="dashboard">
          <h1>Loading…</h1>
        </main>
      }
    >
      <DashboardInner />
    </Suspense>
  );
}
