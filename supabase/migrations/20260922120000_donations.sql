create extension if not exists pgcrypto;

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  amount integer not null,
  phone text not null,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'failed', 'cancelled', 'timeout')),
  checkout_request_id text unique,
  merchant_request_id text,
  mpesa_receipt_number text,
  result_code integer,
  result_desc text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists donations_checkout_request_id_idx
  on public.donations (checkout_request_id);

alter table public.donations enable row level security;
