# APP_SPEC : spécification produit

Version 2026-10-30 · Statut : prototype en validation · Remplace le « Cahier des charges v2 » rédigé dans Claude Docs.

Structure inspirée des cinq plans de J. J. Garrett (*The Elements of User Experience*) : stratégie → périmètre → structure → ossature → surface.

## 1. Vision

Donner à chaque patiente de Manon un accompagnement qui continue entre les consultations : son programme, ses recettes, ses séances, sur son téléphone. Donner à Manon un outil simple pour tout publier et tout suivre, sans compétence technique.

**Indicateurs de réussite (à 6 mois, cibles à fixer avec Manon)** : nombre d'abonnées actives par formule ; taux de passage bilan → formule ; taux de renouvellement à l'échéance ; part des patientes actives chaque semaine.

## 2. Cibles

| Persona | Besoin principal | Formule |
| --- | --- | --- |
| **Visiteuse** venue d'Instagram ou de Google | Comprendre l'offre, réserver un bilan | Aucune |
| **Nouvelle patiente** | Découvrir l'application juste après le bilan | Mois offert après le bilan (accès gratuit 30 jours : semainier, recettes, évolution) |
| **Patiente à l'unité** | Retrouver ses fiches conseils, reprendre rendez-vous | Consultation de suivi à l'unité (50 €) |
| **Abonnée nutrition** | Être suivie chaque mois, savoir quoi manger, cuisiner varié | Offre Nutrition : bilan + 1 suivi par mois + suivi hebdomadaire du semainier + recettes (60 €/mois, engagement 3 mois : 180 € en une fois ou chaque mois) |
| **Abonnée complète** | Le même suivi, plus bouger chez elle 10 à 30 min et 2 séances collectives par mois | Offre All in (90 €/mois, engagement 3 mois : 270 € en une fois ou chaque mois) |
| **Ancienne patiente** | Garder l'élan une fois le suivi terminé : recettes et vidéos | Recettes + sport, après le suivi : 20 €/mois sans engagement, ou 90 € pour 6 mois (15 €/mois) en une fois ou chaque mois ; sans les séances en direct ; affichée sur le site (« Proposée à la fin de votre suivi ») et dans l'espace patiente |
| **Manon (administratrice)** | Créer les comptes, publier, relire les repas notés et les semainiers proposés, voir qui expire | — |

Objectif de l'application (réunion du 2026-10-30) : attirer des patientes, réduire les annulations (perte de chiffre d'affaires) et assurer leur récurrence (chiffre d'affaires mensuel). Deux parcours : **« marketing »** (l'outil digital motive l'achat ; le rendez-vous découle de l'offre) et **« besoin »** (une problématique motive le rendez-vous ; l'application est un plus qui fidélise).

Clientèle principale (vocaux de Manon, 2026-10-26) : des femmes, souvent mamans sans temps, en péri-ménopause ou ménopause, ou concernées par les mêmes problèmes de santé que Manon ; elles cherchent la santé, pas la performance. Conséquence : interface très simple, peu de choix par écran, séances courtes à la maison.

## 3. Périmètre v1

**Inclus** : site public ; espace patiente ; back-office ; notifications email ; contact WhatsApp en un clic.

**Exclus de la v1** : paiement en ligne (encaissement hors plateforme) ; prise de rendez-vous (Doctolib) ; application des stores (web installable) ; messagerie intégrée (le contact reste WhatsApp) ; synchronisation Doctolib (aucune API).

**Option B demandée par Manon le 2026-10-26** : le semainier partagé (repas notés par la patiente) et la rubrique Évolution (poids, tours, ressentis) sont des **données de santé** (RGPD, art. 9). Le prototype les montre ; la mise en ligne exige un hébergeur certifié HDS, une analyse d'impact (AIPD) et un consentement explicite (voir §8). Les programmes sportifs passent au second plan derrière les vidéos à la carte.

## 4. Parcours utilisateurs

1. **Découverte → bilan** : Instagram ou Google → site public → « Réserver le bilan » → Doctolib. Variante : « Tester mon alimentation » (10 questions de Manon, résultat indicatif, rien n'est envoyé) → « Réserver mon bilan » ou « Réserver mon appel découverte offert » selon la réponse à la question 10.
2. **Bilan → compte** : après la consultation, Manon crée le compte (nom, email, formule, dates, programme) → la patiente reçoit une invitation → elle choisit son mot de passe → elle arrive sur son accueil, avec un mois d'accès offert à l'application (bandeau « Mois offert : encore X jours »).
3. **Usage quotidien** : onglet Aujourd'hui (cartes du jour, réponse de Manon, séance du jour, repas du jour) → la patiente note chaque repas : « fait comme prévu » en un geste, ou ce qu'elle a mangé, la quantité (moins, comme prévu, plus) et une remarque → Manon le voit dans « Suivi des repas » et valide ou donne un conseil → la patiente voit la réponse sous le repas.
3b. **Semainier proposé** : la patiente remplit la semaine suivante (repas par repas) et l'envoie → Manon valide chaque case ou écrit un conseil, plus un mot général → la patiente voit « Revu par Manon ».
3c. **Séance à la carte** : Training → « J'ai 20 minutes » ou une discipline ou une zone → vidéo → « C'est fait ».
3d. **Évolution** : la patiente ajoute une mesure (poids facultatif, tour de taille, tour de hanches, énergie, sommeil, digestion de 1 à 5) → courbes et historique ; Manon voit les mêmes courbes.
4. **Séance collective (F3)** : Séances → « Je viens » → rappel la veille et 1 h avant → lien visio. Si c'est complet : liste d'attente, promotion automatique quand une place se libère.
5. **Reprendre rendez-vous** : bouton Doctolib → Manon recopie la date dans le back-office → elle s'affiche dans l'espace de la patiente.
6. **Monter en gamme** : un contenu verrouillé reste visible, flouté, avec l'offre qui le débloque et « Voir les offres ». Page « Mes offres » : Nutrition, All in, Recettes + sport (après le suivi), coaching individuel ; « Je suis intéressée » prévient Manon (« À traiter » du back-office), qui change l'offre ; l'accès change immédiatement. Paiement à définir (voir §8).
7. **Fin d'abonnement** : J-7, email à la patiente et à Manon. À l'échéance sans renouvellement : accès réduit (hypothèse : documents en lecture seule pendant 3 mois).

## 5. Écrans

### Site public
La v4 ne contient que l'accueil. Dans le prototype (`prototype/index.html`), la vue « Site public » affiche ce site dans un cadre ; son bouton « Mon espace » ouvre la page de connexion de l'espace patiente. Une version en un seul fichier (`dist/garrym-prototype.html`) intègre le site et ses photos. L'espace patiente et le back-office ont pour fond les lignes topographiques du site, en légère parallaxe (`BRAND_BRIEF.md`, « Fond Topographie »). Pour chaque vue, la ligne « Affichage » du bandeau montre la version **téléphone** (390 px, dans un cadre de téléphone sur un grand écran) ou **ordinateur** (1 280 px, réduite à la largeur sur un téléphone). Les pages secondaires (Manon, Formules, Thématiques, Journal, Cabinets) restent à refaire dans le style v4 ; en attendant, leurs liens mènent à la section correspondante de l'accueil.

| Écran | Contenu clé |
| --- | --- |
| Accueil (v4, `site/index.html`) | Page unique (réunion du 2026-10-30) : héros (logo, titre, deux photos en arches « Sur le terrain » et « Dans l'assiette » depuis le 2026-11-18) avec **trois boutons** à la place du paragraphe : « Réserver le bilan » (Doctolib), « Tester mon alimentation » (test), « La méthode Garry M » ; (01) **La méthode Garry M** : nutrition et sport, dans l'assiette et sur le terrain, Manon présente au quotidien, puis « L'assiette / Le terrain » et **Ce que comprend la méthode** (bilan nutritionnel, suivi nutritionnel mensuel, suivi hebdomadaire, recettes, coaching sportif) ; chapitre « Le bilan » ; (02) **Votre besoin** : santé féminine (SMOP, endométriose, péri-ménopause), mamans pressées, nutrition sportive, rééquilibrage ; (03) **Formules** : 4 tarifs (bilan 70 € avec un mois d'application offert, suivi 50 €, offre Nutrition 60 €/mois, offre All in 90 €/mois) ; (04) **Lexique** (8 termes expliqués simplement) ; (05) repères et cabinet ; (06) journal ; pied de page. Plus d'écran de chargement |
| **Mon assiette** (`site/assiette.html`, 2026-11-22) | Suivi des repas ouvert à toutes les visiteuses, sans compte. Ajouter un repas de trois façons : **photo** (les aliments et leurs grammes sont estimés, avec une fourchette ; les ingrédients probables mais invisibles, comme l'huile de cuisson, sont signalés ; la personne corrige les grammes, change un aliment mal reconnu ou en ajoute un oublié), **code-barres** (valeurs de l'étiquette via Open Food Facts ; caméra si le navigateur sait lire les codes-barres, sinon saisie des chiffres) ou **recherche** dans la table Ciqual de l'Anses (3 092 aliments). Journal du jour par repas (petit-déjeuner, déjeuner, collation, dîner), total en kcal avec la marge d'incertitude des aliments estimés en photo, protéines, glucides, lipides, fibres, répartition de l'énergie ; jours précédents ; calories masquables ; effacement des données. Liens : barre de navigation (« Mon assiette ») et pied de page du site. Bouton « Réserver le bilan » en bas de page |
| Formules (2026-11-04) | Un parcours en trois étapes plutôt que cinq cartes égales : **01 Pour commencer** : le bilan (70 €, une heure, premier plan, 1 mois d'application offert), mis en avant en tilleul avec « Réserver le bilan » ; **02 Ensuite, votre suivi** : Nutrition (60 €/mois) et All in (90 €/mois, en blanc, « La plus complète ») côte à côte, engagement 3 mois, ou 180 € et 270 € en une fois, « Vous choisissez votre suivi avec Manon à la fin du bilan » ; **03 À la carte** : consultation de suivi sans l'application (50 €, Doctolib) et Sport + recettes après le suivi (20 €/mois ou 90 € pour 6 mois). Puis la mention mutuelle |
| Test « Tester mon alimentation » | Les 10 questions de Manon (2026-11-04) : priorité santé, expériences passées, ressenti face aux repas, signaux du corps (choix multiples), sport, micronutrition, poids sur le quotidien, solution idéale, raison d'être guidée, disponibilité. Résultat : la priorité (Q1) et une phrase selon le vécu (Q2) ; « Ce que nous regarderions en premier » (Q3, jusqu'à deux signaux de Q4, Q5) ; la formule qui correspondrait (Q8 : Nutrition ou All in, à confirmer au bilan) ; « Merci pour votre confiance » et le bouton de fin selon Q10 (prête : bilan ; hésite : appel découverte offert de 15 min, puis bilan ; veut voir son résultat : les deux). Q6, Q7 et Q9 servent la réflexion, pas le résultat. Rappel « ne remplace pas un bilan ». Rien n'est enregistré ni envoyé |
| Manon | Présentation, diplômes (diététique, coach sportive + n° de carte pro), approche |
| Votre besoin | 4 profils ci-dessus, toujours « en complément de votre suivi médical » |
| Journal | Articles publics ; articles « Membres » signalés |
| Cabinet | La Garde (mar/mer/ven), visio, coaching à domicile, carte, formulaire de contact. Hyères retiré à la demande de Manon (2026-10-27) |
| Connexion | Email + mot de passe, pas d'inscription |

### Espace patiente (application mobile, rendu « TSE »)
Thème sombre fixe, pensé d'abord pour le téléphone (`BRAND_BRIEF.md`, v6). Barre d'onglets en bas, quatre rubriques :

| Rubrique | Contenu |
| --- | --- |
| **Aujourd'hui** | Salutation, cartes en éventail (séance, menu, évolution), avis « Manon vous a répondu », séance du jour, planificateur de la semaine (jour par jour, état de chaque repas), contenus en cours, bibliothèque (vidéos / recettes), bouton WhatsApp |
| **Training** (F3) | Pilule de recherche, durée (10, 20, 30 min), disciplines en ronds (Cardio doux, Renfo, Pilates, Mobilité, Yoga, Périnée), zones (Abdos-fessiers, Bas du corps, Haut du corps, Dos et posture, Full body), liste de vidéos (durée, intensité, « fait »), séances collectives, programme en second plan |
| **Nutrition** (F1+) | Semainier de la semaine proposé par Manon, repas à noter, réponses de Manon, « Proposer ma semaine », recettes (F2) avec portions et liste de courses |
| **Évolution** (toutes formules) | Trois chiffres clés, « Ajouter une mesure », choix de l'indicateur, courbe, ressentis (énergie, sommeil, digestion), **mon cycle** (facultatif), historique, « Masquer le poids » |

**v7-v8 (session du 2026-10-27 au 29, d'après l'espace web TSE ; fusionnée dans le dépôt le 2026-10-30)** : onglet « Mon espace » ; sous-onglets soulignés sous la barre (`SUBTABS` : Accueil, Mes programmes en cours, Mes playlists, Mes recettes favorites…) ; sur ordinateur, barre pleine largeur en haut (logo, rubriques, profil) ; **planner** semaine ou mois, jour par jour, avec Training et Nutrition, et « Ajouter » (recette, vidéo ou playlist à un jour) ; **programme en cours** (« À propos », « Les séances », semaines, progression, séances faites) ; **playlists** de vidéos ; **« Notre sélection pour vous »** : questionnaire de préférences sport (lieu, objectifs, niveau, fréquence, durée, matériel) ; **filtres de recettes** par étiquettes ; **factures** de la patiente dans son profil (à transmettre à sa mutuelle). Évolution : poids facultatif, énergie et sommeil notés de 0 à 10, symptômes digestifs à cocher (tours de taille et de hanches retirés, retour de Manon du 2026-10-28).

Sous-pages : recettes, vidéos, semainier, proposer ma semaine, séances, programme, playlists, **mes offres**, **lexique**, profil (formule, notifications, WhatsApp, Doctolib). Le semainier se remplit aussi sans modèle de Manon (« À compléter ») : la patiente note ce qu'elle a mangé, Manon répond.

**Sur ordinateur** (à partir de 1 024 px) : les onglets deviennent une barre latérale (logo, quatre rubriques, profil en bas) ; l'accueil passe en deux colonnes (cartes du jour sur toute la largeur, séance du jour, en cours et bibliothèque à gauche ; réponse de Manon, semaine et WhatsApp à droite) ; les listes de vidéos et de recettes passent en grille. Un contenu non inclus dans la formule reste visible, verrouillé, avec la formule qui le débloque.

### Back-office
**Factures** (v7) : création d'une facture ou d'un avoir (prestations : bilan, suivi, offres, séances individuelles), numéro continu sans trou (année, mois, compteur), mention de TVA (art. 293 B ou 261-4-1° du CGI), moyen de paiement, envoi dans l'espace de la patiente, impression ; une facture émise ne se modifie plus (annulation par avoir) ; coordonnées de facturation dans Paramètres. Sur téléphone : barre d'onglets en bas (Accueil, Patientes, Suivi avec le nombre de repas et semainiers à traiter, Plus), panneau « Plus » en tuiles pour les autres rubriques, tableaux affichés en cartes. **Évolutions** (2026-11-04) : liste de toutes les patientes actives (dernière mesure, poids, énergie et sommeil avec l'écart depuis la première mesure, digestion, jour du cycle, « À relancer » après 30 jours sans mesure), puis la page de chaque patiente (chiffres clés, symptômes digestifs les plus fréquents, courbes, historique, réglage du poids, cycle) ; aussi depuis sa fiche. Sur téléphone, cinquième onglet de la barre du bas. Tableau de bord (actives, revenu théorique, expirations sous 15 j, inscrites ; « À traiter » : repas à relire, semainiers proposés) · Suivi des repas (liste des patientes, repas à relire, semainier proposé, mesures ; fiche de suivi à trois onglets : semaine en cours en grille 7 × 4, semainier proposé avec un conseil par case, évolution avec courbes et réglage « Afficher le poids ») · Patientes (création, fiche, « Voir son espace ») · Programmes (modèles de semainier) · Recettes · Vidéos · Articles · Séances · Rendez-vous (saisie depuis Doctolib) · Paramètres (tarifs, matrice d'accès, liens).

## 6. Règles métier

| # | Règle |
| --- | --- |
| R1 | Un compte n'existe que s'il est créé par l'administratrice. Aucune inscription publique. |
| R2 | L'accès à chaque fonctionnalité dépend de la matrice formule × fonctionnalité (table `plan_features`). Modifier la matrice modifie l'accès immédiatement. |
| R3 | Matrice par défaut (2026-10-30) : À l'unité = profil, documents, Doctolib, articles membres, évolution ; Mois offert = + semainier partagé, recettes ; Nutrition = + suivi mensuel, WhatsApp ; All in = Nutrition + vidéos, programme sportif, 2 séances collectives/mois, coaching individuel payant ; Recettes + sport = À l'unité + recettes, vidéos, programme sportif (sans séances collectives depuis le 2026-11-04, ni semainier, suivi ou WhatsApp). Un contenu verrouillé propose l'offre payante la moins chère qui garde tout ce que la patiente a déjà. |
| R4 | Sans accès « recettes », la patiente voit les 3 recettes publiées les plus anciennes et toutes celles de son programme. |
| R5 | Une recette dont la date de publication est future est « programmée » et invisible pour les patientes jusqu'à cette date. |
| R6 | Séance collective : capacité par défaut 10. Au-delà : liste d'attente ordonnée. Une désinscription donne la place au premier en attente et lui envoie un email. |
| R7 | Un programme nutritionnel est un modèle par objectif, attribué à une ou plusieurs patientes. Il ne porte jamais un nom de pathologie. |
| R8 | La prochaine consultation est saisie à la main par Manon (copie de Doctolib). |
| R9 | Un compte suspendu ou archivé ne peut plus se connecter à l'espace. |
| R10 | Revenu mensuel théorique = somme des tarifs mensuels des comptes actifs (hors consultations à l'unité ; mois offert = 0 €). |
| R16 | Après le bilan, la patiente a 30 jours d'accès offert ; Manon voit la fin dans « À traiter » et propose une offre. |
| R17 | « Je suis intéressée » sur une offre crée une demande visible par Manon (« À traiter ») ; rien n'est payé dans l'application. |
| R18 | Le test du site est calculé dans le navigateur ; aucune réponse n'est enregistrée ni transmise. L'envoi du résultat par email demanderait un consentement et un outil d'emailing : non prévu. |
| R11 | Option B (demandée le 2026-10-26) : repas notés et mesures sont des données de santé. Aucune mise en ligne avant hébergeur HDS, AIPD et consentement explicite recueilli à la première ouverture de ces rubriques. Le reste de l'application n'en contient pas. |
| R12 | Un repas noté passe à l'état « à relire » pour Manon. Sa réponse (validation ou conseil) s'affiche sous le repas. Si la patiente modifie le repas, la réponse est retirée et le repas repasse « à relire ». |
| R13 | Une patiente F1+ peut proposer le semainier de la semaine suivante : brouillon, puis « En attente de Manon » à l'envoi, puis « Revu par Manon ». Une case laissée vide par Manon vaut validation. |
| R14 | Évolution : accessible à toutes les formules. Le poids est facultatif ; Manon peut le masquer pour une patiente (le champ et la courbe disparaissent, l'historique est conservé). La patiente peut aussi le masquer pour elle-même. Énergie et sommeil se notent de 0 à 10 ; les symptômes digestifs se cochent (aucun = tout va bien). |
| R21 | Mon assiette : les calories et nutriments viennent toujours d'une source de référence (table Ciqual 2020 de l'Anses ; étiquette du produit via Open Food Facts pour un code-barres). L'analyse photo ne fournit que l'identité des aliments, leur poids estimé et une fourchette ; son estimation de calories ne sert qu'en dernier recours, signalée « Estimation, hors table ». Un aliment estimé en photo reste « estimé » tant que la personne n'a pas confirmé ou corrigé ses grammes, et le total affiche la marge correspondante. Aucun objectif de calories, aucun conseil de régime. Le journal reste dans le navigateur (localStorage) ; la photo est envoyée au service d'analyse puis n'est pas conservée par le site. |
| R19 | Factures : numérotation continue sans trou ; une facture émise est figée, toute correction passe par un avoir ; conservation 10 ans. |
| R15 | Vidéos : filtres par durée maximale, discipline, zone et niveau ; « fait » enregistré par semaine. Sous chaque vidéo, Manon peut ajouter des consignes : un exercice par ligne, avec séries, répétitions ou durée, RPE (effort ressenti de 1 à 10) et repos. |
| R20 | Suivi du cycle (demande de Manon, 2026-11-04) : facultatif, activé par la patiente dans « Évolution » et arrêté quand elle veut. Par jour : règles (légères, moyennes, abondantes), signes d'ovulation, symptômes prémenstruels (seins sensibles, ballonnements, fringales, irritabilité, humeur basse, fatigue, maux de tête, crampes, sommeil perturbé). L'application affiche le jour du cycle, les dernières règles et la durée moyenne des cycles complets ; elle ne prédit ni les règles ni la période fertile et rappelle que ce suivi n'est pas une méthode de contraception. Manon voit le calendrier et un tableau par cycle (durée, jours de règles, jour d'ovulation noté, symptômes de la semaine précédant les règles) dans l'onglet « Cycle » du suivi. Données de santé : même régime que R11. |

### Hypothèses à valider avec Manon
| # | Question | Hypothèse du prototype |
| --- | --- | --- |
| H3 | Durées du bilan et du suivi | 1 h et 45 min |
| H4 | Engagement minimum | 3 mois, puis mensuel |
| H5 | Consultation non prise | Reportée d'un mois maximum |
| H6 | Pause possible | 1 mois par an |
| H7 | Changement de formule | Montée immédiate, descente au mois suivant |
| H8 | Prix des offres | Nutrition 60 €/mois, All in 90 €/mois (« prix à définir » dans le brief du 2026-10-30) |
| H8b | Engagement | **Décidé le 2026-11-04** : 3 mois sur Nutrition et All in, payables en une fois (180 €, 270 €) ou chaque mois ; Recettes + sport sans engagement (20 €/mois) ou 6 mois pour 90 €, en une fois ou chaque mois |
| H8c | Recettes + sport | **Décidé le 2026-11-04** : recettes et vidéos, sans les séances en direct (pour garder les 10 places aux clientes All in) ; affichée sur le site et dans l'espace patiente |
| H8d | Piste du brief : suivi à 50 € seul ou 60 € avec l'application, engagement 2 mois | Non retenue dans le prototype (l'offre Nutrition la couvre) ; à trancher |
| H8e | Contenu du mois offert | Semainier partagé, recettes, évolution (sans WhatsApp ni vidéos) |
| H9 | Séance individuelle visio | 20 € au total |
| H10 | Coaching individuel | Proposé à toutes dans « Mes offres », 20 € en visio, 35 € au cabinet ou à domicile |
| H11 | Réservation séance individuelle | Nouveau motif Doctolib |
| H12 | Créneaux collectifs | 1er et 3e mardi à 19 h |
| H13 | Replay | Non |
| H14 | Plus de 10 abonnées F3 | Liste d'attente + créneau supplémentaire |
| H15 | Après la fin d'abonnement | Documents en lecture seule 3 mois |
| H16 | Délai de réponse WhatsApp | 48 h ouvrées |
| H17 | Contenus au lancement | 30 recettes, 15 vidéos |
| H18 | Vidéos par trimestre | 6 |
| H19 | Évolution pour la formule Suivi simple | Oui (toutes formules) |
| H20 | Délai de réponse de Manon aux repas notés | 48 h ouvrées, comme WhatsApp |
| H21 | Poids affiché par défaut | Oui, masquable par Manon ou la patiente |
| H22 | Nom de marque | « GM Sport et Nutrition » (logo) et « méthode Garry M » (brief) : à harmoniser |
| H23 | Suivi du cycle : formules concernées | Toutes, comme « Évolution » ; Manon voit le cycle de toute patiente qui l'a activé |
| H24 | Suivi du cycle : prévoir les prochaines règles | Non : l'application décrit, elle ne prédit pas (risque d'usage comme contraception) |
| H25 | Appel découverte offert (15 min, téléphone) | Un motif gratuit à créer sur Doctolib par Manon ; en attendant, le bouton du test mène à sa page Doctolib (`DOCTOLIB_APPEL`) |
| H27 | Mon assiette et la méthode de Manon (« sans régime restrictif ») | Outil ouvert à toutes, centré sur l'équilibre ; calories affichées par défaut mais masquables. **À valider par Manon** : calories visibles par défaut ou non, place de l'outil sur le site |
| H28 | Coût et abus de l'analyse photo (gratuite pour toutes) | Modèle `claude-opus-5-5`, de l'ordre de quelques centimes par photo (à mesurer) ; requêtes du site seulement ; limite facultative de 20 analyses par jour et par adresse IP (espace KV `LIMITES`) |
| H29 | Précision de l'analyse photo | Première mesure le 2026-11-22 sur 12 repas pesés (Nutrition5k, `tools/eval-assiette/resultats-2026-11-22.md`) : écart médian de 29 % sur les calories avec un modèle de type Claude, 54 % avec Qwen2.5-VL-3B (gratuit, local), aucune réponse exploitable avec SmolVLM-500M. Aliments reconnus, mais quantités d'aliments denses sous-estimées. À confirmer sur 20 à 30 repas pesés par Manon, photographiés au téléphone, avant d'annoncer une précision |
| H26 | Questions du test reformulées | Q1 : « où vous situez-vous » et SMOP (nom utilisé sur le site) ; Q6 : « peuvent vous aider à mieux vivre certains symptômes, en complément de votre suivi médical » (règle « aucune allégation ») ; Q9 B : micronutrition retirée de la liste PNNS, ANSES, OMS ; Q10 C : « voir le résultat » au lieu de « recevoir un bilan » (rien n'est envoyé ; « bilan » désigne la consultation) |

Réponses déjà obtenues : diplôme de coach sportive confirmé ; option B demandée le 2026-10-26 (semainier partagé et évolution), qui remplace l'option A retenue au départ.

## 7. Critères d'acceptation

| Fonction | Critère (vérifiable par oui / non) |
| --- | --- |
| Création de compte | Quand Manon valide le formulaire, la patiente apparaît dans la liste avec le statut « Active » et une invitation part à son email. |
| Matrice d'accès | Quand Manon décoche « Vidéos » pour F2, une patiente F2 voit l'onglet Training verrouillé au rechargement. |
| Contenu verrouillé | Une patiente F1 voit 3 recettes ouvertes et les autres floutées, avec la formule qui les débloque. |
| Portions | Passer de 1 à 2 portions double chaque quantité chiffrée ; les ingrédients sans quantité restent inchangés. |
| Liste de courses | Deux recettes contenant le même ingrédient dans la même unité donnent une seule ligne additionnée. |
| Séance collective | À la 11e inscription sur 10 places, la patiente passe en liste d'attente ; si une inscrite se retire, la première en attente devient inscrite. |
| Recette programmée | Une recette datée de demain n'apparaît pas côté patiente aujourd'hui et apparaît demain. |
| Consultation | La date saisie par Manon s'affiche sur l'accueil de la patiente, avec le lieu. |
| Accessibilité | Navigation complète au clavier ; contraste AA ; animations coupées si `prefers-reduced-motion`. |
| Mobile | Aucune page ne défile horizontalement à 390 px ; barre d'onglets accessible au pouce. |
| Repas noté | Quand la patiente note « Salade de lentilles » au déjeuner, le repas apparaît « à relire » dans le suivi de Manon ; après sa validation, la patiente voit la réponse sous le repas. |
| Semainier proposé | Après l'envoi, la patiente voit « En attente de Manon » ; Manon voit le semainier dans « À traiter ». |
| Évolution | Une mesure ajoutée apparaît dans la courbe et l'historique ; quand Manon décoche « Afficher le poids », le poids disparaît de l'espace de la patiente. |
| Données | Les données de santé sont limitées aux tables marquées « Santé » de `DATA_DICTIONARY.md` et hébergées chez un hébergeur HDS. |

## 8. Contraintes légales

- [ ] Mentions légales (LCEN), politique de confidentialité, bandeau cookies si traceurs (préférer une mesure d'audience sans cookie).
- [ ] CGV des formules : durée, renouvellement, résiliation, droit de rétractation de 14 jours pour les contrats à distance.
- [ ] Diplôme et n° de carte professionnelle de coach sportive affichés (Code du sport, L.212-1 et suivants).
- [ ] Aucune allégation thérapeutique dans les contenus.
- [ ] Facturation : régimes de TVA différents entre actes de diététique et coaching ou contenus numériques, à valider avec le comptable.
- [ ] Musique libre de droits dans les vidéos.
- [ ] **Mon assiette** : la photo est transmise à Anthropic (Claude), aux États-Unis : contrat de sous-traitance (DPA) d'Anthropic, clauses contractuelles types, mention dans la politique de confidentialité ; durée de conservation des données par Anthropic à vérifier dans ses conditions au moment de l'ouverture. Attribution Open Food Facts (licence ODbL) et Anses (Licence Ouverte) affichées.
- [ ] **Paiement (à approfondir, brief du 2026-10-30)** : moyen (prélèvement SEPA, carte, acompte, virement, paiement au cabinet), moment dans le parcours pour chaque offre, CGV des abonnements avec engagement (durée, résiliation, rétractation), mandat SEPA si prélèvement.
- [ ] **Option B (données de santé)** : hébergeur certifié HDS (Code de la santé publique, L.1111-8) pour la base et les sauvegardes ; analyse d'impact (AIPD) ; consentement explicite et retirable (RGPD, art. 9) ; registre des traitements ; durée de conservation ; droit d'accès et d'effacement ; information claire sur qui voit quoi (Manon seule). Décision et responsabilité : Manon (responsable de traitement).

## 9. Planning (brief du 2026-10-30)

| Période | Étape |
| --- | --- |
| Novembre | Construction du site et de l'application, business model et business plan, stratégie réseaux sociaux |
| Décembre | Phase de test avec des patientes volontaires, tournage et création des contenus |
| Janvier 2027 | Mise en ligne officielle, campagne de communication digitale |

Le brief indique « novembre 2027 » et « décembre 2027 » avant « janvier 2027 » : lu comme novembre et décembre 2026 (à confirmer). Le calendrier impose de trancher vite l'hébergement des données de santé (option B), sinon le semainier partagé et l'évolution ne pourront pas ouvrir en janvier.
