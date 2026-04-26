create extension if not exists pgcrypto;

create table public.devices (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null check (char_length(name) between 2 and 40),
  color        text not null default '#ffffff' check (color ~ '^#[0-9a-fA-F]{6}$'),
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz
);

create index devices_slug_idx          on public.devices (slug);
create index devices_last_seen_idx     on public.devices (last_seen_at desc nulls last);

alter table public.devices enable row level security;

-- PHASE 1 IS UNAUTHENTICATED. RLS is intentionally permissive.
-- Tightening these policies BEFORE Phase 2 ships Google OAuth = repeat of
-- the 2026-04-24 BRIEF 02 incident at files.primal-lifestyle.com.
-- Do not touch until Phase 2.
create policy "anon read devices"     on public.devices for select to anon using (true);
create policy "anon insert device"    on public.devices for insert to anon with check (true);
create policy "anon update last_seen" on public.devices for update to anon using (true) with check (true);
-- No delete policy → anon cannot delete (the only lockdown we want here).
