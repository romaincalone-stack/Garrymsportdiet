# BRAND_BRIEF : identité

Version 3 · 2026-10-22 · Direction « Olivier et argile » · À valider par Manon.
Remplace la v2 « Pinède et citron vert », rejetée par Romain : palette déduite de codes hexadécimaux sans avoir vu les sites (voir `JOURNAL_ERREURS.md`, incident 10).

## Références observées

Sites choisis par Romain, **vus et mesurés** le 2026-10-22 dans un navigateur (captures, styles calculés). The Podcast Coach n'a pas pu être vu : adresse du site introuvable et Awwwards inaccessible depuis l'environnement de travail.

| Site | Ce qu'on voit | Mesures relevées |
| --- | --- | --- |
| [Calmlyss](https://www.awwwards.com/sites/calmlyss-health-wellness) (démo : calmlyss.webflow.io) | Photos chaudes en lumière dorée, tons beige et terre. Titre en grande linéale, seconde ligne en italique serif (« Where Stillness / *Becomes Strength* »). Rangée de portraits ronds, cadres ovales hauts pour l'équipe, mosaïque photo, chiffres clés avec un mot en italique, petites étiquettes « • SCHEDULE », boutons pilule avec flèche dans un rond, illustrations botaniques au trait, carte tarif mise en avant en brun foncé | Geist 400 (titres 82 et 56 px, interlettrage −0,64 px) + Instrument Serif italique. Fond blanc et crème `#F9F6F3`, texte chocolat `#301100`, secondaire `#6B584E`, moka `#866452` (boutons), argile `#C78460`, ocre `#96672A`. Rayons : pilules (1600 px), ronds, 16 px, ovales 250 px. GSAP + ScrollTrigger + SplitText, défilement doux Lenis |
| [Farm Minerals](https://www.awwwards.com/sites/farm-minerals) (farmminerals.com) | Produit en 3D éclairé de vert, typographie posée en bas de casse (« Fertilizer, Reinvented. »), mot géant translucide qui passe sous l'image (« Meet CropTab™ »), illustration de plante au trait, carte du monde à repères, grands chiffres (0,5 t, ≥ 5×), mains et agriculteurs en photo, transitions en mosaïque de carrés verts | Aeonik 400-500 (86 et 50 px, interlettrage serré). Crème `#F4EDE6`, sauge `#7C914C` (fonds de section), olive foncé `#404F1D` (texte, boutons), `#636F3D`, `#596A33`. Coins quasi droits (2 à 5 px), boutons pilule fins en capitales |
| [VOLDOG FOOD](https://www.awwwards.com/sites/voldog-food) (voldogfood.com) | Grande carte d'accueil aux coins très arrondis, nom géant en capitales larges sur photo à fond vert sauge, bol vu du dessus avec ingrédients détourés qui flottent, cartes « bénéfices » autour, bande courbe qui traverse la page, bascule chien / chat, fonds blancs et crème | Peridot PE (Adobe Fonts). Crème `#F4F1EB`, texte sarcelle `#204E4A`, accent `#E1E53F` réservé aux pilules et à la bande courbe |
| [The Podcast Coach](https://www.awwwards.com/sites/the-podcast-coach) | Non vu | Vert `#245333` d'après la fiche Awwwards |

**Ce qui revient** : fonds crème chauds, une couleur sombre terreuse (chocolat, olive), une couleur moyenne naturelle (moka, sauge), des titres en grande linéale fine et en bas de casse, une touche d'italique serif, beaucoup d'air, des boutons pilule, des photos en lumière naturelle et des illustrations au trait.

**Traduit pour Manon** : l'olivier et la terre cuite du Var. L'olive et la sauge de Farm Minerals, le moka et l'argile de Calmlyss, sur un crème chaud.

## Nom et promesse

- **Nom de marque** : Garrym · Sport Diet (repris de `@garrymsportdiet`, **à confirmer**). La personne : Manon Garrione.
- **Promesse** : « Manger, bouger, *à votre rythme.* »
- **Positionnement** : diététicienne-nutritionniste et coach sportive sur la côte varoise, spécialisée en santé féminine (endométriose, SOPK, ménopause) et en nutrition du sport.

## Ton

Apaisant et chaleureux (Calmlyss), crédible et concret (Farm Minerals : expliquer simplement, chiffres réels).

| On dit | On évite |
| --- | --- |
| « Vous », phrases courtes, verbes d'action | Jargon médical, injonctions (« il faut ») |
| « Adapté à », « en complément de votre suivi médical » | « Soigne », « guérit », « détox », « brûle-graisse » |
| Des chiffres vrais (70 €, 2 cabinets, 30 min, 10 places) | Statistiques inventées (« 93 % se sentent mieux ») |
| Expliquer le pourquoi (fibres, protéines, récupération) | Régime, privation, avant/après |

## Logo

Marque provisoire : un **cercle au trait argile** (le soleil, l'assiette) et une **feuille d'olivier pleine** vert olive. Mot-symbole « GARRYM » en Geist 600, sous-titre « SPORT · DIET » en Geist Mono. À faire dessiner (vectoriel, favicon, version monochrome) avant le lancement.

## Couleurs

| Token | Clair | Sombre | Origine | Usage |
| --- | --- | --- | --- | --- |
| `--paper` | `#F6F1EA` | `#17140F` | Farm Minerals / Calmlyss | Fond de page, crème chaud |
| `--paper-2` | `#EFE7DC` | `#1F1B14` | | Sections alternées |
| `--card` | `#FFFFFF` | `#26211A` | Calmlyss | Cartes |
| `--ink` | `#301100` | `#F4EDE6` | Calmlyss | Texte, chocolat (jamais noir pur) |
| `--ink-2` | `#6B584E` | `#C2B3A6` | Calmlyss | Texte secondaire |
| `--olive` | `#404F1D` | `#B9C98A` | Farm Minerals | Couleur de marque : boutons principaux, carte d'accueil, formule 03, pied de page |
| `--sauge` | `#7C914C` | `#A3B57A` | Farm Minerals | Bande défilante, validations, illustrations |
| `--moka` | `#866452` | `#C9A792` | Calmlyss | Mots en italique, étiquettes, boutons secondaires |
| `--argile` | `#C78460` | `#E0A27F` | Calmlyss | Illustrations au trait, numéros des formules, focus clavier |
| `--sable` | `#E9DCC9` | `#4A3F31` | | Bouton sur fond olive, cartes douces, anneau de progression |
| `--rose` | `#F1DDD3` | `#4A2F28` | | Fond doux, thème endométriose |
| `--brume` | `#E4E8DA` | `#262B1E` | | Fond doux, formule F1 |

Répartition : 70 % crème et blanc, 20 % olive et sauge, 10 % moka et argile. Contrastes vérifiés : crème `#F4EDE6` sur olive `#404F1D` ≈ 7,7:1 ; chocolat `#301100` sur crème `#F6F1EA` ≈ 15:1.

## Typographies

| Rôle | Police (Google Fonts, libre) | Réglages |
| --- | --- | --- |
| Titres et texte | **Geist** | Titres en graisse 400, bas de casse, interlettrage −0,035 em, 56 à 100 px ; texte 16,5 px, interlignage 1,55 |
| Accent | **Instrument Serif** italique | Seconde ligne d'un titre ou mot-clé (« *à votre rythme* », « *aujourd'hui* »), même taille que la ligne au-dessus |
| Données et étiquettes | **Geist Mono** | kcal, minutes, dates ; étiquettes en capitales espacées précédées d'un point |

Geist et Instrument Serif sont celles de Calmlyss. Aeonik (Farm Minerals) et Peridot PE (Voldog) sont payantes. En production : polices auto-hébergées (RGPD).

## Composants visuels

| Composant | Référence | Statut |
| --- | --- | --- |
| **Carte d'accueil** plein cadre aux coins très arrondis (36 px), photo plein cadre avec dégradé olive, titre blanc | Voldog, Calmlyss | Prototype (dégradé à la place de la photo) |
| **Rangée de ronds** à cheval sur la carte d'accueil, une thématique par rond | Calmlyss (portraits ronds) | Prototype |
| **Chiffres clés** séparés par des filets, avec un mot en italique, uniquement des chiffres vrais | Calmlyss, Farm Minerals | Prototype |
| **Boutons pilule** avec flèche dans un rond qui pivote au survol | Calmlyss | Prototype |
| **Étiquettes** « • FORMULES » en Geist Mono | Calmlyss | Prototype |
| **Illustrations au trait** argile, olive ou sauge : branche d'olivier, tranche d'agrume, algue, galet | Calmlyss, Farm Minerals | Prototype |
| **Cartes tarif** : blanches, la formule mise en avant en olive foncé, numéro en grand italique argile | Calmlyss | Prototype |
| **Bande défilante** sauge avec mots en italique | Voldog (bande) | Prototype |
| **Assiette racontée** : bol vu du dessus, ingrédients détourés autour avec leur rôle | Voldog, Farm Minerals | Backlog (photos nécessaires) |
| **Mot géant translucide** qui passe sous une photo | Farm Minerals | Backlog |
| **Cadres ovales hauts** pour les portraits (Manon, témoignages réels) | Calmlyss | Backlog (photos nécessaires) |
| **Mosaïque photo** cabinet, cuisine, sport | Calmlyss | Backlog (photos nécessaires) |

## Mouvement

Doux et lent, comme Calmlyss : titres qui apparaissent avec un léger flou, apparition au défilement, flottement de la branche d'olivier, flèches qui pivotent, transitions entre pages. En production : GSAP (gratuit) et défilement doux type Lenis, comme les références. Tout est coupé si `prefers-reduced-motion`.

## Photographie (indispensable)

Les quatre références reposent sur la photo. Sans photo, le site restera correct mais pas « ouah ». Commande à prévoir (une demi-journée de shooting) :
- Manon au cabinet, en pinède, sur le sentier côtier, lumière du matin ou du soir ;
- aliments bruts et plats vus du dessus sur fond crème, lin, terre cuite ;
- mains en action (couper, mélanger, s'étirer) ;
- les deux cabinets (Hyères, La Garde).

Retouche chaude et naturelle, sans filtre saturé. Pas de banque d'images « salle de sport néon ».

## À ne jamais faire

- Statistiques ou témoignages inventés.
- Noir pur, vert « bio » vif, dégradé violet-bleu, néons.
- Titres en capitales grasses partout : la force vient de la taille et de l'air, pas de la graisse.
- Plus d'une couleur vive par écran.
- Même ombre forte sur chaque carte.

## Mots-clés de référencement

diététicienne Hyères · diététicienne La Garde · diététicienne Toulon · nutritionniste Var · coach sportive Hyères · coaching sportif à domicile Hyères · alimentation endométriose · diététicienne SOPK · nutrition ménopause · rééquilibrage alimentaire · nutrition du sport · téléconsultation diététicienne · recettes santé féminine.
