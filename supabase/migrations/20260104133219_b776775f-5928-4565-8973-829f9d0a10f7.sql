do $$
begin
  create type public.app_role as enum ('admin', 'moderator', 'user');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create index if not exists idx_user_roles_user_id on public.user_roles (user_id);
create index if not exists idx_user_roles_role on public.user_roles (role);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

create or replace function public.any_admin_exists()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where role = 'admin'
  )
$$;

create or replace function public.claim_first_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  _uid uuid := auth.uid();
begin
  if _uid is null then
    return false;
  end if;

  -- Prevent races between simultaneous signups
  perform pg_advisory_xact_lock(987654321);

  if exists (select 1 from public.user_roles where role = 'admin') then
    return false;
  end if;

  insert into public.user_roles(user_id, role)
  values (_uid, 'admin');

  return true;
exception
  when unique_violation then
    return false;
end;
$$;

-- Lock down function execution
revoke all on function public.has_role(uuid, public.app_role) from public;
revoke all on function public.any_admin_exists() from public;
revoke all on function public.claim_first_admin() from public;

grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.any_admin_exists() to authenticated;
grant execute on function public.claim_first_admin() to authenticated;

-- Policies

drop policy if exists "Users can view own roles" on public.user_roles;
create policy "Users can view own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Admins can insert roles" on public.user_roles;
create policy "Admins can insert roles"
on public.user_roles
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can update roles" on public.user_roles;
create policy "Admins can update roles"
on public.user_roles
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can delete roles" on public.user_roles;
create policy "Admins can delete roles"
on public.user_roles
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));