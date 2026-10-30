# BRAND_BRIEF : identité

Version 6.1 · 2026-10-26 · Direction « GM Sport et Nutrition », construite autour du logo de Manon · À valider par Manon.
6.1 (retour de Romain le même jour) : le site doit être **blanc, vert foncé, vert clair**, avec le logo. Le quasi-noir de la 6.0 (`#12231B`) disparaît : le site passe en dominante blanche, les sections fortes prennent le vert du logo, et l'application sombre prend un vert foncé tiré du logo.
Retour de Manon transmis par Romain le 2026-10-26 : la direction artistique doit partir de son logo (monogramme « GM » et bandeau « SPORT ET NUTRITION ») ; l'espace patiente doit reprendre le rendu de l'application TSE sur téléphone (fond sombre, grandes photos, tuiles, barre d'onglets), avec trois rubriques de contenu et une rubrique « Évolution ». Priorité : très simple à utiliser pour des femmes pressées, en péri-ménopause ou ménopause, orientées santé.
Historique : v5.0-B « Calanque et citron » (2026-10-23, conservée plus bas pour mémoire), v4.1 « Oliveraie et abricot », v4.0 « Nuit varoise », v3 « Olivier et argile » (rejetée).

## Version 6 : « GM Sport et Nutrition »

### Logo
Fichiers : `site/img/logo.png` (original, vert sur fond transparent, 640 × 422) et `site/img/logoclair.png` (variante pour fond sombre : monogramme en blanc, bandeau tilleul conservé). Tirés du fichier Word transmis par Manon, recadrés et réduits à 64 couleurs (12 Ko). **À obtenir en vectoriel (SVG ou PDF) auprès de Manon ou de sa graphiste** avant la mise en ligne, avec un favicon.
- Le logo apparaît en grand en haut à gauche du héros (version verte) ; dans la capsule de navigation blanche une fois le héros dépassé (et dès l'arrivée sur mobile, où les fruits occupent le haut) ; en filigrane dans le pied de page vert (version claire) ; sur la page de connexion.
- Ne pas le déformer, ne pas le recolorer hors des deux variantes, garder une marge libre égale à la hauteur du bandeau.

### Couleurs
Tirées des pixels du logo : vert profond du monogramme, tilleul du bandeau.

| Token | Valeur | Usage |
| --- | --- | --- |
| `--blanc` | `#FFFFFF` | **Couleur dominante du site** : héros, manifeste, univers, journal ; texte sur fond vert |
| `--vert` (= `--nuit` dans le code du site) | `#18694B` | Vert du logo : sections fortes (formules, pied de page), boutons principaux sur fond blanc (texte blanc), liens |
| `--ink` | `#0F3A2A` | Vert foncé : texte courant et titres sur fond clair ; voile du chapitre « Le bilan » ; fond de l'application patiente |
| `--nuit-2` | `#135A3F` | Cartes sur fond vert |
| `--brume` | `#E8F5DC` | Vert clair doux : sections teintées (thématiques, cabinets), boutons secondaires |
| `--tilleul` | `#B2E388` | Bandeau du logo. **Seule couleur vive** : surligneur derrière les mots d'accent (comme le bandeau du logo), boutons sur fond vert (texte vert foncé), anneaux, onglet actif |
| `--gris` | `#5C6B63` | Texte secondaire sur fond clair |

Répartition du site : blanc environ 60 %, vert clair 15 %, vert du logo et vert foncé 25 %. Pas de noir ni de quasi-noir.

Surfaces de l'application sombre : `#0F3A2A` (fond), `#164A36` (cartes), `#1B5640` (cartes surélevées), `#26624A` (filets, pastilles), `#0B2E21` (barre d'onglets) ; texte secondaire `#B4C7BA`.

Contrastes (WCAG, calculés) : vert foncé sur blanc 12,7:1 ; blanc sur vert du logo 6,6:1 ; vert du logo sur vert clair 5,9:1 ; gris sur vert clair 5,0:1 ; vert foncé sur tilleul 8,6:1 ; tilleul sur vert du logo 4,5:1 (grands textes seulement) ; texte secondaire `#B4C7BA` sur `#1B5640` 4,8:1 ; tilleul sur blanc 1,4:1 (**interdit** : le tilleul ne sert que de fond ou de surligneur sur fond clair).

### Typographies
| Rôle | Police | Réglages |
| --- | --- | --- |
| Titres, texte, boutons, étiquettes | **Poppins** (300 à 700) | Titres en graisse 600, casse de phrase, interlignage 1,05 ; texte 15 à 16 px en 400 |
| Mots d'accent | **Bellefair** | Un ou deux mots par titre, en tilleul sur fond sombre, en vert sur fond clair |

Mona Sans et Geist Mono sont retirées. Plus de titres en capitales : la clientèle lit mieux en casse de phrase.

### Formes
Boutons et pastilles en pilule (rayon 999 px), cartes à rayon 20 à 24 px, sans coin coupé. Hauteur minimale des cibles 44 px.

### Application patiente (rendu « TSE »)
Thème sombre fixe (fond vert foncé `#0F3A2A`), indépendant du réglage de l'appareil. Composants :
- **En-tête** : salutation, date, avatar rond ; titre de rubrique en Poppins 600.
- **Cartes en éventail** (`.mfan`) : trois grandes cartes photo inclinées (séance du jour, menu du jour, évolution).
- **Pilule de recherche blanche** (`.msearch`) avec bouton de filtres.
- **Ronds de disciplines** (`.mcircles`) : photo ronde et libellé (Cardio doux, Renfo, Pilates, Mobilité, Yoga, Périnée).
- **Pastilles de zones** (`.zones`) : Abdos-fessiers, Bas du corps, Haut du corps, Dos et posture, Full body.
- **Liste de vidéos** (`.vitem`) : vignette, titre, durée, intensité en trois points, case « fait ».
- **Planificateur de semaine** (`.planner`) : sept jours, état de chaque repas (prévu, fait comme prévu, noté autrement, réponse de Manon).
- **Barre d'onglets** (`.mtab`) en bas : Aujourd'hui, Training, Nutrition, Évolution.

Sur ordinateur (≥ 1 024 px) : barre latérale `#0B2E21` de 248 px (logo clair, rubriques en ligne, élément actif sur `#164A36`, profil en bas), contenu jusqu'à 1 180 px, accueil en deux colonnes.

### Back-office
Fond clair (blanc et brume), surfaces fortes en nuit, mêmes polices et formes que le site. Sur téléphone : barre d'onglets blanche en bas (onglet actif vert du logo sur brume, pastille verte du nombre à traiter), panneau « Plus » en tuiles de deux colonnes, tableaux en cartes.

### Aperçu du prototype (bandeau « Affichage »)
Fond de scène `#E8F5DC` (brume) ; cadre de téléphone : bordure 10 px `#0B2E21`, rayon 48 px, ombre `0 30px 60px -24px rgba(15,58,42,.5)` ; écran d'ordinateur : filet `rgba(15,58,42,.16)`, rayon 12 px. Ces éléments n'existent que dans le prototype.

---

## Historique v5.0-B « Calanque et citron » (remplacée le 2026-10-26)

Les sections ci-dessous décrivent la direction précédente. Les compositions du site (mises en page, mouvement, photographie) restent valables ; les couleurs, polices et noms de tokens sont remplacés par la v6 (correspondance : calanque → nuit, posidonie → vert, lagon → brume, écume → blanc, citron → tilleul, galet → gris).

## Références v4 (site public, `site/index.html`)

Sites choisis par Romain, **ouverts et mesurés** le 2026-10-23 : inspection REA (`rea inspect-web-page`), captures Playwright avec WebGL (SwiftShader), styles calculés. Détails et identifiants de preuve : `references/DESIGN_REFERENCES.md`. On reprend leurs **techniques et compositions**. Leur code, leurs images, leurs modèles 3D et leurs polices payantes ne sont pas copiés.

| Site | Ce qu'on en reprend | Où dans `site/` |
| --- | --- | --- |
| [Terminal Industries](https://terminal-industries.com/) | Capsule de navigation flottante en verre sombre, micro-étiquettes en mono capitales, grand titre centré révélé mot à mot, chiffres en lignes séparées par des filets, pied de page sombre avec mot géant | Navigation, Manifeste, Repères, Pied de page |
| [Lando Norris](https://landonorris.com/) | Titres qui mêlent linéale grasse étroite en capitales et capitales serif fines colorées, lignes topographiques, partage « On track / Off track », cartes à coins coupés | Héros (titre), L'assiette / Le terrain, Thématiques |
| [Symphony of Vines](https://symphonyofvines.unseen.co/) | Chargement chiffré, chapitre plein écran sépia avec grain et vignettage, grand titre serif en capitales précédé d'un petit « Tout commence par », bouton pilule fin | Chargement, Le bilan |
| [KÖM](https://www.komagence.com/) | Fond nuit, objet 3D irisé, cartes de formules avec halo qui suit le curseur, liste d'articles avec image qui suit le curseur, défilement horizontal épinglé | Héros (scène), Formules, Journal, Thématiques |
| [Resn](https://resn.co.nz/) | Scène WebGL plein écran qui réagit à la souris et au défilement, curseur personnalisé à libellé | Héros, curseur |

## Nom et promesse

- **Nom de marque** : GM Sport et Nutrition (lu sur le logo, **à confirmer** ; ancien nom de travail « Garrym · Sport Diet », compte Instagram `@garrymsportdiet`). La personne : Manon Garrione.
- **Promesse** : « Manger mieux, bouger plus, à votre rythme. »
- **Méthode** : « la méthode Garry M » : allier nutrition et sport, dans l'assiette et sur le terrain ; un accompagnement au quotidien, pas seulement le jour de la consultation (brief du 2026-10-30).
- **Positionnement** : diététicienne-nutritionniste et coach sportive sur la côte varoise, spécialisée en santé féminine (péri-ménopause, ménopause, SMOP ex-SOPK, endométriose) ; cabinet à La Garde et visio ; clientèle principale : femmes pressées, souvent mamans, qui cherchent la santé plutôt que la performance.

## Ton

Le visuel est spectaculaire, le texte reste simple et chaleureux. Le contraste fait la marque.

| On dit | On évite |
| --- | --- |
| « Vous », phrases courtes, verbes d'action | Jargon médical, injonctions (« il faut ») |
| « Adapté à », « en complément de votre suivi médical » | « Soigne », « guérit », « détox », « brûle-graisse » |
| Des chiffres vrais (70 €, 2 cabinets, 30 min, 10 places) | Statistiques inventées (« 93 % se sentent mieux ») |
| Expliquer le pourquoi (fibres, protéines, récupération) | Régime, privation, avant/après, vocabulaire de performance agressif |

## Logo

Remplacé par le logo de Manon (voir Version 6). L'ancienne marque provisoire (cercle citron et feuille) n'est plus utilisée.

## Couleurs (site public v5.0-B)

Principe : le bleu-vert profond des calanques pour la confiance et le plein air, l'écume et le lagon pour un écran clair. Le citron relie les deux métiers : le zeste dans l'assiette, le soleil du matin sur la séance. Une seule couleur vive, chaude (teinte proche de 50°), jamais acide.

| Token | Valeur | Évoque | Usage |
| --- | --- | --- | --- |
| `--ecume` | `#F4F6F1` | Écume sur le calcaire | Fond principal (Manifeste, L'assiette / Le terrain, Repères, Journal), texte sur fond calanque |
| `--lagon` | `#D6E8E2` | Eau peu profonde | Sections teintées (`.tint` : Repères), étiquettes et texte du chapitre « Le bilan » sur fond sombre |
| `--calanque` | `#0B2D33` | Eau profonde | Héros, Thématiques, Formules (`.deep`), pied de page, texte courant (`--ink`), boutons sur fond clair |
| `--calanque-2` | `#14444B` | | Fond derrière les photos, grand mot du pied de page |
| `--posidonie` | `#2B6A5D` | Herbier de posidonie | Liens, pictos, validations ; feuilles 3D du héros (`#1F5A4E` → `#6FA592`) |
| `--citron` | `#F5D547` | Citron mûr | **Seule couleur vive**. Sur calanque : boutons, mots fins des titres, tracés, focus. Sur fond clair : **surligneur uniquement** (`--hl`, derrière un texte calanque) |
| `--galet` | `#55676A` | Galet mouillé | Texte secondaire, légendes, mentions |

Règles du fond clair (`.light`, `.tint`) : mots d'accent en calanque avec surligneur citron ; boutons calanque à texte citron (`.btn-acc`, `.btn-ink`) ; focus clavier calanque. Jamais de texte, de bordure ni d'icône citron sur fond clair (1,3:1).

Teintes dérivées : `#17505A` (centre du dégradé du héros), `#0F363D` (fond des cartes de thématiques). Transparences : `rgba(11,45,51,…)` pour les filets et voiles, `rgba(244,246,241,…)` pour le texte et les bordures sur fond sombre, `rgba(245,213,71,…)` pour les halos des formules. Couleurs des fruits 3D : valeurs propres à chaque texture peinte (`T`, `site/index.html`).

Répartition : écume 45 %, lagon 15 %, calanque 32 %, citron 8 % au maximum. Le citron ne remplit jamais une surface plus grande qu'un bouton ou qu'une barre de progression.

Contrastes (WCAG, calculés dans le brief source) : calanque sur écume 13,4:1 ; calanque sur lagon 11,5:1 ; citron sur calanque 10,1:1 ; calanque sur citron 10,1:1 ; citron sur calanque-2 7,4:1 ; posidonie sur écume 5,8:1 ; galet sur écume 5,5:1 ; galet sur lagon 4,7:1 ; citron sur écume 1,3:1 (interdit).

## Typographies (site public v4)

| Rôle | Police (Google Fonts, libre) | Réglages | Référence |
| --- | --- | --- | --- |
| Titres forts | **Mona Sans** variable | Graisse 800, largeur 78 à 82 (`font-variation-settings: "wdth"`), capitales, interlignage 0,84, interlettrage −0,03 em | Lando (Mona Sans), Terminal (Suisse Intl serré) |
| Mots d'accent | **Bellefair** | Capitales fines dans la même ligne qu'un mot gras, en citron sur fond sombre, en calanque surligné de citron sur fond clair ; titres du chapitre « Le bilan » | Lando (Brier), Symphony (Bellefair) |
| Texte | **Mona Sans** | 15 à 16 px, graisse 400-500 | |
| Étiquettes, chiffres | **Geist Mono** | 11 px, capitales, interlettrage 0,14 em, numérotation « (01) » | Terminal (Geist Mono) |

En production : polices auto-hébergées (RGPD).

## Mises en page (site public v4)

| Section | Composition | Référence |
| --- | --- | --- |
| Chargement | Retiré le 2026-10-27 (jugé inutile par Romain) : le héros s'affiche directement | — |
| Héros | Scène WebGL plein écran : corbeille de fruits en 3D réalistes (citron au centre, abricot, pomme, figue, olives, feuilles) : matières physiques (velours, pores, cire, laque), éclairage d'ambiance, ombres portées ; chute à l'arrivée, flottaison, poussée du pointeur, collisions douces, élan du défilement ; poussière en suspension ; mentions mono en haut, titre en trois lignes en bas à gauche, texte et boutons en bas à droite, « Défilez pour explorer » | Resn, KÖM, Terminal, Lando |
| (01) Manifeste | Fond écume, fin de phrase surlignée de citron, une phrase centrée qui s'éclaire mot à mot, trait manuscrit qui se dessine | Terminal |
| L'assiette / Le terrain | Deux moitiés, titre géant ; la photo se révèle (assombrie) avec un trait citron sous le titre ; bouton rond calanque à flèche citron ; en cercle depuis le pointeur | Lando (On track / Off track) |
| (02) Thématiques | Titre à gauche, défilement horizontal épinglé de cartes à coins coupés (balayage au doigt sur mobile) | KÖM, Lando |
| Le bilan | Chapitre plein écran, photo désaturée sous voile calanque en zoom lent, vignettage, grand titre serif, pilule fine | Symphony |
| (03) Formules | Fond calanque, bascule mensuel / à l'unité, cartes avec halo citron qui suit le curseur, carte mise en avant en écume avec bouton calanque à texte citron | KÖM |
| (04) Repères | Fond lagon, chiffres vrais en lignes à filets (compteur), cabinets en lignes jour / adresse / carte | Terminal |
| (05) Journal | Liste à filets, image qui suit le curseur au survol | KÖM |
| Pied de page | Appel final en Bellefair, colonnes, « GARRYM » géant en ton sur ton | Terminal |

## Mouvement

Lent et précis : courbes « expo » (GSAP), défilement doux (Lenis), animations liées au défilement (ScrollTrigger) avec inertie sur les parallaxes. Les fruits du héros obéissent à une physique simple (ressorts amortis, masse, inertie de rotation, collisions) plutôt qu'à des courbes d'animation : rien ne se déforme ni ne grossit artificiellement. Curseur à libellé (« Voir », « Doctolib ») sur souris uniquement. Grain animé discret sur toute la page. Si `prefers-reduced-motion` : pas de défilement doux, pas d'animation de la scène, textes affichés d'emblée.

## Photographie (indispensable)

Les cinq références reposent sur des photos et des modèles 3D produits par des studios. Le prototype utilise des photos libres de Wikimedia Commons (`site/img/CREDITS.md`), à remplacer. Commande à prévoir (une demi-journée de shooting) :
- Manon au cabinet, en oliveraie, sur le sentier côtier, lumière rasante du matin ou du soir (pour le chapitre « Le bilan ») ;
- aliments et plats vus du dessus sur fond écume ou lagon, en lumière naturelle ;
- mains en action (couper, mélanger, s'étirer) ;
- les deux cabinets.

## À ne jamais faire

- Statistiques ou témoignages inventés.
- Plus d'une couleur vive par écran ; tilleul en aplat sur une grande surface ; texte tilleul sur fond clair.
- Couleur hors palette (le vert du logo et le tilleul suffisent), noir pur, rouge « salle de sport », dégradés.
- Logo déformé, recoloré, ou posé sur une photo chargée sans voile.
- Interface chargée : une action principale par écran, des libellés en toutes lettres, pas de jargon (la clientèle n'est pas technophile).
- Dégradé violet-bleu, effets néon multiples, photos de « salle de sport néon ».
- Texte courant en capitales : les capitales sont réservées aux titres et aux étiquettes mono.
- Animation qui bloque la lecture ou démarre à opacité nulle sans repli.
- Copier le code, les images, les modèles 3D ou les polices payantes des références.

## Application v5-B (historique)

Remplacée par la section « Application patiente (rendu TSE) » de la v6. Les noms de tokens v3 (`--paper`, `--olive`, `--sable`…) restent dans `prototype/index.html` ; leurs valeurs suivent désormais la v6 : `--paper` `#F6F9F3`, `--ink` `#0F3A2A`, `--ink-2` `#5C6B63`, `--line` `#D6E2D3`, `--olive` `#18694B`, `--sable` et `--citron` `#B2E388`, `--lagon` `#E3F1D6`, `--calanque` `#0F3A2A`. L'espace patiente redéfinit ces tokens en sombre sous `body.v-patient`.

## Mots-clés de référencement

diététicienne La Garde · diététicienne Toulon · nutritionniste Var · coach sportive La Garde · coaching sportif à domicile Var · SMOP alimentation · alimentation endométriose · diététicienne SOPK · nutrition ménopause · péri-ménopause alimentation · sport à la maison femmes · rééquilibrage alimentaire · nutrition du sport · téléconsultation diététicienne · recettes santé féminine.
