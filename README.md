# AI with Bassa — Course Website

The marketing site, student dashboard and admin panel for **AI with Bassa**, a 24-week AI & ML Engineer program for working professionals.

- **Live site:** https://aiwithbassa.com
- **Stack:** Next.js 14 (App Router, static export) · Supabase (Auth, Postgres, Edge Functions) · Stripe
- **Hosting:** static files deployed to cPanel

---

## Contents

- [How it works](#how-it-works)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Admin access](#admin-access)
- [Payments (Stripe)](#payments-stripe)
- [Design system](#design-system)
- [Contributing workflow](#contributing-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## How it works

1. A visitor picks a plan on `/pricing` and creates an account.
2. They pay through Stripe. The `stripe-webhook` Edge Function receives `checkout.session.completed` and sets `profiles.tier`.
3. The student dashboard lists materials where `tier = any(visible_to_tiers)`.
4. An admin uploads files or document links and chooses which tiers can see them.

| Plan | Price | Tier value |
|------|-------|------------|
| Self-Paced | $799 | `SELF_PACED` |
| Founding Cohort | $1,299 | `COHORT` |
| Mentorship | $2,499 | `MENTORSHIP` |

---

## Tech stack

| Piece | Technology |
|-------|------------|
| Frontend | Next.js 14 App Router, exported as static files |
| Auth | Supabase Auth (email + password) |
| Database | Postgres: `profiles`, `materials`, with Row Level Security |
| Payments | Stripe Checkout / Payment Links + `stripe-webhook` Edge Function |
| Hosting | cPanel (static upload via deploy script) |

**Supabase project:** `bassa academy` (ref `qfqquqemppunmxfnkntv`)

### Project structure

```
app/          Routes (pages, layouts) — App Router
components/   Reusable UI components
lib/          Supabase client, Stripe helpers, utilities
public/       Static assets (images, fonts, favicon)
scripts/      Deployment scripts (cPanel)
```

---

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/nathnaeldem/bassacourse.git
cd bassacourse
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build and export the static site |
| `npm run lint` | Check code style |

---

## Environment variables

Copy `.env.example` to `.env.local`. **Never commit `.env.local`.**

| Variable | Where to find it | Exposed to browser? |
|----------|------------------|---------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | Yes (safe) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Yes (safe, protected by RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | **No — server/scripts only** |

> ⚠️ The service role key bypasses Row Level Security. It must never be prefixed with `NEXT_PUBLIC_` or imported by any file under `app/` or `components/`, because a static export ships those to the browser.

Edge Function secrets (set in Supabase → Edge Functions → Secrets, not in `.env.local`):

| Secret | Purpose |
|--------|---------|
| `STRIPE_WEBHOOK_SECRET` | Verifies that webhook calls really come from Stripe |
| `STRIPE_SECRET_KEY` | Optional. Enables the Checkout Sessions API; without it the site uses Payment Links with `client_reference_id` |

---

## Admin access

The admin panel lives at `/admin`. It has no nav link, but access is enforced by the `is_admin` flag and RLS, not by hiding the URL.

To make an account an admin, sign up once, then run this in the Supabase SQL editor:

```sql
update public.profiles set is_admin = true where email = 'your@email.com';
```

### Email confirmation

Supabase → Authentication → Providers → Email. Either keep **Confirm email** on and rely on the `confirm-email` Edge Function, or turn it off for a faster signup. Turning it off means anyone can register with an email they don't own.

---

## Payments (Stripe)

| Plan | Price ID |
|------|----------|
| Self-Paced $799 | `price_1UT5HUEjO85BLtu0okjEzlbt` |
| Founding Cohort $1,299 | `price_1ULBgEEjO85BLtu0KOYFbDnb` |
| Mentorship $2,499 | `price_1UT5HVEjO85BLtu09yZJ23tZ` |

- **Webhook endpoint:** `https://qfqquqemppunmxfnkntv.supabase.co/functions/v1/stripe-webhook`
- **Event:** `checkout.session.completed`

To test payments, use Stripe **test mode** keys and price IDs with the card `4242 4242 4242 4242`, never live prices.

---

## Design system

The site uses a hybrid theme: navy for the nav, hero, projects and final call to action; white and light gray for content-heavy sections.

| Token | Hex | Use |
|-------|-----|-----|
| Navy 900 | `#0B1426` | Dark section background, headings on light |
| Navy 800 | `#111D35` | Secondary dark background |
| Gray 50 | `#F6F8FB` | Alternate light section background |
| Body text | `#334155` / `#B6C2D9` | On light / on dark |
| Primary CTA | `#2563EB` (hover `#1D4ED8`) | Buttons and clickable elements only |
| Cyan accent | `#5EC8F0` / `#0E7490` | Highlights on dark / on light |
| Amber | `#F5B841` | Seat-count badge only |

**Fonts:** Inter Tight (headings), Inter (body), JetBrains Mono (labels and code chips). All text pairs meet WCAG AA contrast.

---

## Contributing workflow

Don't push directly to `main`. Work on a branch and open a pull request.

```bash
git checkout main
git pull
git checkout -b design/short-description   # or fix/..., feature/...
# make changes
git add .
git commit -m "Describe the change"
git push -u origin design/short-description
```

Then open a pull request into `main` on GitHub. Before requesting review, run `npm run build` to confirm the site still exports.

---

## Deployment

The frontend is a static export uploaded to cPanel.

```powershell
npm run build
$env:FTP_PASS = '...'          # never commit this
.\scripts\deploy-cpanel.ps1
```

After deploying, check the live site's home page, pricing page and a test login.

---

## Troubleshooting

| Problem | Likely fix |
|---------|------------|
| Paid but dashboard shows no access | Check Stripe → Webhooks for failed deliveries; confirm `profiles.tier` updated |
| Can't open `/admin` | Run the admin SQL above for your email, then sign out and back in |
| Signup email never arrives | Check the Email provider settings and the `confirm-email` function logs |
| Build works locally, broken on cPanel | Confirm the whole `out/` folder uploaded and `.htaccess` rules are in place |