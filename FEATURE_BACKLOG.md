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
| 2026-10-22 | Aperçu en ligne privé | Page claude.ai lisible sur téléphone, régénérée par `tools/build-artifact.mjs` |
| 2026-10-22 | Accueil reconstruit sur les mises en page des références | Carte photo avec menu posé dessus et bascule Nutrition / Sport, phrase révélée au défilement, photos en éventail et chiffres, carrousel, « Une semaine » avec onglets des jours, tarifs mensuel / à l'unité, portrait ovale, cabinets en lignes, journal, mosaïque, pied de page chocolat |
| 2026-10-22 | Brief de marque v3 « Olivier et argile » | Calmlyss, Farm Minerals et Voldog capturés et mesurés ; Geist + Instrument Serif ; crème, olive, sauge, moka, argile ; prototype refait (carte d'accueil, rangée de ronds, chiffres clés, pilules à flèche, illustrations au trait, cartes tarif) |
| 2026-10-22 | Croissance au défilement et traînée de graines | Formes de « La méthode » qui poussent ; traînée derrière le curseur sur le site public (souris uniquement) |
| 2026-10-22 | Script de vérification | `npm run check` : parcours automatisé, erreurs JS, débordement mobile |
| 2026-10-23 | Analyse de cinq sites de référence avec REA | Terminal Industries, Lando Norris, Symphony of Vines, KÖM, Resn (`references/DESIGN_REFERENCES.md`) |
| 2026-10-23 | Site public v4 (accueil) | `site/index.html` : chargement chiffré, scène WebGL (three.js), défilement doux (Lenis), animations au défilement (GSAP ScrollTrigger), collage topographique, défilement horizontal épinglé, chapitre sépia, cartes à halo, curseur à libellé ; photos provisoires Wikimedia Commons |
| 2026-10-23 | Vérification du site v4 | `npm run check:site` : erreurs JS, WebGL actif, débordement à 390 px, captures ordinateur et mobile |
| 2026-10-23 | Palette v4.1 « Oliveraie et abricot » | Vert forêt, crème, abricot à la place du quasi-noir et du citron néon, jugés trop « tech » pour une diététicienne et coach sportive |
| 2026-10-23 | Corbeille de fruits 3D dans le héros | Abricot, citron, pomme, figue, olives et feuilles d'olivier modélisés en code (pas de modèle externe), même matière ondulante que l'ancienne sphère, apparition au chargement, souris, écartement au défilement |
| 2026-10-23 | Palette v5-B « Calanque et citron » | Brief fourni par Romain (`references/brief-couleurs-v5-citron.html`) appliqué au site, puis à l'espace patiente et au back-office ; citron en surligneur sur fond clair |
| 2026-10-23 | Fruits 3D réalistes | Matières physiques (velours, pores, cire, laque), textures peintes, éclairage d'ambiance, ombres portées ; physique : chute à l'arrivée, flottaison, poussée du pointeur, collisions, élan du défilement ; qualité réduite automatiquement si l'appareil rame |
| 2026-10-23 | Prototype unifié à trois vues | Bandeau Site public / Espace patiente / Back-office : le site v4 dans la vue publique, « Mon espace » → connexion → espace patiente ; `npm run check` couvre ce parcours |
| 2026-10-23 | Espace patiente et back-office harmonisés avec le site | Bandeaux calanque à lignes topographiques, titres en capitales avec mot serif, navigation mono numérotée, boutons et étiquettes mono, coins coupés, chiffres fins ; connexion avec l'en-tête du site ; vocabulaire « formule » au lieu de « dossard » |
| 2026-10-23 | Section « Au quotidien » retirée du site | Jugée inutile par Romain ; « Repères » passe en fond lagon pour garder l'équilibre du brief ; photos inutilisées supprimées |
| 2026-10-23 | Application animée comme le site, fonds fixes | Rideau des bandeaux, titres par mots masqués, entrées décalées et au défilement, compteurs, barres, curseur ; typographie alignée sur le site ; plus de mode sombre (ton sur ton corrigé) |
| 2026-10-23 | Lien partagé à trois espaces | Le lien du site affiche désormais le fichier unique (site, espace patiente, back-office) ; site intégré encodé sans balise en clair |
| 2026-10-23 | Brief fonctionnel en PDF | 8 pages : les trois espaces, ce que débloque chaque formule, automatismes, conformité, statut (prototype / à construire / à décider), questions pour Manon ; `npm run build:brief` |
| 2026-10-23 | Fichier HTML unique | `dist/garrym-prototype.html` : les trois vues et le site intégré (photos en data URI, environ 3 Mo), construit par `npm run build:standalone` et vérifié par `npm run check:standalone` |
| 2026-10-23 | Aperçu en ligne du site v4 | Page claude.ai privée distincte du prototype applicatif (`node tools/build-artifact.mjs site`) |
| 2026-10-26 | Direction artistique v6 « GM Sport et Nutrition » | Couleurs et polices tirées du logo de Manon (vert #18694B, tilleul #B2E388, nuit #12231B ; Poppins et Bellefair) sur le site et l'application ; logo dans la navigation, la connexion et le pied de page ; textes orientés vers la clientèle (femmes, mamans, péri-ménopause) |
| 2026-10-27 | Retours de Manon sur le site | Hyères retiré (La Garde seule) ; photo du « Terrain » en sport santé (pilates en groupe) ; texte : cardio, renfo, étirements et 2 séances collectives par mois ; « Pour chaque femme » ; SMOP (ex-SOPK) ; formules refondues : F1 Nutrition + Recettes 65 €, F2 Complète 90 €, F3 Recettes + Sport 40 € après le suivi |
| 2026-10-27 | Écran de chargement du site retiré | Le héros s'affiche directement |
| 2026-10-27 | Back-office adapté au téléphone | Barre d'onglets en bas avec « Plus », tableaux en cartes, semaine de suivi en deux colonnes |
| 2026-10-27 | Affichage Téléphone / Ordinateur dans le prototype | Pour chaque vue, choix de l'appareil sous le bandeau : version téléphone dans un cadre de téléphone sur PC, version PC réduite sur téléphone ; espace patiente doté d'une vraie mise en page ordinateur (barre latérale, accueil en deux colonnes, grilles) ; parcours ajouté à `npm run check` |
| 2026-10-26 | Site en dominante blanche (v6.1) | Blanc, vert du logo, vert clair, plus de quasi-noir ; héros clair avec le logo en grand ; capsule de navigation blanche ; mots d'accent surlignés de tilleul comme le bandeau du logo ; thématiques en vert clair, formules et pied de page en vert ; application patiente passée du quasi-noir au vert foncé |
| 2026-10-26 | Espace patiente refait en application mobile, rendu TSE | Thème sombre, quatre onglets (Aujourd'hui, Training, Nutrition, Évolution), cartes en éventail, recherche, disciplines, zones, vidéos par durée ; 4 vidéos ajoutées (périnée, Pilates, marche, yoga du soir) |
| 2026-10-26 | Semainier partagé | La patiente note chaque repas (« fait comme prévu » ou ce qu'elle a mangé, quantité, remarque) et propose sa semaine ; Manon valide ou conseille repas par repas (« Suivi des repas » dans le back-office) |
| 2026-10-26 | Rubrique Évolution | Mesures (poids facultatif, tours de taille et de hanches), ressentis de 1 à 5, courbes, historique ; poids masquable par Manon ou la patiente |

## En cours

| Priorité | Fonctionnalité | Prochaine action |
| --- | --- | --- |
| P0 | Avis de Romain puis de Manon sur la v6 (logo, application à la TSE) | Aperçu en ligne + captures |
| P0 | Décision option B (données de santé) | Manon : choix de l'hébergeur HDS, AIPD, texte de consentement ; sinon retirer repas notés et mesures |
| P0 | Validation du prototype par Manon | Rendez-vous de 45 min avec le prototype + tableau des hypothèses (APP_SPEC §6) |
| P0 | Nom de marque et logo | Confirmer « GM Sport et Nutrition », obtenir le logo en vectoriel (SVG ou PDF) et un favicon |

## À faire

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | Pages secondaires du site dans le style v4 (Manon, Formules, Thématiques, Journal, Cabinets, Connexion) | Validation de l'accueil v4 |
| P2 | Supprimer du prototype le code de l'ancien site v3 (non affiché, archivé) une fois les pages secondaires v4 faites | Pages secondaires v4 |
| P2 | Tableau des patientes : colonnes plus compactes sur écran de 1 280 px (la dernière colonne oblige à défiler) | — |
| P2 | Remplacer les fruits modélisés en code par des modèles 3D réalisés sur mesure (photogrammétrie de vrais fruits), si le budget le permet | Validation v4 |
| P1 | Version allégée de la scène WebGL pour téléphones d'entrée de gamme (image fixe si le rendu est lent) | Mesures sur vrais appareils |
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
| P0 | Tournage des vidéos (10 à 30 min, par discipline et par zone) et photos des vignettes : le rendu TSE repose sur ces images | Manon |
| P0 | Hébergeur HDS, AIPD, consentement explicite pour les rubriques Nutrition (repas notés) et Évolution | Décision option B |
| P1 | Notifications : « Manon vous a répondu », semainier revu | Emails |
| P1 | Page de consentement à la première ouverture de Nutrition et d'Évolution | Texte validé par Manon |
| P1 | Mot géant translucide qui passe sous une photo (réf. Farm Minerals) | Photos |
| P2 | Portrait détouré de Manon dans le site (réf. Lando Norris) | Shooting |
| P2 | Son d'ambiance optionnel, coupé par défaut (réf. Symphony of Vines) | Validation v4 |
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
| Messagerie intégrée | Toujours exclue : WhatsApp reste le canal ; impose aussi l'hébergement HDS |
