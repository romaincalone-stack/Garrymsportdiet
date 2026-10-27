# APP_SPEC : spécification produit

Version 2026-10-27 · Statut : prototype en validation · Remplace le « Cahier des charges v2 » rédigé dans Claude Docs.

Structure inspirée des cinq plans de J. J. Garrett (*The Elements of User Experience*) : stratégie → périmètre → structure → ossature → surface.

## 1. Vision

Donner à chaque patiente de Manon un accompagnement qui continue entre les consultations : son programme, ses recettes, ses séances, sur son téléphone. Donner à Manon un outil simple pour tout publier et tout suivre, sans compétence technique.

**Indicateurs de réussite (à 6 mois, cibles à fixer avec Manon)** : nombre d'abonnées actives par formule ; taux de passage bilan → formule ; taux de renouvellement à l'échéance ; part des patientes actives chaque semaine.

## 2. Cibles

| Persona | Besoin principal | Formule |
| --- | --- | --- |
| **Visiteuse** venue d'Instagram ou de Google | Comprendre l'offre, réserver un bilan | Aucune |
| **Patiente en suivi simple** | Retrouver ses fiches conseils, reprendre rendez-vous | Suivi simple (50 €/consult.) |
| **Abonnée suivi** | Savoir quoi manger cette semaine, cuisiner varié, être suivie par Manon | F1 Nutrition + Recettes (65 €/mois, 60 ou 65 € à trancher) |
| **Abonnée complète** | Le suivi, plus bouger chez elle 10 à 30 min (cardio, renfo, étirements…) et 2 séances collectives par mois | F2 Nutrition + Recettes + Sport (90 €/mois) |
| **Ancienne patiente** | Garder l'élan une fois le suivi terminé : recettes, vidéos, séances collectives | F3 Recettes + Sport (40 €/mois) |
| **Manon (administratrice)** | Créer les comptes, publier, relire les repas notés et les semainiers proposés, voir qui expire | — |

Clientèle principale (vocaux de Manon, 2026-10-26) : des femmes, souvent mamans sans temps, en péri-ménopause ou ménopause, ou concernées par les mêmes problèmes de santé que Manon ; elles cherchent la santé, pas la performance. Conséquence : interface très simple, peu de choix par écran, séances courtes à la maison.

## 3. Périmètre v1

**Inclus** : site public ; espace patiente ; back-office ; notifications email ; contact WhatsApp en un clic.

**Exclus de la v1** : paiement en ligne (encaissement hors plateforme) ; prise de rendez-vous (Doctolib) ; application des stores (web installable) ; messagerie intégrée (le contact reste WhatsApp) ; synchronisation Doctolib (aucune API).

**Option B demandée par Manon le 2026-10-26** : le semainier partagé (repas notés par la patiente) et la rubrique Évolution (poids, tours, ressentis) sont des **données de santé** (RGPD, art. 9). Le prototype les montre ; la mise en ligne exige un hébergeur certifié HDS, une analyse d'impact (AIPD) et un consentement explicite (voir §8). Les programmes sportifs passent au second plan derrière les vidéos à la carte.

## 4. Parcours utilisateurs

1. **Découverte → bilan** : Instagram ou Google → site public → « Réserver mon bilan » → Doctolib.
2. **Bilan → compte** : après la consultation, Manon crée le compte (nom, email, formule, dates, programme) → la patiente reçoit une invitation → elle choisit son mot de passe → elle arrive sur son accueil.
3. **Usage quotidien** : onglet Aujourd'hui (cartes du jour, réponse de Manon, séance du jour, repas du jour) → la patiente note chaque repas : « fait comme prévu » en un geste, ou ce qu'elle a mangé, la quantité (moins, comme prévu, plus) et une remarque → Manon le voit dans « Suivi des repas » et valide ou donne un conseil → la patiente voit la réponse sous le repas.
3b. **Semainier proposé** : la patiente remplit la semaine suivante (repas par repas) et l'envoie → Manon valide chaque case ou écrit un conseil, plus un mot général → la patiente voit « Revu par Manon ».
3c. **Séance à la carte** : Training → « J'ai 20 minutes » ou une discipline ou une zone → vidéo → « C'est fait ».
3d. **Évolution** : la patiente ajoute une mesure (poids facultatif, tour de taille, tour de hanches, énergie, sommeil, digestion de 1 à 5) → courbes et historique ; Manon voit les mêmes courbes.
4. **Séance collective (F3)** : Séances → « Je viens » → rappel la veille et 1 h avant → lien visio. Si c'est complet : liste d'attente, promotion automatique quand une place se libère.
5. **Reprendre rendez-vous** : bouton Doctolib → Manon recopie la date dans le back-office → elle s'affiche dans l'espace de la patiente.
6. **Monter en gamme** : un contenu verrouillé reste visible, flouté, avec la formule qui le débloque et un bouton pour en parler à Manon. Manon change la formule ; l'accès change immédiatement.
7. **Fin d'abonnement** : J-7, email à la patiente et à Manon. À l'échéance sans renouvellement : accès réduit (hypothèse : documents en lecture seule pendant 3 mois).

## 5. Écrans

### Site public
La v4 ne contient que l'accueil. Dans le prototype (`prototype/index.html`), la vue « Site public » affiche ce site dans un cadre ; son bouton « Mon espace » ouvre la page de connexion de l'espace patiente. Une version en un seul fichier (`dist/garrym-prototype.html`) intègre le site et ses photos. Pour chaque vue, la ligne « Affichage » du bandeau montre la version **téléphone** (390 px, dans un cadre de téléphone sur un grand écran) ou **ordinateur** (1 280 px, réduite à la largeur sur un téléphone). Les pages secondaires (Manon, Formules, Thématiques, Journal, Cabinets) restent à refaire dans le style v4 ; en attendant, leurs liens mènent à la section correspondante de l'accueil.

| Écran | Contenu clé |
| --- | --- |
| Accueil (v4, `site/index.html`) | Page unique : héros WebGL (sans écran de chargement depuis le 2026-10-27) (corbeille de fruits 3D) avec titre et bouton Doctolib, manifeste révélé mot à mot, partage « L'assiette / Le terrain », thématiques en défilement horizontal, chapitre « Le bilan » (70 €, Doctolib), formules mensuel / à l'unité, repères chiffrés et cabinets, journal, pied de page avec appel final (détail : `BRAND_BRIEF.md`, Mises en page v4). L'accueil v3 n'est plus affiché ; il reste dans `prototype/archive/v3-2026-10-23.html` |
| Manon | Présentation, diplômes (diététique, coach sportive + n° de carte pro), approche |
| Formules | Bilan 70 €, suivi 50 €, formules F1/F2/F3, tableau comparatif généré depuis la matrice d'accès, séance individuelle |
| Thématiques | « Pour chaque femme » : péri-ménopause et ménopause, SMOP (ex-SOPK : « Trouver votre équilibre entre vos symptômes, votre assiette et le mouvement »), endométriose, mamans pressées, rééquilibrage |
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
| **Évolution** (toutes formules) | Trois chiffres clés, « Ajouter une mesure », choix de l'indicateur, courbe, ressentis (énergie, sommeil, digestion), historique, « Masquer le poids » |

Sous-pages : recettes, vidéos, semainier, proposer ma semaine, séances, profil (formule, notifications, WhatsApp, Doctolib).

**Sur ordinateur** (à partir de 1 024 px) : les onglets deviennent une barre latérale (logo, quatre rubriques, profil en bas) ; l'accueil passe en deux colonnes (cartes du jour sur toute la largeur, séance du jour, en cours et bibliothèque à gauche ; réponse de Manon, semaine et WhatsApp à droite) ; les listes de vidéos et de recettes passent en grille. Un contenu non inclus dans la formule reste visible, verrouillé, avec la formule qui le débloque.

### Back-office
Sur téléphone : barre d'onglets en bas (Accueil, Patientes, Suivi avec le nombre de repas et semainiers à traiter, Plus), panneau « Plus » en tuiles pour les autres rubriques, tableaux affichés en cartes. Tableau de bord (actives, revenu théorique, expirations sous 15 j, inscrites ; « À traiter » : repas à relire, semainiers proposés) · Suivi des repas (liste des patientes, repas à relire, semainier proposé, mesures ; fiche de suivi à trois onglets : semaine en cours en grille 7 × 4, semainier proposé avec un conseil par case, évolution avec courbes et réglage « Afficher le poids ») · Patientes (création, fiche, « Voir son espace ») · Programmes (modèles de semainier) · Recettes · Vidéos · Articles · Séances · Rendez-vous (saisie depuis Doctolib) · Paramètres (tarifs, matrice d'accès, liens).

## 6. Règles métier

| # | Règle |
| --- | --- |
| R1 | Un compte n'existe que s'il est créé par l'administratrice. Aucune inscription publique. |
| R2 | L'accès à chaque fonctionnalité dépend de la matrice formule × fonctionnalité (table `plan_features`). Modifier la matrice modifie l'accès immédiatement. |
| R3 | Matrice par défaut (2026-10-27) : Suivi = profil, documents, Doctolib, articles membres, évolution ; F1 Nutrition + Recettes = + semainier partagé, WhatsApp, visio 30 min/15 j, recettes complètes ; F2 Complète = F1 + vidéos, programme sportif, 2 séances collectives/mois, séance individuelle payante ; F3 Recettes + Sport = Suivi + recettes, vidéos, programme sportif, séances collectives (sans semainier, visio, WhatsApp). Un contenu verrouillé propose la formule la moins chère qui garde tout ce que la patiente a déjà. |
| R4 | Sans accès « recettes », la patiente voit les 3 recettes publiées les plus anciennes et toutes celles de son programme. |
| R5 | Une recette dont la date de publication est future est « programmée » et invisible pour les patientes jusqu'à cette date. |
| R6 | Séance collective : capacité par défaut 10. Au-delà : liste d'attente ordonnée. Une désinscription donne la place au premier en attente et lui envoie un email. |
| R7 | Un programme nutritionnel est un modèle par objectif, attribué à une ou plusieurs patientes. Il ne porte jamais un nom de pathologie. |
| R8 | La prochaine consultation est saisie à la main par Manon (copie de Doctolib). |
| R9 | Un compte suspendu ou archivé ne peut plus se connecter à l'espace. |
| R10 | Revenu mensuel théorique = somme des tarifs des formules F1-F3 des comptes actifs (hors consultations à l'unité). |
| R11 | Option B (demandée le 2026-10-26) : repas notés et mesures sont des données de santé. Aucune mise en ligne avant hébergeur HDS, AIPD et consentement explicite recueilli à la première ouverture de ces rubriques. Le reste de l'application n'en contient pas. |
| R12 | Un repas noté passe à l'état « à relire » pour Manon. Sa réponse (validation ou conseil) s'affiche sous le repas. Si la patiente modifie le repas, la réponse est retirée et le repas repasse « à relire ». |
| R13 | Une patiente F1+ peut proposer le semainier de la semaine suivante : brouillon, puis « En attente de Manon » à l'envoi, puis « Revu par Manon ». Une case laissée vide par Manon vaut validation. |
| R14 | Évolution : accessible à toutes les formules. Le poids est facultatif ; Manon peut le masquer pour une patiente (le champ et la courbe disparaissent, l'historique est conservé). La patiente peut aussi le masquer pour elle-même. Les ressentis se notent de 1 à 5. |
| R15 | Vidéos : filtres par durée maximale, discipline, zone et niveau ; « fait » enregistré par semaine. |

### Hypothèses à valider avec Manon
| # | Question | Hypothèse du prototype |
| --- | --- | --- |
| H3 | Durées du bilan et du suivi | 1 h et 45 min |
| H4 | Engagement minimum | 3 mois, puis mensuel |
| H5 | Consultation non prise | Reportée d'un mois maximum |
| H6 | Pause possible | 1 mois par an |
| H7 | Changement de formule | Montée immédiate, descente au mois suivant |
| H8 | Prix F1 Nutrition + Recettes | 65 € (Manon hésite entre 60 et 65 €) |
| H8b | Accès à la F3 Recettes + Sport (40 €) | Réservée aux patientes qui ont terminé un suivi (proposée à la fin du suivi, pas de bouton Doctolib sur le site) |
| H9 | Séance individuelle visio | 20 € au total |
| H10 | Séance individuelle | Réservée à la F2 |
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
| H22 | Nom de marque | « GM Sport et Nutrition », lu sur le logo |

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
- [ ] **Option B (données de santé)** : hébergeur certifié HDS (Code de la santé publique, L.1111-8) pour la base et les sauvegardes ; analyse d'impact (AIPD) ; consentement explicite et retirable (RGPD, art. 9) ; registre des traitements ; durée de conservation ; droit d'accès et d'effacement ; information claire sur qui voit quoi (Manon seule). Décision et responsabilité : Manon (responsable de traitement).
