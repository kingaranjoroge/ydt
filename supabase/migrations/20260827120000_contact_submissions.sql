create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  enquiry_type text not null,
  message text not null,
  status text not null default 'new',
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
