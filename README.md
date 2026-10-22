# BassaCourse — AI & ML Engineer Accelerator

Next.js + **Supabase** (project **bassa academy**) + Stripe.

**Live:** https://aiwithbassa.com/  
**Admin (no nav link):** https://aiwithbassa.com/admin/

## Stack

| Piece | Tech |
|--------|------|
| Auth | Supabase Auth (email/password) |
| Database | Postgres (`profiles`, `materials`) + RLS |
| Payments | Stripe Checkout / Payment Links + `stripe-webhook` Edge Function |
| Frontend | Next.js 14 App Router (static export → cPanel) |

Project ref: `qfqquqemppunmxfnkntv`  
URL: `https://qfqquqemppunmxfnkntv.supabase.co`

## Run locally

```powershell
# Fill SUPABASE_SERVICE_ROLE_KEY in .env.local from Dashboard → Settings → API
npm install
npm run dev
```

Open http://localhost:3000

### Make yourself admin

After you sign up once:

```sql
update public.profiles set is_admin = true where email = 'your@email.com';
```

### Recommended Auth setting

Dashboard → Authentication → Providers → Email → turn **Confirm email** off (or rely on `confirm-email` Edge Function).

## Stripe

Live prices (Bassa AI Academy):

| Plan | Price ID |
|------|----------|
| Self-Paced $799 | `price_1UT5HUEjO85BLtu0okjEzlbt` |
| Cohort $1,299 | `price_1ULBgEEjO85BLtu0KOYFbDnb` |
| Mentorship $2,499 | `price_1UT5HVEjO85BLtu09yZJ23tZ` |

Webhook: `https://qfqquqemppunmxfnkntv.supabase.co/functions/v1/stripe-webhook`  
Event: `checkout.session.completed`

Optional: set `STRIPE_SECRET_KEY` on Edge Function secrets for Checkout Sessions API. Until then, Payment Links are used (with `client_reference_id`).

## Flow

1. Visitor picks a plan → **create account** first  
2. Stripe payment → webhook sets `profiles.tier`  
3. Dashboard lists materials where `tier = any(visible_to_tiers)`  
4. Admin posts file upload + document URL + visibility  

## Deploy frontend

```powershell
$env:FTP_PASS = '...'
.\scripts\deploy-cpanel.ps1
```
