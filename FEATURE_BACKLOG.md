# FEATURE_BACKLOG

Priorités : **P0** indispensable au lancement · **P1** important · **P2** confort · **Idée** non engagée.

## Livré

| Date | Fonctionnalité | Détail |
| --- | --- | --- |
| 2026-10-22 | Cahier des charges v2 | Rédigé dans Claude Docs, puis repris dans `APP_SPEC.md` |
| 2026-10-22 | Prototype v1 | Site public, espace patiente, back-office ; matrice d'accès modifiable (`prototype/archive/v1-2026-10-22.html`) |
| 2026-10-22 | Prototype v2 : nouveau design | Direction « papiers découpés de la Riviera » (palette remplacée depuis par la v2 du brief), titres cinétiques, dossards, billets, barre d'onglets mobile en verre dépoli, transitions entre pages, mode sombre (`prototype/index.html`) |
| 2026-10-22 | Documentation du projet | `CLAUDE.md`, `APP_SPEC.md`, `BRAND_BRIEF.md`, `DATA_DICTIONARY.md`, `INTEGRATIONS.md`, `JOURNAL_ERREURS.md`, références design |
| 2026-10-22 | Brief de marque v2 « Pinède et citron vert » (remplacé par la v3) | Inspiré de 4 sites Awwwards (Calmlyss, Farm Minerals, Voldog, The Podcast Coach) ; palette vert pin #204E4A, forêt #245333, citron vert #E1E53F appliquée au prototype |
| 2026-10-22 | Brief de marque v3 « Olivier et argile » | Calmlyss, Farm Minerals et Voldog capturés et mesurés ; Geist + Instrument Serif ; crème, olive, sauge, moka, argile ; prototype refait (carte d'accueil, rangée de ronds, chiffres clés, pilules à flèche, illustrations au trait, cartes tarif) |
| 2026-10-22 | Croissance au défilement et traînée de graines | Formes de « La méthode » qui poussent ; traînée derrière le curseur sur le site public (souris uniquement) |
| 2026-10-22 | Script de vérification | `npm run check` : parcours automatisé, erreurs JS, débordement mobile |

## En cours

| Priorité | Fonctionnalité | Prochaine action |
| --- | --- | --- |
| P0 | Validation du prototype par Manon | Rendez-vous de 45 min avec le prototype + tableau des hypothèses (APP_SPEC §6) |
| P0 | Nom de marque et logo | Confirmer « Garrym · Sport Diet », faire dessiner le logo |

## À faire

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | Choix définitif de la stack (proposée : Next.js + Supabase + Vercel) | Validation prototype |
| P0 | Projet Supabase UE, schéma et RLS (`DATA_DICTIONARY.md`) | Stack |
| P0 | Authentification par invitation, création de compte par Manon | Supabase |
| P0 | Matrice d'accès en base (`plan_features`, `has_feature`) | Supabase |
| P0 | Back-office : patientes, formules, prochaine consultation | Auth |
| P0 | Recettes : saisie, publication programmée, fiche, filtres | Supabase |
| P0 | Semainiers : modèles et attribution | Recettes |
| P0 | Pages légales : mentions, confidentialité, CGV | Manon / juriste |
| P0 | Site public administrable (textes, tarifs, photos) | Stack |
| P1 | Vidéos : hébergeur, bibliothèque, filtres | Choix Bunny / Vimeo |
| P1 | Programme sportif et cases « fait » | Vidéos |
| P1 | Séances collectives : inscription, capacité, liste d'attente | Auth |
| P1 | Emails : invitation, rappels J-1 et H-1, expiration J-7, liste d'attente | Resend / Brevo |
| P1 | Liste de courses | Recettes |
| P1 | Référencement local (Google Business Profile, balises, mots-clés du brief) | Site public |
| P1 | Nom de domaine et adresse email pro | Manon |
| P0 | Shooting photo (Manon, cabinets, plats vus du dessus, mains, pinède) | Manon |
| P1 | Cadres ovales pour les portraits et mosaïque photo (réf. Calmlyss) | Photos |
| P1 | Mot géant translucide qui passe sous une photo (réf. Farm Minerals) | Photos |
| P1 | Bascule « Nutrition / Sport » sur l'accueil (réf. Voldog) | Validation du brief v3 |
| P1 | Assiette qui se compose au défilement, ingrédients expliqués (réf. Farm Minerals, Voldog) | Photos ou illustrations des ingrédients |
| P2 | Balayage au doigt des recettes sur mobile (réf. Calmlyss) | Recettes |
| P2 | Web app installable (PWA) avec icône | Site en ligne |
| P2 | Mesure d'audience sans cookie | Domaine |
| P2 | Export PDF du semainier | Semainiers |
| P2 | Fil Instagram automatique | Compte pro Instagram |

## Idées

| Idée | Remarque |
| --- | --- |
| Paiement des formules par Stripe | Hors v1 ; nécessite CGV et ventilation TVA |
| Replays des séances collectives | Consentement des participantes si enregistrement |
| Défis mensuels (« 4 semaines mobilité ») | Engagement, contenu réutilisable |
| Option B (suivi des mesures, messagerie) | Impose un hébergement HDS et une nouvelle analyse RGPD |
