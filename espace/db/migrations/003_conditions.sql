-- Preuve d'acceptation des conditions d'utilisation (legal/cgu-espace.md : version et date enregistrées à l'activation).
alter table profiles add column terms_version text;
alter table profiles add column terms_accepted_at timestamptz;
