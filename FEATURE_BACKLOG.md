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
| 2026-10-29 | v7-v8 de l'espace patiente d'après l'espace web TSE, factures, ressentis 0 à 10 | Faite par une autre session directement sur l'aperçu en ligne ; fusionnée dans le dépôt le 2026-10-30 (planner semaine/mois, programme en cours, playlists, sélection sport, filtres de recettes, barre du haut sur ordinateur, sous-onglets, factures et avoirs, symptômes digestifs) |
| 2026-10-28 | Mention mutuelle (retour de Manon) | « Pensez à votre mutuelle » sous les tarifs et dans le chapitre « Le bilan » ; faite directement sur l'aperçu en ligne, reportée dans le dépôt le 2026-10-30 |
| 2026-10-30 | Audit design et interactions (skills d'Emil Kowalski) | Survol réservé à la souris, retour à l'appui partout, champs 16 px, animations de navigation sous 300 ms, feuilles depuis le bas sur téléphone, barres translucides, bandeau du prototype repliable, back-office plus dense, test du site accessible au clavier ; rapport `references/audit-design-2026-10-30.md` |
| 2026-11-22 | Banc d'essai de l'analyse photo (IA gratuites) | `tools/eval-assiette/` : 12 repas pesés de Nutrition5k ; Qwen2.5-VL-3B et SmolVLM-500M (gratuits, sur processeur) contre une estimation de type Claude ; recherche Ciqual corrigée (cuit / cru, incident 38) ; résultats dans `tools/eval-assiette/resultats-2026-11-22.md` : IA gratuites locales écartées, écart médian de 29 % avec Claude, correction des grammes indispensable |
| 2026-11-22 | Mon assiette : suivi des repas en photo | Demande de Romain (alternative à MyFitnessPal, ouverte à toutes) : `site/assiette.html` (photo, code-barres Open Food Facts, recherche dans les 3 092 aliments de la table Ciqual 2020 de l'Anses, journal du jour, marge d'incertitude, calories masquables, données sur l'appareil seulement) ; fonction serveur `functions/api/analyse.js` (Claude, sortie structurée, repli en cas de refus, même origine, limite quotidienne facultative) ; tests `npm run check:assiette`. En mode démonstration tant que le site n'est pas en ligne avec sa clé |
| 2026-11-18 | Héros du site sans fruits 3D | Retour de Romain (« trop IA », logo peu lisible) : deux vraies photos en arches (« Sur le terrain », « Dans l'assiette »), logo agrandi, mise en page en grille qui tient sur un portable de 1 366 × 657 sans chevauchement ; three.js retiré (page plus légère sur téléphone) ; le test du site vérifie les photos et l'absence de chevauchement |
| 2026-11-04 | Formules du site en parcours | Retour de Romain (« ça rend pas qualitatif ») : cinq cartes égales dont une seule sur sa ligne remplacées par trois étapes (bilan mis en avant, deux suivis côte à côte, lignes à la carte) |
| 2026-11-04 | Évolutions, test en 10 questions, offres tranchées | Back-office : page « Évolutions » (toutes les patientes, puis le détail de chacune : chiffres clés, courbes, digestion, cycle), onglet en bas sur téléphone, bouton « Évolution » dans la fiche. Site : test avec les 10 questions de Manon (Q4 à choix multiples), résultat personnalisé et bouton de fin selon Q10 (bilan ou appel découverte offert). Offres : engagement 3 mois sur Nutrition et All in (en une fois ou chaque mois), Recettes + sport à 20 €/mois ou 90 € pour 6 mois, sans séances en direct, affichée sur le site |
| 2026-11-04 | Retours de Manon (4 novembre) | Site : « Votre besoin » lisible sur un ordinateur portable (cartes à la hauteur de l'écran, première carte visible avant le défilement), photo du bilan remplacée (bol de fruits au lieu d'une chapelle), « sans l'application » sur la consultation de suivi et « avec l'application » sur l'offre Nutrition. Espace patiente : **suivi du cycle** (règles, ovulation, symptômes prémenstruels) dans « Évolution », visible par Manon (onglet « Cycle » du suivi) ; **consignes sous les vidéos** (séries, répétitions, RPE, repos), saisies par Manon ; RPE ajouté au lexique. En attente : les 10 questions du test, le prix de l'offre sport, l'engagement |
| 2026-10-30 | Fond de l'espace patiente et du back-office | Quatre propositions comparées (Halo, Topographie, Photo, Uni) ; Romain a choisi **Topographie** : lignes du site en pleine page, lueur tilleul, parallaxe coupée si mouvement réduit ; sélecteur et autres variantes retirés |
| 2026-10-30 | Brief de réunion « Optimisation site / appli » | Accueil à trois boutons (bilan, test, méthode) ; « La méthode Garry M » et ce qu'elle comprend ; « Votre besoin » en 4 profils ; 4 tarifs (bilan avec un mois d'application offert, suivi, Nutrition, All in) ; lexique ; test « Tester mon alimentation » ; dans l'espace patiente : mois offert, « Mes offres » (dont Recettes + sport et coaching individuel), lexique, semainier remplissable sans modèle |
| 2026-10-27 | Retours de Manon sur le site | Hyères retiré (La Garde seule) ; photo du « Terrain » en sport santé (pilates en groupe) ; texte : cardio, renfo, étirements et 2 séances collectives par mois ; « Pour chaque femme » ; SMOP (ex-SOPK) ; formules refondues : F1 Nutrition + Recettes 65 €, F2 Complète 90 €, F3 Recettes + Sport 40 € après le suivi |
| 2026-10-27 | Écran de chargement du site retiré | Le héros s'affiche directement |
| 2026-10-27 | Back-office adapté au téléphone | Barre d'onglets en bas avec « Plus », tableaux en cartes, semaine de suivi en deux colonnes |
| 2026-10-27 | Affichage Téléphone / Ordinateur dans le prototype | Pour chaque vue, choix de l'appareil sous le bandeau : version téléphone dans un cadre de téléphone sur PC, version PC réduite sur téléphone ; espace patiente doté d'une vraie mise en page ordinateur (barre latérale, accueil en deux colonnes, grilles) ; parcours ajouté à `npm run check` |
| 2026-10-26 | Site en dominante blanche (v6.1) | Blanc, vert du logo, vert clair, plus de quasi-noir ; héros clair avec le logo en grand ; capsule de navigation blanche ; mots d'accent surlignés de tilleul comme le bandeau du logo ; thématiques en vert clair, formules et pied de page en vert ; application patiente passée du quasi-noir au vert foncé |
| 2026-10-26 | Espace patiente refait en application mobile, rendu TSE | Thème sombre, quatre onglets (Aujourd'hui, Training, Nutrition, Évolution), cartes en éventail, recherche, disciplines, zones, vidéos par durée ; 4 vidéos ajoutées (périnée, Pilates, marche, yoga du soir) |
| 2026-10-26 | Semainier partagé | La patiente note chaque repas (« fait comme prévu » ou ce qu'elle a mangé, quantité, remarque) et propose sa semaine ; Manon valide ou conseille repas par repas (« Suivi des repas » dans le back-office) |
| 2026-10-26 | Rubrique Évolution | Mesures (poids facultatif, tours de taille et de hanches), ressentis de 1 à 5, courbes, historique ; poids masquable par Manon ou la patiente |
| 2026-11-24 | Étape 1 développée : espace patiente et back-office réels (`espace/`) | Next.js 16 + PostgreSQL ; invitation par email (7 jours), mot de passe oublié, double authentification obligatoire de Manon (QR code, code à usage unique), sessions en cookie sécurisé, verrouillage après 5 échecs, journal des actions ; offres et matrice d'accès modifiables, `minPlan` ; recettes (aperçu de 3, portions, favoris, filtres, publication programmée), liste de courses additionnée, articles, fiches PDF, « Mes offres » ; back-office : À traiter, patientes (création, offre, rendez-vous, suspension), recettes, articles, fiches, réglages ; parcours testé (`npm run check:espace`) |
| 2026-11-24 | Audit juridique et textes légaux | Agent juridique permanent (`.claude/agents/juriste.md`) ; `legal/` : audit, mentions légales, confidentialité (site, espace), conditions d'utilisation, CGV, consentement de l'étape 2, registre, liste de contrôle ; dans l'espace : pages `/conditions`, `/mentions-legales`, `/confidentialite`, version et date d'acceptation enregistrées, suppressions automatiques aux durées annoncées |
| 2026-11-24 | Comparatif des hébergeurs HDS | `references/hebergement-hds-2026-11-24.md` : liste officielle de l'ANS, prix, offres gratuites (aucune conforme), 3 emails de devis prêts |

## En cours

| Priorité | Fonctionnalité | Prochaine action |
| --- | --- | --- |
| P0 | Échelonnage validé par Romain (2026-11-24) ; à présenter à Manon avec l'étape 1 | Romain |
| P0 | Vérification « Profession » (`APP_SPEC.md` §8, règle 10), en priorité l'engagement de 3 mois | Juriste en santé ou AFDN |
| P0 | Avis de Manon sur le prototype, dont « Mon assiette » (public ou non, calories affichées par défaut : H27) | Aperçu en ligne + captures |
| P0 | Tests sur vrais téléphones (iPhone, Android) : survol, appui, encoche, clavier | Romain |
| P0 | Nom de marque et logo vectoriel (SVG ou PDF), favicon | Manon |
| P0 | Calendrier : construction en novembre, test en décembre, mise en ligne en janvier 2027 | Confirmer les années du brief |

## À faire

### Étape 0 : site vitrine

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | Version de production du site : polices et bibliothèques hébergées sur le site, « Mon espace » masqué, photo de « Mon assiette » masquée sans clé | Contenus de Manon |
| P0 | Pages légales : mentions (titre, diplôme, RPPS ou ADELI, carte de coach), confidentialité, CGV | Manon, juriste |
| P0 | Nom de domaine, Cloudflare Pages, adresse email pro (redirection) | Manon |
| P0 | Shooting photo (Manon, cabinet, plats vus du dessus, mains, pinède) | Manon |
| P1 | Pages secondaires du site dans le style v4 (Manon, Formules, Thématiques, Journal, Cabinet) | Validation de l'accueil |
| P1 | Référencement local (Google Business Profile, balises, mots-clés du brief) | Site en ligne |
| P2 | Mesure d'audience sans cookie | Domaine |

### Étape 1 : comptes et espace « socle »

Code livré le 2026-11-24 (`espace/`, voir « Livré »). Reste pour la mise en ligne :

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | Envoyer les demandes de devis Clever Cloud et Scalingo (emails prêts dans `references/hebergement-hds-2026-11-24.md`), puis signer le contrat HDS | Accord de Romain sur l'expéditeur |
| P0 | Compléter les `[crochets]` des textes de `legal/` (adresse, RPPS ou ADELI, SIRET, médiateur, hébergeur), puis relecture par un avocat en droit de la santé ou l'AFDN (liste dans `legal/AUDIT.md`) | Manon, avocat |
| P0 | Confirmer l'adresse du cabinet affichée sur le site (« Les Jardins de la Closeraie, 137 rue des Oliviers ») : aucune source dans le dépôt | Manon |
| P0 | Corriger les constats « Bloquant » du site relevés dans `legal/AUDIT.md` (promesses de fonctions pas encore en ligne, prix TTC, photos de personnes, pages légales) | Étape 0 |
| P0 | Numéro ADELI ou RPPS, lien WhatsApp (`wa.me`) saisis dans Réglages | Manon |
| P0 | Déploiement (`espace/README.md`, « Mise en ligne »), compte Brevo et domaine d'envoi vérifié | Contrat HDS, domaine |
| P0 | Test avec 3 à 5 patientes volontaires pendant une semaine | Déploiement |
| P1 | Vraies recettes, articles et fiches de Manon à la place du contenu fictif | Manon |
| P1 | Limitation du nombre de tentatives de connexion par adresse IP (en plus du verrouillage par compte) | Déploiement |
| P2 | Web app installable : manifeste fait ; icônes aux bonnes tailles (logo vectoriel) et mode hors ligne | Logo SVG |
| P2 | Emails de notification (nouvelle recette, fin d'offre proche), sans donnée de santé | Brevo |

### Étape 2 : suivi nutritionnel (données de santé)

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | AIPD et texte de consentement | Manon |
| P0 | Page de consentement à la première ouverture de Nutrition et d'Évolution | Texte validé |
| P0 | Semainiers (modèles, attribution), repas notés et réponses, semainier proposé | Étape 1 |
| P0 | Évolution et cycle ; back-office « Suivi des repas » et « Évolutions » ; consultations de Manon tracées | Étape 1 |
| P0 | Procédure en cas de fuite, test de restauration des sauvegardes | Avant ouverture |
| P1 | Notifications : « Manon vous a répondu », semainier revu | Emails |
| P2 | Export PDF du semainier | Semainiers |

### Étape 3 : sport

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | Tournage des vidéos (10 à 30 min, par discipline et par zone) et vignettes | Manon |
| P1 | Bunny Stream : bibliothèque, filtres, consignes (séries, répétitions, RPE) | Vidéos |
| P1 | Programmes, playlists, planner, séances collectives (inscription, capacité, liste d'attente) | Bunny Stream |

### Étape 4 : paiement et factures

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | Moyen de paiement, CGV, TVA, forme de l'engagement validée (règle 10) | Manon, comptable, juriste |
| P1 | Stripe ou GoCardless ; factures et avoirs | Choix du moyen de paiement |

### Étape 5 : photo dans « Mon assiette »

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P0 | 20 à 30 repas pesés et photographiés par Manon, passés dans `tools/eval-assiette/` | Manon |
| P1 | Clé Anthropic au nom de Manon avec plafond de dépense, mention du transfert hors UE, ajustement des consignes sur un second lot | Résultats du banc d'essai |

### Design (sans étape fixe)

| Priorité | Fonctionnalité | Dépend de |
| --- | --- | --- |
| P1 | Glisser pour fermer les feuilles (ressorts, vitesse) | Étape 1 |
| P1 | Mot géant translucide qui passe sous une photo (réf. Farm Minerals) | Photos |
| P1 | Bascule « Nutrition / Sport » sur l'accueil (réf. Voldog) | Validation du site |
| P1 | Assiette qui se compose au défilement, ingrédients expliqués (réf. Farm Minerals, Voldog) | Photos ou illustrations |
| P2 | Portrait détouré de Manon dans le site (réf. Lando Norris) | Shooting |
| P2 | Son d'ambiance optionnel, coupé par défaut (réf. Symphony of Vines) | Validation du site |
| P2 | Balayage au doigt des recettes sur mobile (réf. Calmlyss) | Recettes |
| P2 | Fil Instagram automatique | Compte pro Instagram |
| P2 | Tableau des patientes : colonnes plus compactes sur écran de 1 280 px | — |
| P2 | Supprimer du prototype le code de l'ancien site v3 (non affiché, archivé) | Pages secondaires v4 |

## Idées

| Idée | Remarque |
| --- | --- |
| Replays des séances collectives | Consentement des participantes si enregistrement |
| Défis mensuels (« 4 semaines mobilité ») | Engagement, contenu réutilisable |
| Messagerie intégrée | Toujours exclue : WhatsApp reste le canal ; impose aussi l'hébergement HDS |
