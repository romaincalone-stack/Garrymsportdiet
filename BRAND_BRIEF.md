# BRAND_BRIEF : identité

Version 2 · 2026-10-22 · Direction « Pinède et citron vert » · À valider par Manon.
Remplace la v1 « Papiers découpés de la Riviera » (palette cobalt / citron).

## Références retenues

Choisies par Romain. Fiches lues via la recherche web, Awwwards n'étant pas joignable depuis l'environnement de travail (voir `JOURNAL_ERREURS.md`, incident 8). Les polices de ces sites ne sont pas connues : rien n'est repris d'elles.

| Site | Studio · distinction | Ce qu'on retient |
| --- | --- | --- |
| [Calmlyss · Health & Wellness](https://www.awwwards.com/sites/calmlyss-health-wellness) | Ink Studio · nominé, sept. 2026 | Sérénité : palette douce, beaucoup de blanc, défilement continu, gestes au doigt sur mobile. Cible proche (coachs bien-être). |
| [Farm Minerals](https://www.awwwards.com/sites/farm-minerals) | ADELT · Site du jour, 19 févr. 2026 | Rendre une science crédible et simple : produit raconté au défilement, animation de croissance d'une plante, données visualisées. Volonté explicite d'éviter les clichés « vert agricole ». Vif et coloré. |
| [VOLDOG FOOD](https://www.awwwards.com/sites/voldog-food) | CHP Design Studio · mention, juin 2026 | Nutrition joyeuse et animée. Palette **#204E4A** (sarcelle profond) + **#E1E53F** (citron vert). Bascule de mode, traînée derrière le curseur, ingrédients racontés un par un. |
| [The Podcast Coach](https://www.awwwards.com/sites/the-podcast-coach) | Styles Studio · mention, févr. 2026 | Coaching haut de gamme et sobre. Vert profond **#245333** dominant, mise en page éditoriale. |

**Synthèse** : un vert profond qui inspire confiance (Podcast Coach, Voldog), un citron vert qui donne l'énergie (Voldog), la respiration d'un site bien-être (Calmlyss), et des moments vifs et animés qui expliquent sans jargon (Farm Minerals). Traduit pour Manon : la pinède varoise, le citron vert, l'air de la mer.

## Nom et promesse

- **Nom de marque** : Garrym · Sport Diet (repris de `@garrymsportdiet`, **à confirmer**). La personne : Manon Garrione.
- **Promesse** : « Manger, bouger, à votre rythme. »
- **Positionnement** : diététicienne-nutritionniste et coach sportive sur la côte varoise, spécialisée en santé féminine (endométriose, SOPK, ménopause) et en nutrition du sport.

## Ton

Haut de gamme et chaleureux (Podcast Coach), apaisant (Calmlyss), avec des touches de jeu (Voldog).

| On dit | On évite |
| --- | --- |
| « Vous », phrases courtes, verbes d'action | Jargon médical, injonctions (« il faut ») |
| « Adapté à », « en complément de votre suivi médical » | « Soigne », « guérit », « détox », « brûle-graisse » |
| Des chiffres concrets (70 €, 30 min, 10 places) | Superlatifs vides, « révolutionnaire » |
| Expliquer simplement le pourquoi (les fibres, les protéines) | Régime, privation, avant/après |

## Logo

Marque provisoire : un **disque citron vert** (le soleil, l'assiette, le cadran du chronomètre) traversé par une **aiguille de pin** stylisée en vert profond. Mot-symbole « GARRYM » en Archivo élargi 900, sous-titre « SPORT · DIET » en Martian Mono. À faire dessiner (vectoriel, favicon, version monochrome) avant le lancement.

## Couleurs

| Token | Clair | Sombre | Origine | Usage |
| --- | --- | --- | --- | --- |
| `--pin` | `#204E4A` | `#7CC4B3` | Voldog | Couleur de marque : bandes, boutons principaux, dossard 03 |
| `--algue` | `#245333` | `#6CC38A` | Podcast Coach | Vert forêt : validation, coche « fait », texte d'accent |
| `--lime` | `#E1E53F` | `#E1E53F` | Voldog | Énergie : surlignage, appel final, anneau de progression. Jamais en texte sur fond clair |
| `--paper` | `#F5F7F0` | `#0B1A17` | Calmlyss (respiration) | Fond de page, légèrement vert sauge |
| `--paper-2` | `#E8EEE2` | `#11241F` | Calmlyss | Sections alternées |
| `--card` | `#FFFFFF` | `#14291F` | | Cartes |
| `--ink` | `#10241F` | `#EEF3E8` | | Texte (vert presque noir, jamais noir pur) |
| `--ink-2` | `#4D615A` | `#A9BBB2` | | Texte secondaire |
| `--abricot` | `#F4A259` | `#F6B47A` | Farm Minerals (vivacité) | Petites formes, rubans, focus clavier |
| `--rose` | `#F6D5D0` | `#4A2A2A` | | Fond doux, thème endométriose |
| `--ciel` | `#CFE3EC` | `#173640` | | Fond doux, formule F1 |

Répartition : 65 % brume et encre, 25 % vert (pin + forêt), 10 % citron vert et abricot. Un seul moment vif par écran. Contrastes : blanc sur `--pin` ≈ 9:1 ; encre sur `--lime` ≈ 12:1 (AA largement atteint).

## Typographies

Inchangées par rapport à la v1 (les polices des références ne sont pas connues). L'équilibre change : plus d'italique Bodoni pour la sérénité, Archivo élargi réservé aux moments forts.

| Rôle | Police (libre) | Réglages |
| --- | --- | --- |
| Titres forts | **Archivo** variable | Largeur 125 %, graisse 850-900, capitales, interlignage 0,86 |
| Émotion, sérénité | **Bodoni Moda** italique | Un ou deux mots par titre, en bas de casse |
| Texte | **Schibsted Grotesk** | 16,5 px, interlignage 1,55, environ 65 caractères par ligne |
| Données | **Martian Mono** | kcal, minutes, dates, étiquettes |

En production : polices auto-hébergées (RGPD).

## Composants visuels signature

| Composant | Inspiration | Statut |
| --- | --- | --- |
| **Formes découpées** (aiguilles de pin, algue, tranche de citron vert, galet, étoile) en aplats, ombre « papier » | Identité propre | Prototype |
| **Croissance au défilement** : les formes des étapes « La méthode » poussent quand on descend | Farm Minerals (croissance de plante) | Prototype |
| **Traînée de graines** derrière le curseur sur le site public, sur ordinateur seulement | Voldog (traînée de curseur) | Prototype |
| **Dossards de course** pour les formules, inclinaison 3D, le 03 en vert pin | Identité propre | Prototype |
| **Billets** pour les séances collectives | Identité propre | Prototype |
| **Bascule « Nutrition / Sport »** sur l'accueil : le même écran raconte l'une ou l'autre facette de Manon | Voldog (bascule de mode) | Backlog |
| **Assiette qui se compose au défilement** : chaque ingrédient arrive avec son rôle (fibres, protéines…) | Farm Minerals (produit raconté), Voldog (ingrédients) | Backlog |
| **Défilement continu** et balayage au doigt des recettes sur mobile | Calmlyss | Backlog |
| **Étiquette nutritionnelle** typographique | Identité propre | Prototype |
| **Verre dépoli** pour la navigation et la barre d'onglets mobile | Tendance 2026 | Prototype |

## Mouvement

Inspiré de la fluidité GSAP des quatre références, réalisé ici en CSS natif tant que c'est possible : titre cinétique, flottement lent des formes, parallaxe au pointeur, croissance et apparition au défilement, transitions entre pages, éclats quand on coche une séance. En production, GSAP (gratuit depuis son rachat par Webflow) reste une option pour l'assiette racontée. Tout est coupé si `prefers-reduced-motion`.

## Direction photo (quand Manon fournira des images)

Lumière naturelle du Sud, ombres franches. Aliments bruts sur fonds unis (vert pin, citron vert, brume). Mains en action plutôt que visages posés. Sport en extérieur : pinède, bord de mer, sentier côtier. Pas de banque d'images « salle de sport néon ».

## À ne jamais faire

- Fond crème + titre serif + accent terracotta.
- Fond noir + vert acide (le citron vert vit sur du vert profond ou de la brume, jamais sur du noir).
- Vert « bio » générique (feuille, goutte d'eau, `#4CAF50`) : Farm Minerals montre qu'on peut éviter ce cliché.
- Dégradé violet-bleu ; Inter ou Space Grotesk par défaut ; émojis en puces.
- Tout centré ; même arrondi et même ombre partout ; barre d'accent sur le bord des cartes.
- Faux témoignages.

## Mots-clés de référencement

diététicienne Hyères · diététicienne La Garde · diététicienne Toulon · nutritionniste Var · coach sportive Hyères · coaching sportif à domicile Hyères · alimentation endométriose · diététicienne SOPK · nutrition ménopause · rééquilibrage alimentaire · nutrition du sport · téléconsultation diététicienne · recettes santé féminine.
