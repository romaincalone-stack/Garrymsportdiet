# Espace patiente et back-office (étape 1)

Application Next.js 16 (App Router) + TypeScript + PostgreSQL. Étape 1 de `APP_SPEC.md` §9 : comptes sur invitation, offres et accès, recettes et liste de courses, articles, fiches conseils, « Mes offres », Doctolib ; back-office de Manon avec double authentification obligatoire. **Aucune donnée de santé** à cette étape (`DATA_DICTIONARY.md`).

## Lancer en local

Prérequis : Node.js 22, PostgreSQL 15 ou plus.

```bash
cd espace
npm install
cp .env.example .env.local        # puis remplir APP_SECRET (32 caractères aléatoires au moins) et DATABASE_URL
npm run db:migrate
npm run db:seed -- --demo         # contenu fictif tiré du prototype + compte manon@exemple.fr ; affiche le lien d'activation
npm run dev                       # http://localhost:3100
```

Remettre la base de développement à zéro : `DATABASE_URL=… scripts/reset-dev.sh`.
Emails en développement : `EMAIL_DRIVER=outbox` les enregistre en base, lisibles sur `/dev/emails` (page introuvable en production).

## Vérifier

```bash
npm run typecheck && npm test     # types et tests unitaires (mots de passe, double authentification RFC 6238, chiffrement, minPlan)
npx next build
cd .. && npm run check:espace     # parcours complet sur l'application construite (base remise à zéro) ; attendu « NO ERRORS »
```

`check:espace` : activation de Manon, double authentification obligatoire, création d'une patiente, invitation, activation, aperçu de 3 recettes et verrouillage, portions, liste de courses, favoris, fiche PDF, demande d'offre, changement d'offre, rendez-vous à l'heure de Paris, publication d'une recette, suspension, code de double authentification à usage unique, largeur 390 px, captures `tools/shots/espace-*.png`.

## Organisation

| Dossier | Rôle |
| --- | --- |
| `db/migrations/` | SQL appliqué une fois chacun, dans l'ordre (`scripts/migrate.mjs`, table `schema_migrations`) |
| `scripts/seed.mjs` | Offres, fonctionnalités, matrice d'accès (écrite à la première installation seulement), réglages, compte de Manon (`ADMIN_EMAIL`) ; `--demo` ajoute le contenu fictif |
| `lib/` | `db` (pool PostgreSQL), `crypto` (scrypt, jetons, TOTP, AES-256-GCM), `session` (cookie `gm_session`), `auth` (`requirePatient`, `requireAdmin`, `audit`), `access` (`can`, `minPlan`), `data` (offres, matrice, réglages, `patientAccess`), `recipes`, `email`, `format` |
| `app/connexion`, `app/invitation`, `app/mot-de-passe-oublie`, `app/reinitialisation` | Connexion et mots de passe ; `app/actions/auth.ts` |
| `app/espace/` | Espace patiente (thème sombre) ; actions dans `app/espace/actions.ts` |
| `app/admin/` | Back-office (thème clair) ; actions dans `app/admin/actions.ts` |

Règles de code : chaque page et chaque action serveur vérifie la session elle-même (`requirePatient()` ou `requireAdmin()`), un layout ne suffit pas. L'accès à une fonctionnalité passe par `patientAccess(id).can(clé)`, jamais par un test sur le code d'une offre.

## Sécurité

- Mots de passe : scrypt (N = 2^15), 10 caractères au moins ; 5 échecs → compte bloqué 15 minutes.
- Sessions : jeton aléatoire dans un cookie `httpOnly`, `SameSite=Lax`, `Secure` en production ; seule son empreinte SHA-256 est en base. 30 jours pour une patiente, 12 heures pour Manon. Changement de mot de passe, suspension ou archivage : déconnexion des autres appareils.
- Invitations (7 jours) et réinitialisations (1 heure) : à usage unique, empreinte seule en base. « Mot de passe oublié » répond pareil que le compte existe ou non.
- Double authentification de Manon (TOTP) : obligatoire avant tout accès au back-office ; secret chiffré en base avec `APP_SECRET` ; un même code ne sert qu'une fois.
- Journal des actions (`audit_log`) : connexions de Manon, créations, modifications, changements d'offre, invitations, suspensions.
- En-têtes : `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Strict-Transport-Security`. Actions serveur protégées par Next.js (vérification d'origine).
- Emails : jamais de donnée de santé (ni motif, ni mesure).

Perte du téléphone de Manon : sur la base, `update profiles set totp_enabled = false, totp_secret_enc = null, totp_last_step = null where role = 'admin';` puis supprimer ses sessions (`delete from sessions where user_id = …`). Elle reconfigure la double authentification à la connexion suivante. À faire par la personne qui gère le déploiement, après avoir vérifié l'identité de Manon.

## Mise en ligne (quand le contrat HDS est signé)

Ne pas déployer avant : contrat avec une plateforme gérée certifiée HDS pour les 6 activités (`INTEGRATIONS.md`), politique de confidentialité et mentions complétées (les `[crochets]` de `/confidentialite`), numéro ADELI ou RPPS saisi dans Réglages, liste « Profession » de `APP_SPEC.md` §8 relue.

1. Sur la plateforme : une application Node.js 22 (dossier `espace`, commande de build `npm ci && npm run build`, commande de démarrage `npm start`, port fourni dans `PORT`) et une base PostgreSQL gérée, hébergées en France, sauvegardes activées.
2. Variables d'environnement (valeurs dans la console de la plateforme, jamais dans le dépôt) : `DATABASE_URL`, `APP_SECRET`, `APP_URL`, `EMAIL_DRIVER=brevo`, `BREVO_API_KEY`, `EMAIL_FROM`, `EMAIL_FROM_NAME`, `ADMIN_EMAIL`, `NODE_ENV=production`. Taille : 512 Mo suffisent (Clever Cloud « nano »), avec `NODE_OPTIONS=--max-old-space-size=256` ; mesure : `node tools/mesure-memoire.mjs` depuis la racine du dépôt (`references/hebergement-hds-2026-11-24.md`, § 4 bis).
3. Première installation : `npm run db:migrate`, puis `npm run db:seed` (sans `--demo`). Le terminal affiche le lien d'activation de Manon : le lui transmettre par un canal sûr. Elle choisit son mot de passe, puis configure la double authentification.
4. À chaque mise à jour : `npm run db:migrate` avant de démarrer la nouvelle version.
5. Domaine : `espace.<domaine>` en HTTPS ; dans Brevo, domaine d'envoi vérifié (SPF, DKIM).

Le développeur déploie le code ; serveurs, système et base sont administrés par la plateforme (activité 5 de l'HDS).
