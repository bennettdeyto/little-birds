-- Run in the Supabase SQL editor
create table birds (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  text text not null,
  created_at timestamptz default now()
);

create table posts (
  id uuid default gen_random_uuid() primary key,
  text text not null,
  created_at timestamptz default now()
);

create table boards (
  id text primary key,
  entries jsonb not null,
  created_at timestamptz default now()
);

alter table posts enable row level security;
create policy "anyone can insert" on posts for insert with check (true);
create policy "anyone can select" on posts for select using (true);

alter table birds enable row level security;
create policy "anyone can insert" on birds for insert with check (true);
create policy "anyone can select" on birds for select using (true);

alter table boards enable row level security;
create policy "anyone can insert" on boards for insert with check (true);
create policy "anyone can select" on boards for select using (true);
