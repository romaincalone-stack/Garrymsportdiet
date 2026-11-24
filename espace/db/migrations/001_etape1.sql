-- Étape 1 : comptes, formules, contenus. Aucune donnée de santé (DATA_DICTIONARY.md ; APP_SPEC.md §9).
-- Rendez-vous : date et lieu seulement, jamais le motif (le motif d'une consultation de diététique est une donnée de santé).

create extension if not exists pgcrypto;

-- ---------- Comptes ----------
create table profiles (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('admin', 'patient')),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  status text not null default 'active' check (status in ('active', 'suspendue', 'archivee')),
  password_hash text,                       -- vide tant que l'invitation n'est pas acceptée
  totp_secret_enc text,                     -- secret de double authentification, chiffré (AES-256-GCM, APP_SECRET)
  totp_enabled boolean not null default false,
  failed_logins int not null default 0,
  locked_until timestamptz,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);
create unique index profiles_email_key on profiles (lower(email));

create table sessions (
  token_hash text primary key,              -- empreinte SHA-256 du jeton du cookie ; le jeton lui-même n'est jamais stocké
  user_id uuid not null references profiles(id) on delete cascade,
  second_factor_ok boolean not null default false,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index sessions_user on sessions (user_id);

create table auth_tokens (                  -- invitations et réinitialisations de mot de passe, à usage unique
  token_hash text primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  kind text not null check (kind in ('invitation', 'reinitialisation')),
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Formules et accès ----------
create table plans (
  code text primary key,
  name text not null,
  price_cents int not null,
  billing_unit text not null check (billing_unit in ('consultation', 'mois', 'offert')),
  commitment_months smallint,
  upfront_price_cents int,
  upfront_months smallint,
  public boolean not null default true,
  sort_order int not null
);

create table features (
  key text primary key,
  label text not null,
  sort_order int not null default 0
);

create table plan_features (
  plan_code text not null references plans(code) on delete cascade,
  feature_key text not null references features(key) on delete cascade,
  enabled boolean not null default false,
  primary key (plan_code, feature_key)
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references profiles(id) on delete cascade,
  plan_code text not null references plans(code),
  start_date date not null,
  end_date date,
  commitment_end date,
  status text not null default 'active' check (status in ('active', 'terminee', 'suspendue')),
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);
create unique index subscriptions_one_active on subscriptions (patient_id) where status = 'active';

create table offer_requests (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references profiles(id) on delete cascade,
  offer text not null,
  created_at timestamptz not null default now(),
  handled_at timestamptz
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references profiles(id) on delete cascade,
  starts_at timestamptz not null,
  location text not null check (location in ('visio', 'la_garde', 'domicile'))
);
create unique index appointments_one_per_patient on appointments (patient_id);

-- ---------- Contenus ----------
create table recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  meal_type text not null check (meal_type in ('petit_dejeuner', 'dejeuner', 'diner', 'collation', 'dessert')),
  prep_min int not null default 0,
  cook_min int not null default 0,
  difficulty text not null default 'facile' check (difficulty in ('facile', 'moyen', 'avance')),
  base_portions int not null default 1 check (base_portions >= 1),
  kcal numeric, protein_g numeric, carbs_g numeric, fat_g numeric, fiber_g numeric,
  themes text[] not null default '{}',     -- objectifs (« Petit budget », « Anti-inflammatoire »…), jamais présentés comme un traitement
  tip text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  publish_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table recipe_ingredients (
  recipe_id uuid not null references recipes(id) on delete cascade,
  position int not null,
  quantity numeric,
  unit text not null default '',
  name text not null,
  primary key (recipe_id, position)
);

create table recipe_steps (
  recipe_id uuid not null references recipes(id) on delete cascade,
  position int not null,
  text text not null,
  primary key (recipe_id, position)
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,                       -- texte brut, paragraphes séparés par une ligne vide (affiché échappé)
  visibility text not null default 'members' check (visibility in ('public', 'members')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table documents (                    -- fiches conseils génériques uniquement (jamais de document propre à une patiente)
  id uuid primary key default gen_random_uuid(),
  title text not null,
  mime text not null,
  size_bytes int not null,
  data bytea not null,
  created_at timestamptz not null default now()
);

-- ---------- Activité des patientes (sans donnée de santé) ----------
create table favorites (
  patient_id uuid not null references profiles(id) on delete cascade,
  recipe_id uuid not null references recipes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (patient_id, recipe_id)
);

create table shopping_list_items (
  patient_id uuid not null references profiles(id) on delete cascade,
  recipe_id uuid not null references recipes(id) on delete cascade,
  portions int not null check (portions between 1 and 12),
  primary key (patient_id, recipe_id)
);

-- ---------- Paramètres, traçabilité, emails ----------
create table settings (
  key text primary key,
  value jsonb not null
);

create table audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references profiles(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  at timestamptz not null default now()
);
create index audit_log_at on audit_log (at desc);

create table email_outbox (                 -- utilisé seulement avec EMAIL_DRIVER=outbox (développement, tests)
  id bigint generated always as identity primary key,
  to_email text not null,
  subject text not null,
  body text not null,
  created_at timestamptz not null default now()
);
