# Audit juridique : site, Mon assiette, espace patiente, emails

Version du 2026-11-24 · Auteur : agent juriste du projet · Statut : **à faire relire par un avocat en droit de la santé et par l'AFDN**.

Ce document réduit le risque, il ne le supprime pas. Aucune mise en ligne ne peut être garantie « sans problème juridique ». Chaque règle est sourcée ; quand le texte officiel n'a pas pu être lu, la règle est marquée **à vérifier**.

**Limites de la vérification (2026-11-24)** : depuis la session cloud, legifrance.gouv.fr et economie.gouv.fr répondent 403, esante.gouv.fr renvoie une page anti-robots. Les articles de loi ont donc été vérifiés par des sources secondaires (commentaires d'avocats, réponses ministérielles, fiches de la CNIL ou de la DGCCRF quand elles étaient lisibles). Les numéros d'articles cités doivent être relus sur Légifrance avant intégration. Sources lues directement : cnil.fr (page « Qu'est-ce qu'une donnée de santé ? »), référentiel CNIL « cabinets médicaux et paramédicaux » (PDF), communiqué de la CJUE sur l'affaire C-21/23.

Légende : **Bloquant** = interdit, ou obligatoire et absent : ne pas ouvrir l'étape concernée sans correction. **À corriger** = risque réel. **Recommandé** = bonne pratique. Confiance : haute, moyenne, faible.

---

## Partie A. L'hébergement certifié HDS est-il obligatoire pour l'étape 1 ?

### La question

À l'étape 1, l'espace contient : nom, prénom, email, téléphone, offre souscrite auprès d'une diététicienne (dont « Consultation à l'unité » et « Mois offert après le bilan »), dates de l'offre, date et lieu du prochain rendez-vous (sans motif), recettes favorites, liste de courses, demandes d'offre, journal des actions. Faut-il un hébergeur certifié HDS ?

### Réponse : oui, très probablement. Confiance : moyenne à haute (environ 75 %).

**1. Le texte qui impose l'HDS.** CSP, art. L.1111-8 : toute personne qui héberge des données de santé à caractère personnel recueillies à l'occasion d'activités de **prévention, de diagnostic, de soins** ou de suivi social et médico-social, **pour le compte** de la personne à l'origine de leur recueil (ici Manon) ou du patient, doit être certifiée (hébergement numérique) ou agréée (archivage). Le texte a été modifié par la loi SREN (loi n° 2024-449 du 21 mai 2024, art. 32) et précisé par le décret n° 2026-209 du 24 mars 2026 (stockage dans l'Union européenne ou l'EEE, contrat d'hébergement plus détaillé) : **à vérifier sur Légifrance**, date d'effet de l'obligation de localisation incluse.

Trois conditions, donc :
- **des données de santé** (définition du RGPD, voir point 2) ;
- **recueillies à l'occasion d'une activité de prévention ou de soins** : Manon est diététicienne, profession d'auxiliaire médical (CSP, 4e partie, livre III, titre VII, art. L.4371-1 et suivants) ; le conseil nutritionnel relève au moins de la prévention. Condition remplie ;
- **un hébergement pour le compte de Manon par un tiers** : la plateforme gérée (base PostgreSQL et application) est un tiers qui conserve les données pour elle. Condition remplie.

**2. Ces données sont-elles des données de santé ?**

- **RGPD, art. 4.15** : « données à caractère personnel relatives à la santé physique ou mentale d'une personne physique, **y compris la prestation de services de soins de santé**, qui révèlent des informations sur l'état de santé de cette personne ».
- **RGPD, considérant 35** : les données de santé comprennent « des informations sur la personne physique **collectées lors de l'inscription de cette personne en vue de bénéficier de services de soins de santé ou lors de la prestation de ces services** », ainsi qu'« un numéro, un symbole ou un élément spécifique attribué à une personne physique pour l'identifier de manière unique à des fins de santé ». C'est exactement l'étape 1 : Manon crée le compte après le bilan, pour la suite de la prise en charge.
- **CNIL** (« Qu'est-ce qu'une donnée de santé ? », cnil.fr) : trois catégories : par nature ; par croisement avec d'autres données ; **par destination**, c'est-à-dire du fait de l'utilisation qui en est faite au plan médical. Le simple fait d'être patiente d'une diététicienne, avec la date de ses consultations, relève au minimum de la dernière catégorie.
- **CJUE, 4 octobre 2024, Lindenapotheke, C-21/23** : le nom, l'adresse de livraison et les éléments d'identification de médicaments **non soumis à prescription**, commandés en ligne, sont des données concernant la santé, **même si le lien avec la santé du client n'est que probable** (point 90). La Cour retient une lecture large. Par analogie, nom + email + « suivie par une diététicienne, prochain rendez-vous le … » révèle une information sur la santé (au moins l'existence d'une prise en charge nutritionnelle). Voir aussi CJUE, 1er août 2022, OT, C-184/20 : une donnée qui révèle la santé **indirectement**, par une opération intellectuelle de déduction, est une donnée sensible.
- **Référentiel CNIL « gestion des cabinets médicaux et paramédicaux »** (2020, non contraignant) : il vise les paramédicaux libéraux ; il cite la **plateforme de prise de rendez-vous en ligne** parmi les prestataires qui doivent être hébergeurs certifiés lorsqu'ils conservent des données de patients à distance (§ 6).
- **Argument contraire** : Doctolib soutient publiquement que les seules données de rendez-vous ne sont pas des données de santé ; aucune décision officielle française ne tranche le cas précis « liste des clientes d'une diététicienne sans aucun motif ». C'est ce qui empêche une confiance haute.

**3. Conséquence.** L'étape 1, telle qu'elle est construite (comptes créés par Manon après le bilan, offre « Consultation à l'unité », rendez-vous, mention « Espace personnel des patientes de Manon Garrione, diététicienne-nutritionniste » dans `espace/app/layout.tsx`), doit être hébergée chez un hébergeur **certifié HDS**. La décision déjà prise dans `CLAUDE.md` et `APP_SPEC.md` §9 (plateforme gérée certifiée pour les 6 activités, comptes compris) est la bonne.

**Ce qui ferait baisser la confiance** : une position écrite de la CNIL, de l'Agence du numérique en santé ou du ministère indiquant que l'identité d'une personne et la date d'un rendez-vous avec un paramédical, sans motif, ne sont pas des données de santé ; une décision de justice dans ce sens. **Ce qui la ferait monter** : la lecture de la FAQ de l'ANS sur le champ de l'HDS (esante.gouv.fr, bloquée depuis la session) ou de la note ministérielle de 2019 sur le champ d'application, si elles visent les données administratives des patients.

### Les données de l'étape 2 qui l'imposent sans ambiguïté

Repas notés et réponses de Manon (`meal_logs`, `meal_reviews`), semainiers proposés et revus, **poids**, énergie, sommeil, **symptômes digestifs**, **suivi du cycle** (règles, signes d'ovulation, symptômes prémenstruels), réglage « masquer le poids ». Ce sont des données de santé par nature ou par destination (recueillies pour le suivi diététique et relues par une professionnelle de santé). Le référentiel CNIL cite d'ailleurs le « régime et comportement alimentaire » parmi les données de santé d'un dossier patient. Confiance : **haute**.

### Une variante de l'étape 1 pourrait-elle s'en passer ?

Variante envisageable : un **« club recettes et sport »** ouvert à toute personne (patiente ou non), sans aucune offre liée à une consultation, sans rendez-vous, sans « mois offert après le bilan », sans le mot « patiente » ni la qualité de diététicienne dans l'espace. Les données révéleraient alors l'achat d'un abonnement de recettes, pas une prise en charge.

Risque de cette variante : **moyen à élevé**, pour trois raisons.
1. Elle contredit la règle 3 de `CLAUDE.md` (comptes créés par Manon seule, après la consultation) : tant que Manon crée les comptes de ses patientes, la liste reste sa patientèle, donc une donnée de santé par destination (considérant 35).
2. Elle retire l'essentiel de la valeur de l'étape 1 (rendez-vous, mois offert, lien avec le suivi).
3. Héberger des données de santé sans certification est un délit (CSP, art. L.1115-1 : 3 ans d'emprisonnement et 45 000 € d'amende selon les sources consultées ; **à vérifier**), en plus des sanctions du RGPD.

Recommandation : **ne pas retenir la variante**. Le surcoût d'une plateforme gérée certifiée (40 à 120 €/mois selon `INTEGRATIONS.md`, confiance faible) est faible au regard du risque.

### Base légale RGPD de l'étape 1 (conséquence de la partie A)

Si ce sont des données de santé, il faut une exception de l'art. 9.2. La plus adaptée : **art. 9.2.h** (prise en charge sanitaire, sur la base d'un contrat conclu avec un professionnel de la santé tenu au secret, art. 9.3), combinée à l'**exécution du contrat** (art. 6.1.b). Le consentement n'est pas nécessaire à l'étape 1 ; la case à cocher d'activation doit porter sur l'acceptation des conditions d'utilisation, pas sur un « consentement aux données ». Confiance : moyenne ; **à faire valider par l'avocat**.

---

## Partie B. Synthèse des constats bloquants

| N° | Constat | Étape bloquée |
| --- | --- | --- |
| B1 | Pas de mentions légales, de politique de confidentialité ni de CGV sur le site (liens factices) | 0 |
| B2 | Titre de diététicienne sans numéro RPPS ; « Coach sportive diplômée » sans diplôme ni carte professionnelle | 0 |
| B3 | Le site promet des fonctions qui ne sont pas en ligne (semainier relu, évolution, vidéos, séances collectives, mois d'application offert) | 0 à 3 |
| B4 | « Tarifs indicatifs, en cours de validation » ; prix sans mention TTC ou TVA | 0 |
| B5 | Photos provisoires avec personnes identifiables (droit à l'image) | 0 |
| B6 | Adresse du cabinet affichée sans source documentée | 0 |
| B7 | Médiateur de la consommation absent (coaching, Recettes + sport, application) | 0 |
| B8 | Espace : case « J'accepte les conditions d'utilisation » sans conditions rédigées ni lien | 1 |
| B9 | Espace : pas de mentions légales ; page Confidentialité incomplète et en partie inexacte | 1 |
| B10 | Espace : hébergeur certifié HDS, contrats de sous-traitance (art. 28) et registre | 1 |
| B11 | Engagement de 3 mois sur des offres qui incluent des consultations : rédaction à valider (liberté d'arrêter les soins, clauses abusives) | affiché dès 0, vendu à 4 |
| B12 | CGV absentes : rétractation, renonciation, résiliation, reconduction | 0 (affichage), 4 (vente en ligne) |
| B13 | Mon assiette (photo) : transfert vers Anthropic aux États-Unis non annoncé, et « les photos ne sont pas conservées » inexact | 5 |
| B14 | Étape 2 : AIPD, consentement, hébergement HDS des données de santé | 2 |

---

## Partie C. Constats détaillés

### C.1 Site public (`site/index.html`)

**S1. Pages légales absentes. Bloquant.** Confiance haute.
- Fichier : `site/index.html`, pied de page (ligne 655 environ).
- Texte actuel : `<a href="#" data-toast="Page à rédiger avant la mise en ligne.">Mentions légales</a>` (idem Confidentialité, CGV).
- Correction : créer `site/mentions-legales.html`, `site/confidentialite.html`, `site/cgv.html` à partir de `legal/mentions-legales.md`, `legal/confidentialite-site.md`, `legal/cgv.md`, et remplacer les liens : `<a href="mentions-legales.html">Mentions légales</a><a href="confidentialite.html">Confidentialité</a><a href="cgv.html">CGV</a>`. Même chose dans `site/assiette.html`, qui n'a aucun lien légal.
- Sources : LCEN (loi n° 2004-575), art. 1-1 (ancien art. 6, III, renuméroté par la loi SREN de 2024 ; **à vérifier**) et art. 19 ; RGPD, art. 13 ; Code de la consommation, art. L.111-1 et L.221-5. https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164 ; https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679

**S2. Titre et enregistrement. Bloquant.** Confiance haute (principe), moyenne (forme exacte).
- Fichier : `site/index.html`, héros (ligne 536 environ) et pied de page (ligne 652 environ).
- Texte actuel : « Diététicienne-nutritionniste · Coach sportive diplômée · La Garde et visio ».
- Correction (pied de page) : `<span>Manon Garrione</span><span>Diététicienne-nutritionniste, RPPS [à compléter : numéro RPPS]</span><span>Coach sportive, [à compléter : intitulé exact du diplôme], carte professionnelle n° [à compléter]</span>`. Le héros peut garder la version courte si le pied de page et les mentions légales donnent le détail.
- Sources : CSP, art. L.4371-1 et suivants (titre de diététicien protégé, exercice subordonné au diplôme et à l'enregistrement) ; les diététiciens sont passés d'ADELI au **RPPS le 13 mars 2024** (Agence du numérique en santé, « Bascule des professionnels ADELI dans le RPPS ») : le numéro à afficher est donc, en principe, le RPPS ; Code du sport, art. L.212-1, L.212-11 et R.212-85 et suivants (diplôme, déclaration, carte professionnelle) ; LCEN, art. 19 (profession réglementée : titre, règles professionnelles). Affichage de la carte et du diplôme sur le lieu d'exercice : Code du sport, art. R.322-5 (**à vérifier**). https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072665 ; https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006071318

**S3. Fonctions promises mais pas en ligne. Bloquant à l'étape 0.** Confiance haute.
- Fichier : `site/index.html`.
- Textes actuels et corrections pour l'étape 0 (à rétablir étape par étape) :

| Où | Texte actuel | Texte proposé tant que l'étape correspondante n'est pas ouverte |
| --- | --- | --- |
| `PLANS.bilan.list` | « 1 mois d'accès offert à l'application » | à retirer à l'étape 0 ; à l'étape 1 : « 1 mois d'accès offert à l'espace en ligne (recettes, fiches conseils) » |
| `PLANS.suivis[0].list` | « Votre semainier relu chaque semaine », « Suivi de votre évolution » | jusqu'à l'étape 2 : « Votre semainier remis en consultation » ; retirer « Suivi de votre évolution » |
| `PLANS.suivis[1].list` | « Vidéos de 10 à 30 min… », « 2 séances collectives par mois en visio » | jusqu'à l'étape 3 : « Bientôt : vidéos et séances collectives » ou retirer l'offre All in de la vente |
| `#prestations` | « Suivi hebdomadaire · En ligne · Vous notez vos repas dans votre semainier ; Manon vous répond » | jusqu'à l'étape 2 : retirer la ligne ou écrire « Bientôt » |
| `#prestations` | « Coaching sportif · En ligne · … séance collective en visio deux fois par mois » | jusqu'à l'étape 3 : « Coaching sportif · Au cabinet, à domicile ou en visio · Des séances individuelles avec Manon » |
| `#univers` | « Des vidéos … 2 séances collectives par mois en visio » | idem |
| `#cabinets` (chiffres) | « 2 séances collectives par mois », « 10 places », « 1 mois d'application offert » | retirer jusqu'à l'ouverture correspondante |
| `#lexique` | « Semainier : Manon le prépare, vous notez… » ; « Suivi hebdomadaire : chaque semaine, Manon regarde votre semainier dans l'application » | jusqu'à l'étape 2 : « Semainier : le tableau de votre semaine, 7 jours et 4 repas, que Manon vous remet et que vous revoyez ensemble en consultation. » ; retirer « Suivi hebdomadaire » |
| Test, résultat | « Offre All in, 90 € / mois » | jusqu'à l'étape 3, ne proposer All in qu'avec la mention « vidéos et séances collectives à partir de [date] » |

- Source : Code de la consommation, art. L.121-2 (pratique commerciale trompeuse : allégation fausse ou de nature à induire en erreur sur les caractéristiques essentielles d'un service) ; `APP_SPEC.md` §9 (« ne promet que ce qui fonctionne »). https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565

**S4. Prix provisoires et mention de TVA. Bloquant.** Confiance haute (principe), moyenne (régime de TVA).
- Fichier : `site/index.html`, `#formules` (ligne 602 environ).
- Texte actuel : « Tarifs indicatifs, en cours de validation · Le coaching individuel est proposé ensuite dans votre espace ».
- Correction : « Prix en euros, toutes taxes comprises. [à compléter avec le comptable : « TVA non applicable, art. 293 B du CGI » si Manon est en franchise en base ; sinon prix TTC]. Les consultations de diététique sont exonérées de TVA (art. 261-4-1° du CGI). Coaching individuel : 20 € la séance en visio, 35 € au cabinet ou à domicile. Conditions générales de vente : [lien]. » Afficher aussi le prix du coaching sur le site, puisqu'il est vendu.
- Sources : Code de la consommation, art. L.112-1 (information sur les prix) et arrêté du 3 décembre 1987 (prix TTC) ; CGI, art. 261-4-1° et 293 B (**régime à valider par l'expert-comptable** : les offres mélangent diététique exonérée et contenus ou coaching qui ne le sont pas). https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069577

**S5. Photos provisoires. Bloquant à l'étape 0.** Confiance haute.
- Fichier : `site/img/*` (crédits dans `site/img/CREDITS.md`) ; pied de page : « Prototype · photos provisoires Wikimedia Commons (CC BY / BY-SA), crédits dans img/CREDITS.md ».
- Correction : remplacer toutes les photos par celles de Manon (avec autorisation écrite des personnes visibles) ou par des images sous licence commerciale sans personne identifiable ; supprimer la mention « Prototype ». Si une photo CC BY-SA est gardée, créditer l'auteur et la licence sur la page.
- Sources : Code civil, art. 9 (droit à l'image) ; Code de la propriété intellectuelle, art. L.121-1 et L.122-4 ; licences Creative Commons.

**S6. Adresse du cabinet. Bloquant tant qu'elle n'est pas confirmée.** Confiance haute.
- Fichier : `site/index.html`, `#cabinets` : « Les Jardins de la Closeraie, 137 rue des Oliviers, 83130 La Garde », plus un lien Google Maps.
- Constat : cette adresse est présente depuis le prototype v2 (2026-10-22), sans source dans la documentation, alors que la liste des inconnues de Romain porte « adresse du cabinet ». Si elle n'a pas été donnée par Manon, c'est un faux contenu présenté comme réel (règle 5 de `CLAUDE.md`).
- Correction : la faire confirmer par Manon ; à défaut, remplacer par `[à compléter : adresse du cabinet de La Garde]` et retirer le lien Maps.

**S7. Médiateur de la consommation. Bloquant.** Confiance moyenne à haute.
- Constat : aucun médiateur désigné. Les soins de santé sont exclus de la médiation de la consommation (Code de la consommation, art. L.611-4), mais le coaching sportif, l'offre Recettes + sport et la partie « application » des offres sont des services de consommation ordinaires.
- Correction : adhérer à un médiateur référencé par la Commission d'évaluation et de contrôle de la médiation (CECMC), puis indiquer son nom, son site et son adresse dans les mentions légales, les CGV et l'espace. `[à compléter : médiateur de la consommation]`.
- Sources : Code de la consommation, art. L.612-1 (droit au médiateur), L.616-1 (information obligatoire sur le site et les CGV), L.611-4 (exclusion des services de santé), L.641-1 (amende administrative) ; DGCCRF, fiche « La médiation de la consommation » (economie.gouv.fr, bloqué depuis la session : **à vérifier**).

**S8. Polices et bibliothèques chargées chez des tiers. À corriger (prévu).** Confiance moyenne.
- Fichiers : `site/index.html` lignes 9-11 (Google Fonts), 662-664 (cdnjs, jsDelivr) ; `site/assiette.html` lignes 9-11.
- Constat : chaque visite transmet l'adresse IP de la visiteuse à Google (États-Unis) et aux CDN, sans information. Un tribunal allemand (LG München, 20 janvier 2022, 3 O 17493/20) a condamné ce transfert pour Google Fonts.
- Correction : héberger polices et scripts sur le site (déjà prévu, `CLAUDE.md`, « Cible »). Supprimer les balises `preconnect`.
- Source : RGPD, art. 5.1.c, 6, 44 et suivants.

**S9. Santé féminine et pathologies nommées. À corriger.** Confiance moyenne.
- Fichier : `site/index.html`, carte « Santé féminine » (ligne 579 environ), question 1 du test, `QPRIO[0]`.
- Textes actuels : « SMOP · endométriose · péri-ménopause » ; Q1 : « Apaiser des douleurs ou des dérèglements hormonaux (endométriose, SMOP, syndrome prémenstruel…) ».
- Constat : « apaiser des douleurs » est une promesse d'effet sur une maladie. Le CSP ne permet à la diététicienne l'éducation et la rééducation nutritionnelles des patientes atteintes de troubles du métabolisme ou de l'alimentation que **sur prescription médicale** (art. L.4371-1, texte cité d'après l'INPI et les réponses ministérielles : **à vérifier**).
- Corrections :
  - Carte : « Mieux vivre au quotidien avec une endométriose, un SMOP ou la péri-ménopause : votre assiette et le mouvement, en lien avec votre médecin. »
  - Q1, réponse A : « Mieux vivre avec des douleurs ou un déséquilibre hormonal (endométriose, SMOP, syndrome prémenstruel…) ».
  - Ajouter une phrase sous la section « Votre besoin » : « Si vous avez une maladie diagnostiquée, Manon travaille en complément de votre médecin et peut vous demander une prescription ou un courrier de sa part. Elle ne pose pas de diagnostic et ne modifie pas un traitement. »

**S10. Test : « peu écoutée par le corps médical classique ». À corriger.** Confiance moyenne.
- Fichier : `site/index.html`, `QUIZ[1]` réponse B et `QPAST[1]`.
- Textes actuels : « Je me sens souvent démunie ou peu écoutée par le corps médical classique » ; « Vous serez écoutée : le bilan dure une heure et part de votre vécu. »
- Constat : l'expression oppose Manon à « la médecine classique » ; c'est le marqueur des pratiques présentées comme alternatives, que la règle « en complément de votre suivi médical » veut éviter. Risque d'image et risque de dénigrement.
- Correction : « J'ai besoin de plus de temps et d'écoute pour parler de mon alimentation » ; résultat inchangé (« Vous serez écoutée : le bilan dure une heure et part de votre vécu. »).

**S11. Mutuelle. Recommandé.** Confiance haute.
- Fichier : `site/index.html`, `#bilan`. Texte actuel : « Les consultations diététiques peuvent être remboursées par votre mutuelle. » Correction : « … peuvent être remboursées par votre mutuelle, selon votre contrat. » (comme dans `#formules`). Source : C. conso, art. L.121-2.

**S12. Lexique « SMOP ». Recommandé.** Confiance faible.
- Texte actuel : « Nouveau nom proposé pour le SOPK… ». Correction : citer la source scientifique du changement de nom (`[à compléter : publication ou société savante, date]`) ou écrire « SOPK (syndrome des ovaires polykystiques), aussi appelé SMOP depuis [date] ». Ne pas affirmer un nom officiel non sourcé (C. conso, art. L.121-2).

**S13. Test du site. Conforme.** Les réponses restent dans le navigateur et ne sont ni stockées ni envoyées : pas de traitement par Manon. À garder ainsi : aucune mesure d'audience ne doit enregistrer les réponses. Le rappel « Ce test est indicatif et ne remplace pas un bilan » est présent.

**S14. Bouton « Mon espace ». À corriger à l'étape 0.** Le masquer tant que l'espace n'est pas en ligne (déjà prévu, `APP_SPEC.md` §9).

### C.2 Mon assiette (`site/assiette.html`, `functions/api/analyse.js`)

**A1. Transfert de la photo vers Anthropic (États-Unis). Bloquant pour l'étape 5.** Confiance moyenne à haute.
- Fichier : `site/assiette.html`, ligne 330 environ : « Pour l'analyse, la photo est envoyée à un service d'intelligence artificielle (Claude, d'Anthropic). Ce site ne la conserve pas. Évitez d'y montrer des visages. » ; ligne 182 : « Vos repas restent sur cet appareil ; les photos ne sont pas conservées. »
- Constat : la seconde phrase est inexacte. D'après le centre d'aide d'Anthropic, les entrées et sorties de l'API sont supprimées **sous 30 jours**, sauf exceptions (accord de « zero data retention », contrôle des usages interdits, obligation légale) ; le DPA d'Anthropic intègre des clauses contractuelles types (modules 2 et 3). **À vérifier** au jour de l'ouverture.
- Corrections :
  - ligne 182 : « Vos repas restent sur cet appareil. Ce site ne conserve pas vos photos. »
  - ligne 330 : « Pour l'analyse, la photo et vos précisions sont envoyées à Anthropic (Claude), aux États-Unis, qui les supprime sous [à vérifier : 30 jours] et ne s'en sert pas pour entraîner ses modèles. Ce site ne les conserve pas. Ne montrez ni visage ni document, et n'écrivez ni votre nom ni d'information sur votre santé. [Lien : Confidentialité] »
  - Avant l'ouverture : accepter les conditions commerciales et le DPA d'Anthropic au nom de Manon ; demander si possible la conservation nulle ; inscrire le traitement au registre ; compléter `legal/confidentialite-site.md`.
- Sources : RGPD, art. 13, 28, 44 à 46 ; Anthropic, Commercial Terms et Data Processing Addendum (https://www.anthropic.com/legal/commercial-terms, https://www.anthropic.com/legal/data-processing-addendum).
- Remarque : la photo d'un repas envoyée sans identité, réduite par le navigateur (le passage par `canvas` retire les métadonnées EXIF, dont la position GPS), est peu identifiante. Le risque principal vient du champ libre « précisions » et des visages éventuels.

**A2. Adresse IP conservée pour la limite d'usage. Recommandé.** Confiance moyenne.
- Fichier : `functions/api/analyse.js`, bloc `env.LIMITES` : clé `date:IP` conservée 26 heures.
- Correction : remplacer l'IP par une empreinte (SHA-256 de l'IP et d'un sel secret changé chaque jour) ; l'annoncer dans la politique de confidentialité (intérêt légitime : éviter les abus, 26 heures).
- Source : RGPD, art. 5.1.c et 25.

**A3. Calories et troubles du comportement alimentaire. Recommandé fort (décision de Manon, H27).** Confiance moyenne.
- Fichier : `site/assiette.html`, réglage « Afficher les calories » coché par défaut (ligne 185).
- Correction proposée : calories masquées par défaut, avec à la première ouverture : « Cet outil sert à mieux connaître vos repas, pas à compter. Vous pouvez afficher les calories si vous le souhaitez. » ; garder la phrase « Si la nourriture devient une source d'inquiétude, parlez-en à un professionnel de santé » et y ajouter une ressource d'écoute : `[à compléter : ligne d'écoute TCA, à vérifier sur le site de la FFAB]`. Aucun objectif chiffré (déjà le cas).
- Source : `APP_SPEC.md` §8, « Profession » ; règle 10 de `CLAUDE.md`. Pas de texte impératif identifié : mesure de prudence.

**A4. Statut de l'outil. Recommandé.** Ajouter en bas de page : « Mon assiette est un outil de repères alimentaires. Ce n'est pas un dispositif médical : il ne pose aucun diagnostic et ne remplace pas un avis professionnel. » Source : règlement (UE) 2017/745, art. 2.1 (un logiciel sans finalité médicale n'est pas un dispositif médical). Confiance moyenne.

**A5. Open Food Facts. À corriger (information).** Le navigateur interroge directement `world.openfoodfacts.org` : Open Food Facts reçoit l'adresse IP et le code-barres. À annoncer dans la politique de confidentialité (fait dans `legal/confidentialite-site.md`). L'attribution ODbL est déjà affichée.

**A6. Ciqual. Conforme, à compléter.** L'attribution « table Ciqual 2020 de l'Anses » est affichée. Ajouter la date de version et le lien (Licence Ouverte Etalab : mention de la source et de la date de mise à jour). Le fichier vient d'une copie GitHub (`DATA_DICTIONARY.md`) : le régénérer depuis ciqual.anses.fr avant la mise en ligne.

**A7. Journal dans le navigateur. Conforme.** Le `localStorage` sert la fonction demandée par la personne (son journal) : exempté de consentement (loi Informatique et Libertés, art. 82 ; lignes directrices CNIL, délibération n° 2020-091, traceurs strictement nécessaires au service expressément demandé). Le bouton « Effacer » existe. À mentionner dans la politique de confidentialité.

### C.3 Espace patiente et back-office (`espace/`)

**E1. Conditions d'utilisation inexistantes. Bloquant.** Confiance haute.
- Fichier : `espace/components/password-form.tsx`.
- Texte actuel : case « J'accepte les conditions d'utilisation de mon espace », sans lien ni page.
- Correction : créer `espace/app/conditions/page.tsx` à partir de `legal/cgu-espace.md` (page publique) et remplacer le libellé : « J'ai lu et j'accepte les <a href="/conditions" target="_blank">conditions d'utilisation</a> de mon espace ». Le paragraphe au-dessus devient : « Votre espace contient vos recettes, fiches et contenus. Vos données servent à votre accompagnement par Manon, qui est tenue au secret professionnel. Elles ne sont ni vendues ni utilisées pour de la publicité. <a href="/confidentialite">Politique de confidentialité</a>. »
- Source : Code civil, art. 1119 (conditions générales opposables seulement si elles ont été portées à la connaissance de l'autre partie et acceptées).

**E2. Preuve de l'acceptation. À corriger.** Confiance moyenne.
- Fichier : `espace/app/actions/auth.ts` (activation : `audit(user.id, "activation", …)`).
- Constat : la base ne garde ni la date ni la version des conditions acceptées.
- Correction : enregistrer `cgu_version` et `cgu_accepted_at` (colonnes de `profiles` ou ligne d'`audit_log` qui ne s'efface pas après un an) ; conservation : 5 ans après la fin du compte (prescription civile, Code civil, art. 2224). Mettre à jour `DATA_DICTIONARY.md`.

**E3. Mentions légales absentes de l'espace. Bloquant.** Confiance haute.
- Correction : page publique `/mentions-legales` (texte : `legal/mentions-legales.md`, partie « Espace ») ; lien dans le composant `Legal` (`espace/components/patient.tsx`), sur la page de connexion et dans le back-office.
- Source : LCEN, art. 1-1 (à vérifier).

**E4. Page Confidentialité incomplète et en partie inexacte. Bloquant.** Confiance haute.
- Fichier : `espace/app/confidentialite/page.tsx`.
- Constats :
  - manquent : base légale, destinataires et sous-traitants (hébergeur, Brevo), absence de transfert hors UE, durées précises, cookie de session, droit de retirer un consentement (étape 2), droit de définir des directives après le décès, adresse de contact, délai de réponse ;
  - « Vos données ne sont ni vendues, ni utilisées pour de la publicité, **ni partagées** » : inexact (sous-traitants techniques) ;
  - « Aucune donnée médicale n'y est enregistrée » : vrai pour le contenu médical, mais trompeur si l'on conclut que rien n'est sensible (partie A).
- Correction : remplacer le texte par `legal/confidentialite-espace.md` (partie « Étape 1 »).
- Sources : RGPD, art. 9, 12 à 14 ; loi Informatique et Libertés, art. 84 (directives post mortem).

**E5. Contrats et registre. Bloquant.** Confiance haute.
- Avant toute ouverture : contrat d'hébergement HDS (CSP, art. L.1111-8 et R.1111-11) ; contrats de sous-traitance (RGPD, art. 28) avec l'hébergeur, Brevo, et la personne qui déploie et peut accéder à la base (développeur) ; registre (`legal/registre-traitements.md`, RGPD art. 30).
- Le développeur ne doit pas avoir accès aux données de production en dehors d'une intervention tracée et demandée par Manon ; engagement écrit de confidentialité.

**E6. « Mes offres » : prix sans mention fiscale ni lien vers les CGV. À corriger.** Confiance haute.
- Fichier : `espace/app/espace/offres/page.tsx`.
- Texte actuel : « Changer d'offre ou ajouter un service. Touchez « Je suis intéressée » : Manon vous recontacte pour en parler. Rien n'est payé ici. »
- Correction : ajouter sous la liste : « Prix toutes taxes comprises [ou : TVA non applicable, art. 293 B du CGI, à confirmer]. Rien n'est payé ici : Manon vous présente l'offre et ses conditions générales de vente avant tout engagement. <a href="/cgv">Conditions générales de vente</a>. »

**E7. Exercice des droits. Recommandé.**
- Fichier : `espace/app/espace/profil/page.tsx`, « Mes données ».
- Correction : « Pour corriger vos informations, obtenir une copie de vos données ou supprimer votre compte, écrivez à Manon : [à compléter : adresse email de contact]. Réponse sous un mois. » Plus tard : bouton « Télécharger mes données » (portabilité, RGPD art. 20).

**E8. Mot de passe. Recommandé.** Confiance moyenne.
- Fichier : `espace/lib/crypto.ts`, `passwordProblem` : 10 caractères, sans autre contrôle ; blocage 15 minutes après 5 échecs.
- Constat : la recommandation CNIL n° 2022-100 sur les mots de passe fixe des niveaux d'entropie selon les mesures complémentaires (blocage, double authentification). Le dispositif actuel est probablement suffisant pour les patientes grâce au blocage, mais à vérifier.
- Correction proposée : 12 caractères minimum, refus des mots de passe les plus courants (liste locale), maintien du blocage ; double authentification obligatoire pour Manon (déjà en place).

**E9. Thèmes de recettes portant un nom de maladie. À corriger.** Confiance moyenne.
- Fichiers : `prototype/index.html` (`THEMES`, `RECIPES`), repris par `espace/scripts/seed.mjs --demo` ; colonne `recipes.themes` (commentaire « Anti-inflammatoire » dans `001_etape1.sql`).
- Textes actuels : thèmes « Endométriose », « SMOP », « Ménopause », « Grossesse », « Anti-inflammatoire ».
- Constat : présenter une recette comme destinée à une maladie lui attribue un effet sur cette maladie ; c'est contraire à la règle « nom d'objectif, jamais de pathologie » (`CLAUDE.md`, R7) et proche d'une allégation thérapeutique (règlement (UE) n° 1169/2011, art. 7.3, et règlement (CE) n° 1924/2006, par analogie ; C. conso, art. L.121-2). En plus, des favoris concentrés sur « Endométriose » révèlent une pathologie (`DATA_DICTIONARY.md`).
- Correction : thèmes descriptifs, à valider par Manon : « Riche en oméga-3 », « Riche en fibres », « Riche en calcium », « Source de fer », « Végétarien », « Petit budget », « Sportif ». Si Manon veut un regroupement par période de vie : « Autour de la grossesse » plutôt que « Grossesse », jamais un nom de maladie.

**E10. WhatsApp. Recommandé.**
- Fichier : `espace/app/espace/page.tsx`. Texte actuel (bon) : « WhatsApp sert à la prise de contact : gardez les détails de santé pour la consultation. Urgence médicale : appelez le 15. »
- Ajouter dans la politique de confidentialité que WhatsApp est un service de Meta, que les échanges y sont chiffrés de bout en bout mais que Meta traite des métadonnées. Proposer « 15 ou 112 ».

**E11. Fin d'offre et reconduction. À corriger (étape 4).** Confiance moyenne.
- Fichier : `APP_SPEC.md` §4, point 7 : « J-7, email à la patiente et à Manon ».
- Constat : pour un contrat à durée déterminée avec reconduction tacite, la patiente doit être informée **au plus tôt trois mois et au plus tard un mois** avant la fin de la période. Un email à J-7 est trop tardif.
- Correction : email entre J-60 et J-30 pour toute offre à engagement qui continue d'elle-même (texte dans `legal/cgv.md`), en plus du rappel J-7.
- Source : Code de la consommation, art. L.215-1 (à vérifier).

**E12. Résiliation en ligne. À prévoir (étape 4).** Dès que les offres se souscrivent dans l'espace, une fonction « Résilier mon offre » accessible facilement est obligatoire. Source : Code de la consommation, art. L.215-1-1 (en vigueur depuis le 1er juin 2023) et D.215-1 à D.215-3 (décret n° 2023-417).

### C.4 Emails (`espace/lib/email.ts`)

**M1. Contenu des emails. Conforme, avec une réserve. Recommandé.** Confiance moyenne.
- Textes actuels : invitation « Manon vous a ouvert un espace personnel : recettes, fiches conseils et contenus de votre accompagnement… Manon Garrione, Diététicienne-nutritionniste » ; réinitialisation neutre.
- Constat : aucun motif, aucune mesure : bien. La signature révèle que la destinataire est suivie par une diététicienne et transite par Brevo (non HDS). Le passage est ponctuel, ce n'est pas un hébergement au sens de L.1111-8 (stockage temporaire accessoire), mais Brevo garde des journaux d'envoi.
- Corrections : signer « Manon Garrione, GM Sport et Nutrition » sans le titre (le titre figure dans l'espace et les mentions légales) ; signer le DPA de Brevo ; réduire au minimum la durée de conservation des journaux et des contenus dans Brevo (`[à vérifier dans les réglages Brevo]`) ; ne jamais ajouter de données de santé (déjà la règle).

**M2. Email d'invitation : lien vers les documents. Recommandé.** Ajouter : « Vos conditions d'utilisation et notre politique de confidentialité : [APP_URL]/conditions et [APP_URL]/confidentialite. »

### C.5 Offres, engagement, prix (site, espace, seed)

**O1. Engagement de 3 mois sur des offres qui incluent des consultations. Bloquant (rédaction à valider).** Confiance moyenne.
- Fichiers : `site/index.html` (`PLANS`, « Engagement 3 mois »), `espace/scripts/seed.mjs` (`commit: 3`), test (« engagement 3 mois · à confirmer ensemble au bilan »).
- Constat :
  1. La patiente garde le droit d'arrêter une prise en charge à tout moment : CSP, art. L.1111-4 (droit de refuser ou d'interrompre tout traitement) et L.1110-8 (libre choix du professionnel). Une clause qui l'oblige à payer des consultations qu'elle ne veut plus recevoir peut être jugée abusive (C. conso, art. L.212-1 : déséquilibre significatif) ou contraire à ces droits.
  2. Les offres mélangent un service de santé (consultations) et des services ordinaires (application, recettes, vidéos, séances collectives).
- Rédaction la plus sûre (détaillée dans `legal/cgv.md`, article 6) : **pas d'engagement sur les consultations**. Les consultations non réalisées ne sont jamais dues ; si la patiente a payé d'avance, elles lui sont remboursées. L'engagement, s'il est gardé, ne porte que sur la partie « espace en ligne et contenus », avec un prix ventilé, et une sortie anticipée sans frais pour motif légitime.
- Correction du site (étape 0) : remplacer « Engagement 3 mois » par « Pour 3 mois » et « ou 180 € en une fois pour les 3 mois » par « ou 180 € en une fois pour 3 mois » ; ajouter sous les offres : « Vous pouvez arrêter votre suivi à tout moment : les consultations non réalisées ne vous sont pas facturées. Détails dans les conditions générales de vente. » (si l'option 1 de `legal/cgv.md` est retenue).
- À faire valider par l'avocat et l'AFDN (point V3, partie D).

**O2. Droit de rétractation. Bloquant pour toute vente à distance.** Confiance moyenne.
- Constat : un contrat conclu à distance (visio, WhatsApp, email, puis paiement en ligne à l'étape 4) ouvre un droit de rétractation de 14 jours pour la partie non médicale. Un contrat conclu au cabinet ne l'ouvre pas. Les soins de santé sont exclus du régime des contrats à distance (C. conso, art. L.221-2, exclusion des « services de santé fournis par des professionnels de la santé aux patients pour évaluer, maintenir ou rétablir leur état de santé » ; **numérotation et version à vérifier**, une version modifiée est annoncée au 1er juillet 2026).
- Correction : CGV (`legal/cgv.md`, article 7) avec formulaire type ; recueil de la demande expresse de commencer pendant le délai (C. conso, art. L.221-25) ; information sur le montant dû en cas de rétractation.
- Sources : C. conso, art. L.221-5, L.221-18, L.221-25, L.221-28, R.221-1 (formulaire type).

**O3. Assurance responsabilité civile professionnelle. À corriger.** Confiance moyenne.
- Les professionnels de santé libéraux doivent être assurés (CSP, art. L.1142-2) ; l'exploitant d'activités physiques et sportives aussi (Code du sport, art. L.321-7). Indiquer l'assureur et la couverture dans les CGV (C. conso, art. R.111-2 : **à vérifier**). `[à compléter : assureur RCP, numéro de contrat, couverture géographique]`.

**O4. Télésoin. Recommandé.** Confiance faible.
- Les consultations en visio relèvent du télésoin (CSP, art. L.6316-2 ; décret n° 2021-707 du 3 juin 2021 : **à vérifier**). Utiliser un outil de visio conforme aux règles de sécurité (référentiels de l'ANS), recueillir l'accord de la patiente, l'écrire dans les CGV (fait).

### C.6 Profession, propriété intellectuelle, marque

**P1. Secret professionnel. Conforme dans la conception.** Seule Manon accède aux données, double authentification, journal des actions (CSP, art. L.1110-4). À compléter : engagement de confidentialité écrit de toute personne qui intervient sur la base (développeur, hébergeur : prévu par le contrat HDS).

**P2. Dossier patient hors plateforme. Conforme.** Le bilan et les notes restent dans l'outil de Manon. Le référentiel CNIL des cabinets paramédicaux recommande de conserver le dossier patient 20 ans après la dernière prise en charge (5 ans en base active, puis 15 ans archivés) ; à appliquer dans son propre outil, qui doit lui aussi être hébergé chez un hébergeur certifié s'il est en ligne.

**P3. Marque. Recommandé.** Vérifier sur la base de l'INPI que « GM Sport et Nutrition » et « méthode Garry M » ne sont pas déjà des marques déposées pour les classes 41 (sport, formation) et 44 (diététique), puis envisager un dépôt. `[à compléter : résultat de la recherche INPI]`.

**P4. Droits sur le site et l'application. Recommandé.** Écrire une cession de droits d'auteur du développeur à Manon (code, maquettes, textes), sinon Manon n'est que licenciée tacite. Source : CPI, art. L.131-3 (cession écrite, étendue, destination, lieu, durée).

**P5. Musique et vidéos (étape 3). À prévoir.** Musique libre de droits avec licence commerciale ; autorisation écrite des personnes filmées.

**P6. Aucun avis client, aucun avant-après. Conforme.** Si des avis sont ajoutés un jour : C. conso, art. L.111-7-2 (information sur le contrôle des avis).

---

## Partie D. À faire valider par un avocat en droit de la santé ou par l'AFDN

| N° | Question | Pourquoi |
| --- | --- | --- |
| V1 | Les données de l'étape 1 sont-elles des données de santé, et l'HDS est-il obligatoire ? (partie A) | Pas de position officielle sur le cas précis ; enjeu pénal (L.1115-1) |
| V2 | Base légale : art. 9.2.h pour l'étape 1 et pour le semainier inclus dans une offre payante ; consentement réservé aux rubriques facultatives (poids, cycle) ? | Un consentement exigé pour un service payé n'est pas libre (RGPD, art. 7.4) |
| V3 | Rédaction de l'engagement de 3 mois (`legal/cgv.md`, art. 6) | Liberté d'arrêter les soins (L.1111-4), clauses abusives (L.212-1) |
| V4 | Exclusion des soins de santé : de la rétractation (L.221-2) et de la médiation (L.611-4) ; traitement des offres mixtes | Numérotation et version en vigueur à confirmer ; ventilation des prix |
| V5 | Régime de TVA des offres mixtes ; mention à afficher | Diététique exonérée (261-4-1° CGI), coaching et contenus taxables ; franchise 293 B (expert-comptable) |
| V6 | Champ de compétence : formulations « Santé féminine », endométriose, SMOP, ménopause ; prescription médicale exigée quand une pathologie est diagnostiquée | CSP, art. L.4371-1 |
| V7 | Durées de conservation (`legal/registre-traitements.md`) et sort des données de l'étape 2 en fin de suivi (export vers le dossier patient puis suppression ?) | Pas de durée imposée par un texte pour un espace en ligne |
| V8 | AIPD de l'étape 2 et texte de consentement (`legal/consentement-sante.md`) | Données de santé, suivi régulier, cycle menstruel |
| V9 | Prudence TCA : calories visibles par défaut dans Mon assiette, poids dans Évolution | Déontologie (code de déontologie de l'AFDN) |
| V10 | Mentions de la carte professionnelle de coach et affichage en ligne | Code du sport, R.212-85 et R.322-5 |

---

## Partie E. Sources

Sources officielles (certaines non joignables depuis la session ; relire sur Légifrance) :
- Code de la santé publique : https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072665 (art. L.1110-4, L.1110-8, L.1111-4, L.1111-8, L.1115-1, L.1142-2, L.4371-1 et suivants, L.6316-2, R.1111-8-8 et suivants)
- Code de la consommation : https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565 (art. L.111-1, L.112-1, L.121-2, L.212-1, L.215-1, L.215-1-1, L.221-2, L.221-5, L.221-18, L.221-25, L.221-28, L.611-4, L.612-1, L.616-1, R.221-1)
- Code du sport : https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006071318 (art. L.212-1, L.212-11, L.321-7, R.212-85, R.322-5)
- Code général des impôts : https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069577 (art. 261-4-1°, 293 B)
- LCEN, loi n° 2004-575 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164 (art. 1-1, 1-2, 19, dans leur rédaction issue de la loi n° 2024-449 du 21 mai 2024)
- RGPD : https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679 (art. 4.15, 6, 7, 9, 12 à 14, 28, 30, 35, 44 à 46 ; considérant 35)
- CNIL, « Qu'est-ce qu'une donnée de santé ? » : https://www.cnil.fr/fr/quest-ce-ce-quune-donnee-de-sante (lu le 2026-11-24)
- CNIL, référentiel « gestion des cabinets médicaux et paramédicaux » (2020) : https://www.cnil.fr/fr/la-cnil-publie-trois-referentiels-pour-le-secteur-de-la-sante (PDF lu via https://www.conseil-national.medecin.fr/sites/default/files/cnil_referentiel_cabinets_med.pdf)
- CNIL, lignes directrices cookies et autres traceurs (délibération n° 2020-091) : https://www.cnil.fr/sites/cnil/files/atoms/files/lignes_directrices_de_la_cnil_sur_les_cookies_et_autres_traceurs.pdf
- CJUE, 4 octobre 2024, Lindenapotheke, C-21/23, communiqué n° 159/24 : https://curia.europa.eu/jcms/upload/docs/application/pdf/2024-10/cp240159en.pdf
- Agence du numérique en santé, bascule ADELI vers RPPS : https://esante.gouv.fr/securite/annuaire-sante/bascule-des-professionnels-adeli-dans-le-rpps (bloqué depuis la session ; date du 13 mars 2024 relevée dans les résultats de recherche)
- Agence du numérique en santé, hébergement des données de santé : https://esante.gouv.fr/labels-certifications/hebergement-des-donnees-de-sante (bloqué ; liste des hébergeurs certifiés à consulter par Romain)
- Ministère des sports, éducateurs sportifs : https://www.sports.gouv.fr/educateurs-sportifs
- Anthropic : https://www.anthropic.com/legal/commercial-terms ; https://www.anthropic.com/legal/data-processing-addendum

Sources secondaires utilisées pour pallier les blocages (à remplacer par le texte officiel) : Simonnet Avocat et Legalplace (renumérotation LCEN, art. 1-1) ; commentaires du décret n° 2026-209 (affairesjuridiques.aphp.fr, lexisveille.fr) ; INPI et réponses ministérielles (définition de L.4371-1) ; inc-conso.fr (résiliation en ligne) ; french-business-law.com (L.221-2, L.611-4).
