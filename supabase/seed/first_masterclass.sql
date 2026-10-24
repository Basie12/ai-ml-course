-- First masterclass. Run once after the migration (Supabase → SQL Editor).
-- Everything here can be edited later from /admin/masterclasses — no code changes needed.
-- Nov 1, 2026 is the day US clocks fall back, so 2:00 PM Eastern that afternoon is EST (UTC−5) = 19:00 UTC.

insert into public.masterclasses (
  slug, title, subtitle, description, topics, starts_at, timezone, duration_minutes,
  instructor_name, instructor_title, price_label, capacity, registration_deadline,
  next_step_title, next_step_body, next_step_points, next_step_url, next_step_cta, status
) values (
  'build-your-first-ml-model-python',
  'Build Your First Machine Learning Model in Python — LIVE!',
  'A free 90-minute live session: go from raw data to a working prediction model, and see what it takes to become an AI/ML engineer.',
  E'Machine learning can feel abstract until you build something with it. In this live, hands-on session we will build a real prediction model in Python together, step by step, and connect it to the statistics behind it.\n\nYou will see how a model goes from a notebook toward production, and leave with a clear roadmap for growing into an AI/ML engineering role.\n\nBring your laptop if you want to code along, or just watch and ask questions. Some programming experience helps, but you do not need to be a Python expert.',
  array[
    'How machine learning works',
    'Building a prediction model using Python',
    'Connecting Python, statistics and ML',
    'Moving ML models toward production',
    'Roadmap to becoming an AI/ML Engineer'
  ],
  '2026-11-01 19:00:00+00',
  'America/New_York',
  90,
  'Bassa (Basazin Belhu)',
  'AI/ML Engineer · Instructor, AI with Bassa',
  'FREE',
  null,
  null,
  'Ready to go further? The 24-Week AI & ML Engineering Accelerator',
  'The masterclass is your starting point. The accelerator takes you from ML foundations to production AI systems over 24 weeks, with live sessions, project reviews and six industry-standard portfolio projects.',
  array[
    'Customer Churn Prediction System',
    'Risk Prediction API',
    'Full MLOps Pipeline on AWS',
    'Production RAG System',
    'Multi-Agent Support System',
    'Your Production AI Platform'
  ],
  '/#pricing',
  'Explore the 24-week accelerator',
  'published'
)
on conflict (slug) do nothing;

-- Placeholder for the meeting link (set the real Zoom / Meet link in the admin dashboard).
insert into public.masterclass_private (masterclass_id, meeting_link)
select id, '' from public.masterclasses where slug = 'build-your-first-ml-model-python'
on conflict (masterclass_id) do nothing;
