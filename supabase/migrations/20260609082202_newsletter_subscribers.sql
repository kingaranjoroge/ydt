create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'footer',
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
