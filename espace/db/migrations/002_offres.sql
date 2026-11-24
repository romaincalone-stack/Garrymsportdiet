-- Étape 1, compléments : points forts des offres, suivi des demandes, anti-rejeu des codes de double authentification.
alter table plans add column highlights text[] not null default '{}';
-- Demande d'offre : qui l'a traitée.
alter table offer_requests add column handled_by uuid references profiles(id);
-- Double authentification : dernière période de code acceptée (un même code ne sert qu'une fois).
alter table profiles add column totp_last_step bigint;
