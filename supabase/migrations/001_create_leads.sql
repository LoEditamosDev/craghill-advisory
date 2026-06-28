create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company_stage text,
  service_interest text,
  message text,
  source text not null default 'landing',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Allow anonymous lead inserts"
on public.leads
for insert
to anon
with check (true);

create policy "Authenticated users can manage leads"
on public.leads
for all
to authenticated
using (true)
with check (true);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false)
on conflict (id) do nothing;
