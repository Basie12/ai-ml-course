"use client";

import { createClient } from "@/lib/supabase/client";
import type { SubscriptionTier } from "./plans";
import { appPath } from "./paths";

export type SessionUser = {
  userId: string;
  email: string;
  tier: SubscriptionTier;
  isAdmin: boolean;
};

function authMessage(err: unknown): string {
  if (!err) return "Something went wrong";
  if (typeof err === "object" && err && "message" in err) {
    const msg = String((err as { message: string }).message);
    if (/email not confirmed/i.test(msg)) {
      return "Email not confirmed. Retrying auto-confirm…";
    }
    if (/invalid login credentials/i.test(msg)) {
      return "Wrong email or password.";
    }
    return msg;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}

async function autoConfirmEmail(email: string) {
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const endpoints = [
    appPath("/api/auth/confirm"),
    process.env.NEXT_PUBLIC_FUNCTIONS_URL
      ? `${process.env.NEXT_PUBLIC_FUNCTIONS_URL.replace(/\/$/, "")}/confirm-email`
      : "",
  ].filter(Boolean);

  let lastError = "Could not confirm email";
  for (const endpoint of endpoints) {
    try {
      const headers: Record<string, string> = {
        "content-type": "application/json",
      };
      if (endpoint.includes("supabase.co") && anon) {
        headers.apikey = anon;
        headers.authorization = `Bearer ${anon}`;
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return;
      lastError = data.error || lastError;
    } catch {
      // try next
    }
  }
  throw new Error(lastError);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const supabase = createClient();
    const { data: auth, error } = await supabase.auth.getUser();
    if (error || !auth.user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, tier, is_admin")
      .eq("id", auth.user.id)
      .maybeSingle();

    return {
      userId: auth.user.id,
      email: profile?.email || auth.user.email || "",
      tier: (profile?.tier as SubscriptionTier) || "NONE",
      isAdmin: Boolean(profile?.is_admin),
    };
  } catch {
    return null;
  }
}

export async function registerAccount(
  email: string,
  password: string,
  phone: string
) {
  const supabase = createClient();
  const phoneTrimmed = phone.trim();
  const result = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
      data: { phone: phoneTrimmed },
    },
  });
  if (result.error) throw new Error(authMessage(result.error));

  // Project has confirm-email ON — confirm via service role so login works immediately
  if (!result.data.session) {
    await autoConfirmEmail(email);
    const login = await supabase.auth.signInWithPassword({ email, password });
    if (login.error) throw new Error(authMessage(login.error));
    if (phoneTrimmed && login.data.user) {
      await supabase
        .from("profiles")
        .update({ phone: phoneTrimmed })
        .eq("id", login.data.user.id)
        .then(({ error }) => {
          if (error) console.warn("Could not save phone to profile:", error.message);
        });
    }
    return login;
  }

  if (phoneTrimmed && result.data.user) {
    await supabase
      .from("profiles")
      .update({ phone: phoneTrimmed })
      .eq("id", result.data.user.id)
      .then(({ error }) => {
        if (error) console.warn("Could not save phone to profile:", error.message);
      });
  }
  return result;
}

export async function loginAccount(email: string, password: string) {
  const supabase = createClient();

  const attempt = () =>
    Promise.race([
      supabase.auth.signInWithPassword({ email, password }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(
                "Sign-in timed out. Check your connection and try again."
              )
            ),
          12000
        )
      ),
    ]);

  let result = await attempt();

  if (
    result.error &&
    /email not confirmed/i.test(result.error.message || "")
  ) {
    await autoConfirmEmail(email);
    result = await attempt();
  }

  if (result.error) throw new Error(authMessage(result.error));
  return result;
}

export async function logoutAccount() {
  const supabase = createClient();
  return supabase.auth.signOut();
}

export async function ensureProfile() {
  return getSessionUser();
}
