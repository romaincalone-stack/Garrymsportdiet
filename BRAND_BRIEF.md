# BRAND_BRIEF : identité

Version 2026-10-22 · Direction « Papiers découpés de la Riviera » · À valider par Manon.

## Nom et promesse

- **Nom de marque** : Garrym · Sport Diet (repris du compte `@garrymsportdiet`, **à confirmer**). La personne : Manon Garrione.
- **Promesse** : « Manger, bouger, à votre rythme. »
- **Positionnement** : une diététicienne-nutritionniste qui est aussi coach sportive, ancrée sur la côte varoise, spécialisée en santé féminine (endométriose, SOPK, ménopause) et en nutrition du sport.

## Ton

| On dit | On évite |
| --- | --- |
| « Vous », phrases courtes, verbes d'action | Jargon médical, injonctions (« il faut ») |
| « Adapté à », « en complément de votre suivi médical » | « Soigne », « guérit », « détox », « brûle-graisse » |
| Des chiffres concrets (70 €, 30 min, 10 places) | Superlatifs vides (« révolutionnaire », « ultime ») |
| Chaleureux et direct, sans culpabiliser | Régime, privation, avant/après |

Inspiration de méthode : les guides « voice & tone » cités dans `references/DESIGN_REFERENCES.md` (Mailchimp notamment).

## Logo

Marque provisoire : un **disque citron** (le soleil, l'assiette, le cadran du chronomètre) traversé par une **feuille cobalt découpée** (le végétal, le mouvement). Mot-symbole « GARRYM » en Archivo élargi 900, sous-titre « SPORT · DIET » en Martian Mono. À faire dessiner proprement avant le lancement (vectoriel, favicon, version monochrome).

## Couleurs

| Token | Clair | Sombre | Usage |
| --- | --- | --- | --- |
| `--paper` | `#FBFAF6` | `#070C20` | Fond de page |
| `--paper-2` | `#F2EFE7` | `#0E1532` | Sections alternées, fonds discrets |
| `--card` | `#FFFFFF` | `#111A3B` | Cartes |
| `--ink` | `#0B1638` | `#F3F1EA` | Texte (bleu nuit, jamais noir pur) |
| `--ink-2` | `#4B5474` | `#A8AFCB` | Texte secondaire |
| `--cobalt` | `#2340D9` | `#8195FF` | Couleur d'action, dossard 03, bandes |
| `--citron` | `#F5D93B` | `#F5D93B` | Surlignage, accent de joie, anneau de progression |
| `--corail` | `#FF6B4E` | `#FF8A71` | Petites formes, focus clavier, rubans |
| `--rose` | `#F8CDD3` | `#5B2B3A` | Fonds doux (endométriose) |
| `--ciel` | `#C7D7FF` | `#1F2E6B` | Fonds doux (F1) |
| `--algue` | `#2E7D5A` | `#5BC493` | Validation, coche « fait » |

Répartition visée : 70 % papier et encre, 20 % cobalt, 10 % citron et corail. Un seul moment fort par écran. Palette construite à partir des papiers découpés des peintres de la Côte d'Azur (méthode « palette tirée d'une œuvre », cf. Color Lisa dans les références).

## Typographies

| Rôle | Police (Google Fonts, libres) | Réglages |
| --- | --- | --- |
| Titres « dossard » | **Archivo** variable | Largeur 125 %, graisse 850-900, capitales, interlignage 0,86 |
| Émotion | **Bodoni Moda** italique | Un ou deux mots par titre, en bas de casse |
| Texte | **Schibsted Grotesk** | 16,5 px, interlignage 1,55, ~65 caractères par ligne |
| Données | **Martian Mono** | kcal, minutes, dates, étiquettes en capitales espacées |

Le titre d'accueil s'anime de la largeur 62 % à 125 % au chargement (axe variable `wdth`). En production : polices auto-hébergées (RGPD).

## Composants visuels signature

- **Formes découpées** : algue, tranche d'agrume, galet, étoile, feuille, baies, vague. Aplats sans dégradé, légère ombre portée « papier ». Chaque recette reçoit une composition déterministe (même recette, même image). Elles seront remplacées ou complétées par de vraies photos.
- **Dossards de course** pour les formules : numéro 01/02/03 géant, quatre trous d'épingle, bande « Saison 2026 », talon détachable en pointillés. Inclinaison 3D au survol. Le 03 est en cobalt (effet Von Restorff).
- **Billets** pour les séances collectives : talon daté cobalt, perforation, une pastille par place.
- **Étiquette nutritionnelle** en Martian Mono à filets épais, comme sur un emballage.
- **Bande défilante** cobalt inclinée de -1,5° avec les thématiques.
- **Verre dépoli** pour la navigation et la barre d'onglets mobile (flou + saturation).
- **Grain papier** très léger sur toute la page.

## Mouvement

Une animation forte par écran, le reste discret : titre cinétique, flottement lent des formes, parallaxe au pointeur, apparition au défilement (CSS `animation-timeline: view()`), transitions entre pages (View Transitions API), éclats de papier quand on coche une séance ou ajoute un favori (règle du pic et de la fin). Tout est coupé si `prefers-reduced-motion`.

## Direction photo (quand Manon fournira des images)

Lumière naturelle du Sud, ombres franches, aliments bruts sur fonds unis (cobalt, citron, papier), mains en action plutôt que visages posés, sport en extérieur (bord de mer, pinède). Pas de photos de banque d'images « salle de sport néon ».

## À ne jamais faire (signes d'un site généré)

Fond crème + titre serif + accent terracotta ; fond noir + vert acide ; dégradé violet-bleu ; Inter ou Space Grotesk par défaut ; émojis comme puces ; tout centré ; même arrondi et même ombre sur chaque bloc ; barre d'accent sur le bord des cartes ; numéros « 01 / 02 / 03 » qui ne correspondent à aucune séquence ; faux témoignages.

## Mots-clés de référencement

diététicienne Hyères · diététicienne La Garde · diététicienne Toulon · nutritionniste Var · coach sportive Hyères · coaching sportif à domicile Hyères · alimentation endométriose · diététicienne SOPK · nutrition ménopause · rééquilibrage alimentaire · nutrition du sport · téléconsultation diététicienne · recettes santé féminine.
