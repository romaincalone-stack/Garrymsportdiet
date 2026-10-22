# APP_SPEC : spécification produit

Version 2026-10-22 · Statut : prototype en validation · Remplace le « Cahier des charges v2 » rédigé dans Claude Docs.

Structure inspirée des cinq plans de J. J. Garrett (*The Elements of User Experience*) : stratégie → périmètre → structure → ossature → surface.

## 1. Vision

Donner à chaque patiente de Manon un accompagnement qui continue entre les consultations : son programme, ses recettes, ses séances, sur son téléphone. Donner à Manon un outil simple pour tout publier et tout suivre, sans compétence technique.

**Indicateurs de réussite (à 6 mois, cibles à fixer avec Manon)** : nombre d'abonnées actives par formule ; taux de passage bilan → formule ; taux de renouvellement à l'échéance ; part des patientes actives chaque semaine.

## 2. Cibles

| Persona | Besoin principal | Formule |
| --- | --- | --- |
| **Visiteuse** venue d'Instagram ou de Google | Comprendre l'offre, réserver un bilan | Aucune |
| **Patiente en suivi simple** | Retrouver ses fiches conseils, reprendre rendez-vous | Suivi simple (50 €/consult.) |
| **Abonnée nutrition** | Savoir quoi manger cette semaine | F1 (60 €/mois) |
| **Abonnée recettes** | Cuisiner varié, adapté à son thème (SOPK, endométriose…) | F2 (70 €/mois) |
| **Abonnée sport** | Bouger chez elle avec un programme et des séances en visio | F3 (90 €/mois, hypothèse) |
| **Manon (administratrice)** | Créer les comptes, publier, voir qui expire | — |

## 3. Périmètre v1

**Inclus** : site public ; espace patiente ; back-office ; notifications email ; contact WhatsApp en un clic.

**Exclus de la v1** : paiement en ligne (encaissement hors plateforme) ; prise de rendez-vous (Doctolib) ; application des stores (web installable) ; messagerie intégrée et toute donnée de santé (option A) ; synchronisation Doctolib (aucune API).

## 4. Parcours utilisateurs

1. **Découverte → bilan** : Instagram ou Google → site public → « Réserver mon bilan » → Doctolib.
2. **Bilan → compte** : après la consultation, Manon crée le compte (nom, email, formule, dates, programme) → la patiente reçoit une invitation → elle choisit son mot de passe → elle arrive sur son accueil.
3. **Usage hebdomadaire** : accueil (prochaine consultation, menu du jour, prochaine séance) → semainier → recette → liste de courses ; vidéo → case « fait ».
4. **Séance collective (F3)** : Séances → « Je viens » → rappel la veille et 1 h avant → lien visio. Si c'est complet : liste d'attente, promotion automatique quand une place se libère.
5. **Reprendre rendez-vous** : bouton Doctolib → Manon recopie la date dans le back-office → elle s'affiche dans l'espace de la patiente.
6. **Monter en gamme** : un contenu verrouillé reste visible, flouté, avec le dossard qui le débloque et un bouton pour en parler à Manon. Manon change la formule ; l'accès change immédiatement.
7. **Fin d'abonnement** : J-7, email à la patiente et à Manon. À l'échéance sans renouvellement : accès réduit (hypothèse : documents en lecture seule pendant 3 mois).

## 5. Écrans

### Site public
| Écran | Contenu clé |
| --- | --- |
| Accueil | Carte photo plein cadre avec menu posé dessus et bascule Nutrition / Sport, ronds des thématiques, phrase d'approche révélée au défilement, chiffres clés réels, carrousel des accompagnements, aperçu « Une semaine » avec onglets des jours, formules (mensuel / à l'unité), portrait de Manon, cabinets, journal, mosaïque Instagram, appel final (détail : `BRAND_BRIEF.md`, Mises en page) |
| Manon | Présentation, diplômes (diététique, coach sportive + n° de carte pro), approche |
| Formules | Bilan 70 €, suivi 50 €, dossards F1/F2/F3, tableau comparatif généré depuis la matrice d'accès, séance individuelle |
| Thématiques | Endométriose, SOPK, ménopause, sportives, rééquilibrage |
| Journal | Articles publics ; articles « Membres » signalés |
| Cabinets | Hyères (lundi), La Garde (mar/mer/ven), cartes, formulaire de contact |
| Connexion | Email + mot de passe, pas d'inscription |

### Espace patiente
Accueil · Programme (semainier 7 j × 4 repas) · Recettes (filtres thème, repas, temps, régime, allergène, favoris ; fiche avec portions ajustables, étiquette nutritionnelle, liste de courses) · Sport (programme avec cases « fait » ; vidéos filtrables par thème, durée, niveau, matériel) · Séances (collectives, individuelle) · Documents · Articles · Profil (infos, formule, notifications). Sur mobile, barre d'onglets en bas : Accueil, Programme, Recettes, Sport, Plus.

### Back-office
Tableau de bord (actives, revenu théorique, expirations sous 15 j, inscrites) · Patientes (création, fiche, « Voir son espace ») · Programmes (modèles de semainier) · Recettes · Vidéos · Articles · Séances · Rendez-vous (saisie depuis Doctolib) · Paramètres (tarifs, matrice d'accès, liens).

## 6. Règles métier

| # | Règle |
| --- | --- |
| R1 | Un compte n'existe que s'il est créé par l'administratrice. Aucune inscription publique. |
| R2 | L'accès à chaque fonctionnalité dépend de la matrice formule × fonctionnalité (table `plan_features`). Modifier la matrice modifie l'accès immédiatement. |
| R3 | Matrice par défaut : Suivi = profil, documents, Doctolib, articles membres ; F1 = + semainier, WhatsApp, visio 30 min/15 j ; F2 = + recettes complètes ; F3 = + vidéos, programme sportif, séances collectives, séance individuelle payante. |
| R4 | Sans accès « recettes », la patiente voit les 3 recettes publiées les plus anciennes et toutes celles de son programme. |
| R5 | Une recette dont la date de publication est future est « programmée » et invisible pour les patientes jusqu'à cette date. |
| R6 | Séance collective : capacité par défaut 10. Au-delà : liste d'attente ordonnée. Une désinscription donne la place au premier en attente et lui envoie un email. |
| R7 | Un programme nutritionnel est un modèle par objectif, attribué à une ou plusieurs patientes. Il ne porte jamais un nom de pathologie. |
| R8 | La prochaine consultation est saisie à la main par Manon (copie de Doctolib). |
| R9 | Un compte suspendu ou archivé ne peut plus se connecter à l'espace. |
| R10 | Revenu mensuel théorique = somme des tarifs des formules F1-F3 des comptes actifs (hors consultations à l'unité). |
| R11 | Aucune donnée de santé n'est collectée (option A). |

### Hypothèses à valider avec Manon
| # | Question | Hypothèse du prototype |
| --- | --- | --- |
| H3 | Durées du bilan et du suivi | 1 h et 45 min |
| H4 | Engagement minimum | 3 mois, puis mensuel |
| H5 | Consultation non prise | Reportée d'un mois maximum |
| H6 | Pause possible | 1 mois par an |
| H7 | Changement de formule | Montée immédiate, descente au mois suivant |
| H8 | Prix F3 | 90 € (90 ou 100 €) |
| H9 | Séance individuelle visio | 20 € au total |
| H10 | Séance individuelle | Réservée à la F3 |
| H11 | Réservation séance individuelle | Nouveau motif Doctolib |
| H12 | Créneaux collectifs | 1er et 3e mardi à 19 h |
| H13 | Replay | Non |
| H14 | Plus de 10 abonnées F3 | Liste d'attente + créneau supplémentaire |
| H15 | Après la fin d'abonnement | Documents en lecture seule 3 mois |
| H16 | Délai de réponse WhatsApp | 48 h ouvrées |
| H17 | Contenus au lancement | 30 recettes, 15 vidéos |
| H18 | Vidéos par trimestre | 6 |

Réponses déjà obtenues : diplôme de coach sportive confirmé ; option A retenue.

## 7. Critères d'acceptation

| Fonction | Critère (vérifiable par oui / non) |
| --- | --- |
| Création de compte | Quand Manon valide le formulaire, la patiente apparaît dans la liste avec le statut « Active » et une invitation part à son email. |
| Matrice d'accès | Quand Manon décoche « Vidéos » pour F3, une patiente F3 voit l'onglet Sport verrouillé au rechargement. |
| Contenu verrouillé | Une patiente F1 voit 3 recettes ouvertes et les autres floutées, avec la formule qui les débloque. |
| Portions | Passer de 1 à 2 portions double chaque quantité chiffrée ; les ingrédients sans quantité restent inchangés. |
| Liste de courses | Deux recettes contenant le même ingrédient dans la même unité donnent une seule ligne additionnée. |
| Séance collective | À la 11e inscription sur 10 places, la patiente passe en liste d'attente ; si une inscrite se retire, la première en attente devient inscrite. |
| Recette programmée | Une recette datée de demain n'apparaît pas côté patiente aujourd'hui et apparaît demain. |
| Consultation | La date saisie par Manon s'affiche sur l'accueil de la patiente, avec le lieu. |
| Accessibilité | Navigation complète au clavier ; contraste AA ; animations coupées si `prefers-reduced-motion`. |
| Mobile | Aucune page ne défile horizontalement à 390 px ; barre d'onglets accessible au pouce. |
| Données | Aucune table ne contient de donnée de santé (revue de `DATA_DICTIONARY.md`). |

## 8. Contraintes légales

- [ ] Mentions légales (LCEN), politique de confidentialité, bandeau cookies si traceurs (préférer une mesure d'audience sans cookie).
- [ ] CGV des formules : durée, renouvellement, résiliation, droit de rétractation de 14 jours pour les contrats à distance.
- [ ] Diplôme et n° de carte professionnelle de coach sportive affichés (Code du sport, L.212-1 et suivants).
- [ ] Aucune allégation thérapeutique dans les contenus.
- [ ] Facturation : régimes de TVA différents entre actes de diététique et coaching ou contenus numériques, à valider avec le comptable.
- [ ] Musique libre de droits dans les vidéos.
