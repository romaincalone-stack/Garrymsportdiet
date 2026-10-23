# BRAND_BRIEF : identité

Version 4.0 · 2026-10-23 · Direction « Nuit varoise », site public mélangeant cinq références haut de gamme · À valider par Manon.
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

Marque provisoire : un **cercle au trait citron** (le soleil, l'assiette) et une **feuille pleine crème**, mot-symbole « GARRYM » en Mona Sans 700. À faire dessiner (vectoriel, favicon, version monochrome) avant le lancement.

## Couleurs (site public v4)

| Token | Valeur | Origine | Usage |
| --- | --- | --- | --- |
| `--nuit` | `#0B0A07` | KÖM `#060504`, Symphony `#0A0901` | Fond du héros, des thématiques, du chargement |
| `--olive` | `#22261B` | Lando `#282C20` | Sections sombres (Au quotidien, Formules, pied de page) |
| `--olive-2` | `#30361F` | Lando `#343A26` | Fond des emplacements photo, mot géant du pied de page |
| `--creme` | `#F2F0E8` | Lando `#F4F4ED` | Sections claires, texte sur fond sombre |
| `--sable` | `#E1D9D1` | Symphony `#E1D9D1` | Texte du chapitre « Le bilan » |
| `--cuivre` | `#9C6E49` | Symphony `#9C6E49` | Halo de la carte de formule mise en avant, teinte de la scène 3D |
| `--citron` | `#D7FF1F` | Lando `#D2FF00`, Terminal `#ABFF02` | **Seule couleur vive** : boutons principaux, mots serif des titres, traits dessinés, focus clavier |
| `--ink` | `#111112` | | Texte sur fond crème |
| `--gris` | `#7C7F75` | | Étiquettes mono sur fond sombre |

Teintes dérivées (pas de nouvelle teinte, seulement des nuances des tokens ci-dessus) : `#55584F` et `#6B6E64` pour le texte secondaire sur crème (contraste 6,4:1 et 4,6:1), `#151510` pour le fond des cartes de thématiques, `#2A2E20` pour le centre du dégradé du héros, `#2a2016` pour le fond du chapitre « Le bilan » avant chargement de la photo, `#F4ECE2` pour son titre. Transparences du crème et de l'encre pour les filets (`rgba(…,.1)` à `.16`).

Répartition : 50 % nuit et olive, 40 % crème, 10 % citron au maximum. Le citron ne remplit jamais une surface plus grande qu'un bouton. Contrastes : crème sur nuit ≈ 17:1 ; citron sur nuit ≈ 17:1 ; encre sur citron ≈ 16:1 ; crème sur olive `#22261B` ≈ 13,5:1 ; étiquettes grises `#7C7F75` sur nuit ≈ 4,9:1.

**Risque connu** : la v2 « citron vert » avait été rejetée pour sa palette. Ici le citron est un accent sur fond nuit, comme chez Lando Norris, pas une couleur de fond. Si Manon ou Romain ne l'aiment pas, il se remplace par un seul token (`--citron`), par exemple par le cuivre clair `#E0A27F`.

## Typographies (site public v4)

| Rôle | Police (Google Fonts, libre) | Réglages | Référence |
| --- | --- | --- | --- |
| Titres forts | **Mona Sans** variable | Graisse 800, largeur 78 à 82 (`font-variation-settings: "wdth"`), capitales, interlignage 0,84, interlettrage −0,03 em | Lando (Mona Sans), Terminal (Suisse Intl serré) |
| Mots d'accent | **Bellefair** | Capitales fines dans la même ligne qu'un mot gras, en citron ; titres du chapitre « Le bilan » | Lando (Brier), Symphony (Bellefair) |
| Texte | **Mona Sans** | 15 à 16 px, graisse 400-500 | |
| Étiquettes, chiffres | **Geist Mono** | 11 px, capitales, interlettrage 0,14 em, numérotation « (01) » | Terminal (Geist Mono) |

En production : polices auto-hébergées (RGPD).

## Mises en page (site public v4)

| Section | Composition | Référence |
| --- | --- | --- |
| Chargement | Fond nuit, « GARRYM » en Bellefair géant lettre par lettre, compteur 000 → 100, barre citron, rideau qui remonte | Symphony, Resn |
| Héros | Scène WebGL plein écran (sphère déformée par un bruit, reflets cuivre et citron, poussière), mentions mono en haut, titre en trois lignes en bas à gauche, texte et boutons en bas à droite, « Défilez pour explorer » | Resn, KÖM, Terminal, Lando |
| (01) Manifeste | Fond crème, une phrase centrée qui s'éclaire mot à mot, trait manuscrit qui se dessine | Terminal |
| (02) Au quotidien | Fond olive avec lignes topographiques, photos dispersées en parallaxe avec légendes mono, citation au centre et signature tracée | Lando |
| L'assiette / Le terrain | Deux moitiés, titre géant et trait citron ; la photo se révèle en cercle depuis le pointeur | Lando (On track / Off track) |
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
- Plus d'une couleur vive par écran ; citron en aplat sur une grande surface.
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
