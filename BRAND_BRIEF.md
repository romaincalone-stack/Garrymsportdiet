# BRAND_BRIEF : identité

Version 4.1 · 2026-10-23 · Direction « Oliveraie et abricot », site public mélangeant cinq références haut de gamme · À valider par Manon.
La v4.0 « Nuit varoise » (quasi-noir et citron néon) a été jugée trop éloignée du métier : ces codes évoquent la tech et la performance mécanique, pas la santé ni l'alimentation. La v4.1 garde les compositions et remplace la palette.
La v3 « Olivier et argile » a été rejetée par Romain (« Je n'aime pas du tout »). Elle reste la base de l'**espace patiente et du back-office** (`prototype/index.html`) tant qu'aucune décision n'est prise pour eux : ses tokens sont conservés plus bas, section « Application (v3) ».

## Références v4 (site public, `site/index.html`)

Sites choisis par Romain, **ouverts et mesurés** le 2026-10-23 : inspection REA (`rea inspect-web-page`), captures Playwright avec WebGL (SwiftShader), styles calculés. Détails et identifiants de preuve : `references/DESIGN_REFERENCES.md`. On reprend leurs **techniques et compositions**. Leur code, leurs images, leurs modèles 3D et leurs polices payantes ne sont pas copiés.

| Site | Ce qu'on en reprend | Où dans `site/` |
| --- | --- | --- |
| [Terminal Industries](https://terminal-industries.com/) | Capsule de navigation flottante en verre sombre, micro-étiquettes en mono capitales, grand titre centré révélé mot à mot, chiffres en lignes séparées par des filets, pied de page sombre avec mot géant | Navigation, Manifeste, Repères, Pied de page |
| [Lando Norris](https://landonorris.com/) | Titres qui mêlent linéale grasse étroite en capitales et capitales serif fines colorées, lignes topographiques, collage de photos dispersées avec légendes mono, signature tracée, partage « On track / Off track », cartes à coins coupés | Héros (titre), Au quotidien, L'assiette / Le terrain, Thématiques |
| [Symphony of Vines](https://symphonyofvines.unseen.co/) | Chargement chiffré, chapitre plein écran sépia avec grain et vignettage, grand titre serif en capitales précédé d'un petit « Tout commence par », bouton pilule fin | Chargement, Le bilan |
| [KÖM](https://www.komagence.com/) | Fond nuit, objet 3D irisé, cartes de formules avec halo qui suit le curseur, liste d'articles avec image qui suit le curseur, défilement horizontal épinglé | Héros (scène), Formules, Journal, Thématiques |
| [Resn](https://resn.co.nz/) | Scène WebGL plein écran qui réagit à la souris et au défilement, curseur personnalisé à libellé | Héros, curseur |

## Nom et promesse

- **Nom de marque** : Garrym · Sport Diet (repris de `@garrymsportdiet`, **à confirmer**). La personne : Manon Garrione.
- **Promesse** : « Manger mieux, bouger plus, à votre rythme. »
- **Positionnement** : diététicienne-nutritionniste et coach sportive sur la côte varoise, spécialisée en santé féminine (endométriose, SOPK, ménopause) et en nutrition du sport.

## Ton

Le visuel est spectaculaire, le texte reste simple et chaleureux. Le contraste fait la marque.

| On dit | On évite |
| --- | --- |
| « Vous », phrases courtes, verbes d'action | Jargon médical, injonctions (« il faut ») |
| « Adapté à », « en complément de votre suivi médical » | « Soigne », « guérit », « détox », « brûle-graisse » |
| Des chiffres vrais (70 €, 2 cabinets, 30 min, 10 places) | Statistiques inventées (« 93 % se sentent mieux ») |
| Expliquer le pourquoi (fibres, protéines, récupération) | Régime, privation, avant/après, vocabulaire de performance agressif |

## Logo

Marque provisoire : un **cercle au trait abricot** (le soleil, l'assiette) et une **feuille pleine crème**, mot-symbole « GARRYM » en Mona Sans 700. À faire dessiner (vectoriel, favicon, version monochrome) avant le lancement.

## Couleurs (site public v4.1)

Principe : chaque couleur doit pouvoir se manger ou se cueillir dans le Var. Le vert forêt (feuille d'olivier) porte la confiance et la santé ; le crème (lin, pain) la douceur ; l'abricot l'appétit et l'énergie du sport. Une seule couleur vive.

| Token | Valeur | Évoque | Usage |
| --- | --- | --- | --- |
| `--foret` | `#121C16` | Feuillage à l'ombre | Fond du héros, des thématiques, du chargement |
| `--vert` | `#1F2E22` | Feuille d'olivier | Sections sombres (Au quotidien, Formules, pied de page) |
| `--vert-2` | `#2C3F2F` | | Fond des emplacements photo, mot géant du pied de page |
| `--sauge` | `#A8B89A` | Sauge, revers de la feuille d'olivier | Étiquettes mono et lignes sur fond vert |
| `--creme` | `#F6F1E7` | Lin, mie de pain | Sections claires, texte sur fond vert |
| `--sable` | `#EBDFCC` | | Texte du chapitre « Le bilan » |
| `--abricot` | `#FF8A4C` | Abricot mûr | **Seule couleur vive**, sur fond vert : boutons principaux, mots serif des titres, traits dessinés, focus clavier |
| `--terre` | `#B5481B` | Terre cuite | Accents sur fond crème (traits, bouton rond, mots serif), là où l'abricot manquerait de contraste |
| `--ink` | `#16211A` | | Texte sur crème (vert très sombre, jamais noir pur) |
| `--gris` | `#5E665C` | | Texte secondaire sur crème |

Teintes dérivées : `#24382A` (centre du dégradé du héros), `#18251B` (fond des cartes de thématiques), `#2a2016` (fond du chapitre « Le bilan » avant chargement de la photo), `#F4ECE2` (son titre). Transparences du crème et de l'encre pour les filets (`rgba(…,.1)` à `.16`). Couleurs des fruits 3D du héros : valeurs propres à chaque fruit dans `FRUITS` (`site/index.html`), toutes dans les familles vert, jaune, abricot, figue.

Répartition : 50 % verts, 40 % crème, 10 % abricot au maximum. L'abricot ne remplit jamais une surface plus grande qu'un bouton.

Contrastes (WCAG) : crème sur forêt 15,5:1 ; abricot sur forêt 7,5:1 ; abricot sur vert 6,1:1 ; encre sur abricot 7,1:1 ; crème sur vert 12,7:1 ; sauge sur forêt 8,3:1 ; encre sur crème 14,7:1 ; gris sur crème 5,3:1 ; terre sur crème 4,8:1.

Historique : v4.0 « Nuit varoise » (`#0B0A07`, `#22261B`, `#D7FF1F`…), remplacée le 2026-10-23.

## Typographies (site public v4)

| Rôle | Police (Google Fonts, libre) | Réglages | Référence |
| --- | --- | --- | --- |
| Titres forts | **Mona Sans** variable | Graisse 800, largeur 78 à 82 (`font-variation-settings: "wdth"`), capitales, interlignage 0,84, interlettrage −0,03 em | Lando (Mona Sans), Terminal (Suisse Intl serré) |
| Mots d'accent | **Bellefair** | Capitales fines dans la même ligne qu'un mot gras, en abricot (terre sur fond crème) ; titres du chapitre « Le bilan » | Lando (Brier), Symphony (Bellefair) |
| Texte | **Mona Sans** | 15 à 16 px, graisse 400-500 | |
| Étiquettes, chiffres | **Geist Mono** | 11 px, capitales, interlettrage 0,14 em, numérotation « (01) » | Terminal (Geist Mono) |

En production : polices auto-hébergées (RGPD).

## Mises en page (site public v4)

| Section | Composition | Référence |
| --- | --- | --- |
| Chargement | Fond forêt, « GARRYM » en Bellefair géant lettre par lettre, compteur 000 → 100, barre abricot, rideau qui remonte | Symphony, Resn |
| Héros | Scène WebGL plein écran : corbeille de fruits du Var en 3D (abricot, citron, pomme, figue, olives, feuilles d'olivier) qui flottent, ondulent doucement, suivent la souris et s'écartent au défilement ; reflets et liseré lumineux, poussière en suspension ; mentions mono en haut, titre en trois lignes en bas à gauche, texte et boutons en bas à droite, « Défilez pour explorer » | Resn, KÖM, Terminal, Lando |
| (01) Manifeste | Fond crème, une phrase centrée qui s'éclaire mot à mot, trait manuscrit qui se dessine | Terminal |
| (02) Au quotidien | Fond olive avec lignes topographiques, photos dispersées en parallaxe avec légendes mono, citation au centre et signature tracée | Lando |
| L'assiette / Le terrain | Deux moitiés, titre géant et trait terre cuite ; la photo se révèle en cercle depuis le pointeur | Lando (On track / Off track) |
| (03) Thématiques | Titre à gauche, défilement horizontal épinglé de cartes à coins coupés (balayage au doigt sur mobile) | KÖM, Lando |
| Le bilan | Chapitre plein écran, photo sépia en zoom lent, vignettage, grand titre serif, pilule fine | Symphony |
| (04) Formules | Fond olive, bascule mensuel / à l'unité, cartes avec halo qui suit le curseur, carte mise en avant en crème | KÖM |
| (05) Repères | Chiffres vrais en lignes à filets (compteur), cabinets en lignes jour / adresse / carte | Terminal |
| (06) Journal | Liste à filets, image qui suit le curseur au survol | KÖM |
| Pied de page | Appel final en Bellefair, colonnes, « GARRYM » géant en ton sur ton | Terminal |

## Mouvement

Lent et précis : courbes « expo » (GSAP), défilement doux (Lenis), animations liées au défilement (ScrollTrigger). Curseur à libellé (« Voir », « Doctolib ») sur souris uniquement. Grain animé discret sur toute la page. Si `prefers-reduced-motion` : pas de défilement doux, pas d'animation de la scène, textes affichés d'emblée.

## Photographie (indispensable)

Les cinq références reposent sur des photos et des modèles 3D produits par des studios. Le prototype utilise des photos libres de Wikimedia Commons (`site/img/CREDITS.md`), à remplacer. Commande à prévoir (une demi-journée de shooting) :
- Manon au cabinet, en oliveraie, sur le sentier côtier, lumière rasante du matin ou du soir (pour le chapitre sépia) ;
- aliments et plats vus du dessus sur fond sombre (pierre, lin foncé) ;
- mains en action (couper, mélanger, s'étirer) ;
- un portrait détourable pour un futur collage façon Lando ;
- les deux cabinets.

## À ne jamais faire

- Statistiques ou témoignages inventés.
- Plus d'une couleur vive par écran ; abricot en aplat sur une grande surface ; abricot en texte sur fond crème (utiliser la terre).
- Noir pur, vert néon, codes visuels « tech » ou « salle de sport ».
- Dégradé violet-bleu, effets néon multiples, photos de « salle de sport néon ».
- Texte courant en capitales : les capitales sont réservées aux titres et aux étiquettes mono.
- Animation qui bloque la lecture ou démarre à opacité nulle sans repli.
- Copier le code, les images, les modèles 3D ou les polices payantes des références.

## Application (v3, espace patiente et back-office)

En attente de décision : l'application garde les tokens v3 ci-dessous. Références v3 : Calmlyss, Farm Minerals, Voldog.

### Couleurs v3

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

### Typographies v3

| Rôle | Police (Google Fonts, libre) | Réglages |
| --- | --- | --- |
| Titres et texte | **Geist** | Titres en graisse 400, bas de casse, interlettrage −0,035 em, 56 à 100 px ; texte 16,5 px, interlignage 1,55 |
| Accent | **Instrument Serif** italique | Seconde ligne d'un titre ou mot-clé (« *à votre rythme* », « *aujourd'hui* »), même taille que la ligne au-dessus |
| Données et étiquettes | **Geist Mono** | kcal, minutes, dates ; étiquettes en capitales espacées précédées d'un point |

Geist et Instrument Serif sont celles de Calmlyss. Aeonik (Farm Minerals) et Peridot PE (Voldog) sont payantes. En production : polices auto-hébergées (RGPD).


## Mots-clés de référencement

diététicienne Hyères · diététicienne La Garde · diététicienne Toulon · nutritionniste Var · coach sportive Hyères · coaching sportif à domicile Hyères · alimentation endométriose · diététicienne SOPK · nutrition ménopause · rééquilibrage alimentaire · nutrition du sport · téléconsultation diététicienne · recettes santé féminine.
