# BRAND_BRIEF : identité

Version 5.0-B · 2026-10-23 · Direction « Calanque et citron », site public mélangeant cinq références haut de gamme · À valider par Manon.
Palette fournie par Romain (`references/brief-couleurs-v5-citron.html`, variante B de la v5 : le citron remplace le corail). Historique : v4.0 « Nuit varoise » (quasi-noir et citron néon, trop « tech »), v4.1 « Oliveraie et abricot » (vert forêt, crème, abricot), remplacées le 2026-10-23.
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

Marque provisoire : un **cercle au trait citron** (le soleil, l'assiette) et une **feuille pleine écume**, mot-symbole « GARRYM » en Mona Sans 700. À faire dessiner (vectoriel, favicon, version monochrome) avant le lancement.

## Couleurs (site public v5.0-B)

Principe : le bleu-vert profond des calanques pour la confiance et le plein air, l'écume et le lagon pour un écran clair. Le citron relie les deux métiers : le zeste dans l'assiette, le soleil du matin sur la séance. Une seule couleur vive, chaude (teinte proche de 50°), jamais acide.

| Token | Valeur | Évoque | Usage |
| --- | --- | --- | --- |
| `--ecume` | `#F4F6F1` | Écume sur le calcaire | Fond principal (Manifeste, L'assiette / Le terrain, Repères, Journal), texte sur fond calanque |
| `--lagon` | `#D6E8E2` | Eau peu profonde | Sections teintées (`.tint` : Au quotidien), étiquettes et texte du chapitre « Le bilan » sur fond sombre |
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
| Chargement | Fond calanque, « GARRYM » en Bellefair géant lettre par lettre, compteur 000 → 100, barre citron, rideau qui remonte | Symphony, Resn |
| Héros | Scène WebGL plein écran : corbeille de fruits en 3D réalistes (citron au centre, abricot, pomme, figue, olives, feuilles) : matières physiques (velours, pores, cire, laque), éclairage d'ambiance, ombres portées ; chute à l'arrivée, flottaison, poussée du pointeur, collisions douces, élan du défilement ; poussière en suspension ; mentions mono en haut, titre en trois lignes en bas à gauche, texte et boutons en bas à droite, « Défilez pour explorer » | Resn, KÖM, Terminal, Lando |
| (01) Manifeste | Fond écume, fin de phrase surlignée de citron, une phrase centrée qui s'éclaire mot à mot, trait manuscrit qui se dessine | Terminal |
| (02) Au quotidien | Fond lagon avec lignes topographiques, photos dispersées en parallaxe (avec inertie) et légendes galet, citation au centre et signature tracée en calanque | Lando |
| L'assiette / Le terrain | Deux moitiés, titre géant ; la photo se révèle (assombrie) avec un trait citron sous le titre ; bouton rond calanque à flèche citron ; en cercle depuis le pointeur | Lando (On track / Off track) |
| (03) Thématiques | Titre à gauche, défilement horizontal épinglé de cartes à coins coupés (balayage au doigt sur mobile) | KÖM, Lando |
| Le bilan | Chapitre plein écran, photo désaturée sous voile calanque en zoom lent, vignettage, grand titre serif, pilule fine | Symphony |
| (04) Formules | Fond calanque, bascule mensuel / à l'unité, cartes avec halo citron qui suit le curseur, carte mise en avant en écume avec bouton calanque à texte citron | KÖM |
| (05) Repères | Chiffres vrais en lignes à filets (compteur), cabinets en lignes jour / adresse / carte | Terminal |
| (06) Journal | Liste à filets, image qui suit le curseur au survol | KÖM |
| Pied de page | Appel final en Bellefair, colonnes, « GARRYM » géant en ton sur ton | Terminal |

## Mouvement

Lent et précis : courbes « expo » (GSAP), défilement doux (Lenis), animations liées au défilement (ScrollTrigger) avec inertie sur les parallaxes. Les fruits du héros obéissent à une physique simple (ressorts amortis, masse, inertie de rotation, collisions) plutôt qu'à des courbes d'animation : rien ne se déforme ni ne grossit artificiellement. Curseur à libellé (« Voir », « Doctolib ») sur souris uniquement. Grain animé discret sur toute la page. Si `prefers-reduced-motion` : pas de défilement doux, pas d'animation de la scène, textes affichés d'emblée.

## Photographie (indispensable)

Les cinq références reposent sur des photos et des modèles 3D produits par des studios. Le prototype utilise des photos libres de Wikimedia Commons (`site/img/CREDITS.md`), à remplacer. Commande à prévoir (une demi-journée de shooting) :
- Manon au cabinet, en oliveraie, sur le sentier côtier, lumière rasante du matin ou du soir (pour le chapitre « Le bilan ») ;
- aliments et plats vus du dessus sur fond écume ou lagon, en lumière naturelle ;
- mains en action (couper, mélanger, s'étirer) ;
- un portrait détourable pour un futur collage façon Lando ;
- les deux cabinets.

## À ne jamais faire

- Statistiques ou témoignages inventés.
- Plus d'une couleur vive par écran ; citron en aplat sur une grande surface ; texte, bordure ou icône citron sur fond clair (surligneur uniquement).
- Jaune qui tire vers le vert (citron vert, néon, fluo), noir pur, rouge « salle de sport », dégradés.
- Dégradé violet-bleu, effets néon multiples, photos de « salle de sport néon ».
- Texte courant en capitales : les capitales sont réservées aux titres et aux étiquettes mono.
- Animation qui bloque la lecture ou démarre à opacité nulle sans repli.
- Copier le code, les images, les modèles 3D ou les polices payantes des références.

## Application (espace patiente et back-office)

Depuis le 2026-10-23, l'application (`prototype/index.html`) utilise la palette v5-B et les polices du site (Mona Sans, Bellefair, Geist Mono). Les noms de tokens v3 sont conservés dans le code pour ne pas réécrire les écrans ; leur valeur suit cette correspondance :

| Token de l'application | Valeur v5-B | Rôle |
| --- | --- | --- |
| `--paper` / `--paper-2` / `--card` | `#F4F6F1` écume / `#E6EFEB` / `#FFFFFF` | Fonds |
| `--ink` / `--ink-2` / `--line` | `#0B2D33` calanque / `#55676A` galet / `#D3E0DB` | Texte, texte secondaire, filets |
| `--olive` (+ `--olive-btn`) | `#0B2D33` calanque, texte de bouton `#F5D547` citron | Boutons principaux, surfaces fortes, formule F3 |
| `--sauge`, `--moka`, `--argile`, `--ok` | `#2B6A5D` posidonie | Validations, mots d'accent, illustrations |
| `--sable` | `#F5D547` citron | Surligneur, petites pastilles, progression, formule F2 ; jamais de grand aplat |
| `--olive-soft`, `--sauge-soft`, `--brume`, `--rose`, `--sable-soft` | `#D6E8E2` lagon / `#E6EFEB` | Fonds doux, cartes mises en avant |

Teintes dérivées propres à l'application : `#E6EFEB` (fond secondaire), `#D3E0DB` (filets) ; dégradés des emplacements photo (`.ph-*`) tirés de calanque, posidonie, lagon et citron. Mode sombre : fond calanque `#0B2D33`, cartes `#14444B`, accent citron. Les couleurs v3 restent consultables dans `prototype/archive/v3-2026-10-23.html`.

## Mots-clés de référencement

diététicienne Hyères · diététicienne La Garde · diététicienne Toulon · nutritionniste Var · coach sportive Hyères · coaching sportif à domicile Hyères · alimentation endométriose · diététicienne SOPK · nutrition ménopause · rééquilibrage alimentaire · nutrition du sport · téléconsultation diététicienne · recettes santé féminine.
