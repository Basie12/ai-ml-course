"use client";

import { createClient } from "@/lib/supabase/client";
import type { SubscriptionTier } from "./plans";
import { appPath } from "./paths";

export type Material = {
  id: string;
  title: string;
  description?: string;
  material_type?: "VIDEO" | "GOOGLE_DOC" | "OTHER" | null;
  url?: string | null;
  file_url?: string | null;
  document_url?: string | null;
  phase?: string;
  sort_order?: number;
  published?: boolean;
  visible_to_tiers?: string[];
};

export type MeResponse = {
  userId: string;
  email: string;
  tier: SubscriptionTier;
  isAdmin: boolean;
};

function apiBase() {
  // Prefer same-origin Next API when available; fall back to Supabase functions URL
  return process.env.NEXT_PUBLIC_FUNCTIONS_URL?.replace(/\/$/, "") || "";
}

export const api = {
  async me(): Promise<MeResponse> {
    const supabase = createClient();
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError || !auth.user) throw new Error("Not signed in");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("email, tier, is_admin")
      .eq("id", auth.user.id)
      .single();

    if (error) throw new Error(error.message);

    return {
      userId: auth.user.id,
      email: profile.email || auth.user.email || "",
      tier: profile.tier as SubscriptionTier,
      isAdmin: profile.is_admin,
    };
  },

  async ensureProfile() {
    return this.me();
  },

  async checkout(
    plan: string,
    urls: { successUrl: string; cancelUrl: string }
  ) {
    const supabase = createClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) throw new Error("Not signed in");

    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const endpoints = [
      appPath("/api/checkout"),
      apiBase() ? `${apiBase()}/create-checkout` : "",
    ].filter(Boolean);

    let lastError = "Checkout failed";
    for (const endpoint of endpoints) {
      try {
        const headers: Record<string, string> = {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        };
        if (endpoint.includes("supabase.co") && anon) {
          headers.apikey = anon;
        }
        const res = await fetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({ plan, ...urls }),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          return data as { url: string; sessionId: string };
        }
        lastError = data.error || lastError;
      } catch {
        // try next endpoint
      }
    }
    throw new Error(lastError);
  },

  async listMaterials() {
    const supabase = createClient();
    const me = await this.me();
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);
    return {
      items: (data || []) as Material[],
      tier: me.tier,
      isAdmin: me.isAdmin,
    };
  },

  async uploadCourseFile(file: File) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not signed in");

    const safe = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${user.id}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage
      .from("course-files")
      .upload(path, file, { upsert: false });
    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("course-files").getPublicUrl(path);
    return data.publicUrl;
  },

  async createMaterial(body: {
    title: string;
    description?: string;
    fileUrl?: string;
    documentUrl?: string;
    phase?: string;
    sortOrder?: number;
    visibleToTiers?: string[];
  }) {
    const supabase = createClient();
    const hasFile = Boolean(body.fileUrl);
    const hasDoc = Boolean(body.documentUrl);
    if (!hasFile && !hasDoc) {
      throw new Error("Add a file upload and/or a document URL");
    }

    const materialType = hasFile
      ? "VIDEO"
      : hasDoc
        ? "GOOGLE_DOC"
        : "OTHER";

    const { data, error } = await supabase
      .from("materials")
      .insert({
        title: body.title,
        description: body.description || "",
        material_type: materialType,
        url: body.fileUrl || body.documentUrl || null,
        file_url: body.fileUrl || null,
        document_url: body.documentUrl || null,
        phase: body.phase || "",
        sort_order: body.sortOrder || 0,
        published: true,
        visible_to_tiers: body.visibleToTiers || [],
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data as Material;
  },

  async deleteMaterial(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("materials").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { deleted: id };
  },
};
