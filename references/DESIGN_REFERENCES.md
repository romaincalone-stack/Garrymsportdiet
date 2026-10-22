# Références design

## Modèles Awwwards (direction actuelle, 2026-10-22)

Choisis par Romain. C'est la source principale de `BRAND_BRIEF.md` v2. Awwwards et les sites eux-mêmes étant bloqués par le réseau de l'environnement de travail, les informations viennent des fiches Awwwards telles que la recherche web les restitue. Les polices de ces sites restent inconnues.

| Site | Faits relevés | Repris dans le projet |
| --- | --- | --- |
| [Calmlyss · Health & Wellness](https://www.awwwards.com/sites/calmlyss-health-wellness) | Ink Studio, nominé (sept. 2026). Modèle Webflow pour coachs bien-être et yoga. Palette douce, beaucoup de blanc. Catégories : animation, défilement infini, gestes | Fond brume vert sauge, respiration, balayage au doigt (backlog) |
| [Farm Minerals](https://www.awwwards.com/sites/farm-minerals) ([étude de cas](https://www.awwwards.com/farm-minerals-case-study.html)) | ADELT, Site du jour (19 févr. 2026, 7,42/10). Webflow + GSAP. Coloré, 3D, WebGL, visualisation de données. Produit raconté au défilement, animation de croissance de plante. Objectif : éviter les clichés visuels du « vert agricole » | Croissance des formes au défilement, abricot comme touche vive, assiette racontée (backlog), règle « pas de vert bio générique » |
| [VOLDOG FOOD](https://www.awwwards.com/sites/voldog-food) | CHP Design Studio, mention (5 juin 2026). GSAP, SVG, Vanilla JS. Palette #204E4A et #E1E53F. Bascule de mode, traînée de curseur, ingrédients racontés | `--pin` #204E4A, `--lime` #E1E53F, traînée de graines, bascule Nutrition / Sport (backlog) |
| [The Podcast Coach](https://www.awwwards.com/sites/the-podcast-coach) | Styles Studio, mention (1er févr. 2026). WordPress, Figma, GSAP. Vert #245333. Agence de production haut de gamme | `--algue` #245333, ton haut de gamme et sobre |

## Listes de ressources (première version)

Les quatre dépôts demandés ont été clonés et lus le 2026-10-22. Ce sont des listes de liens. Ils ne sont **pas copiés** ici : trois sont de simples sommaires, et le quatrième redistribue des livres sous droits d'auteur (voir plus bas). Ce fichier liste ce qui a été retenu et où c'est appliqué.

Ces listes datent pour l'essentiel de 2015 à 2019. Les techniques « 2026 » du prototype (polices variables animées, animations pilotées par le défilement, View Transitions, verre dépoli) ne viennent pas d'elles. Elles s'appuient sur l'état actuel des navigateurs.

## [batoreh/awesome-ux](https://github.com/batoreh/awesome-ux)

| Ressource | Ce qu'on en a tiré | Où |
| --- | --- | --- |
| UX Project Checklist | Liste de contrôle avant livraison (accessibilité, états vides, erreurs) | `CLAUDE.md` règles 8 et 10 |
| Information Architecture Basics, Organization Schemes (usability.gov) | Navigation patiente par tâche (« quoi manger », « quoi faire ») plutôt que par type de contenu | Espace patiente : Programme, Recettes, Sport, Séances |
| Mobile Design Patterns (Pttrns, Inspired UI) | Barre d'onglets en bas, cinq entrées maximum, « Plus » pour le reste | Barre d'onglets mobile |
| Accessibility basics, « 7 things every designer needs to know about accessibility » | Contraste, focus visible, libellés, pas d'information portée par la couleur seule | Tokens, `:focus-visible`, libellés des places de séance |

## [gztchan/awesome-design](https://github.com/gztchan/awesome-design)

| Ressource | Ce qu'on en a tiré | Où |
| --- | --- | --- |
| Color Lisa (palettes tirées de chefs-d'œuvre) | Méthode : construire la palette à partir d'œuvres, ici les papiers découpés de la Côte d'Azur (cobalt, citron, corail sur papier) | `BRAND_BRIEF.md` Couleurs |
| Butterick's Practical Typography | Texte à ~65 caractères par ligne, corps 16,5 px, interlignage 1,55, peu de graisses | Typographie du texte courant |
| Typewolf, Fonts In Use | Vérifier que les polices choisies ne sont pas les choix par défaut du moment ; Archivo élargi pour l'univers du dossard sportif | `BRAND_BRIEF.md` Typographies |
| Styleguide and Branding (Mailchimp, IBM, Atlassian…) | Structure du brief : voix, ton, tableau « on dit / on évite », tokens | `BRAND_BRIEF.md` |
| Awards (Awwwards…) | Barre de comparaison pour l'effet « ouah » : une idée forte par écran, mouvement orchestré | Accueil : titre cinétique, dossards, bande défilante |

## [nicolesaidy/awesome-web-design](https://github.com/nicolesaidy/awesome-web-design)

| Ressource | Principe | Application |
| --- | --- | --- |
| Laws of UX : loi de Hick | Peu de choix = décision rapide | 3 formules seulement, 1 action principale par écran |
| Laws of UX : loi de Fitts | Cibles grandes et proches | Boutons ≥ 44 px, barre d'onglets au pouce |
| Laws of UX : effet Von Restorff | L'élément différent est mémorisé | Dossard 03 seul en vert pin |
| Laws of UX : loi de Jakob | Les gens attendent les conventions qu'ils connaissent | Onglets type iOS, cœur pour les favoris, panier pour la liste de courses |
| Laws of UX : règle du pic et de la fin | On retient le moment fort et la fin | Éclats de papier quand on coche une séance ou ajoute un favori |
| Laws of UX : seuil de Doherty | Réponse en moins de 400 ms | Filtres instantanés, transitions de 350 ms |
| Laws of UX : loi de Miller | Regrouper l'information | Filtres groupés, semainier en 4 créneaux |
| Type Scale, Fontpair | Échelle typographique cohérente, association de polices contrastées | Archivo + Bodoni Moda italique + Schibsted Grotesk + Martian Mono |
| iOS Human Interface Guidelines, Material Design | Tailles minimales, retour visuel, états | Composants de l'application |
| GoodUI | Un seul appel à l'action dominant, preuve concrète plutôt que promesse | « Réserver mon bilan » partout ; chiffres concrets (70 €, 10 places) |

## [justinhartman/ui-ux-design-library](https://github.com/justinhartman/ui-ux-design-library)

Bibliothèque de livres en PDF. Utilisés comme cadre de réflexion, **non copiés** : le dépôt indique lui-même que les documents viennent de sources diverses et que les droits restent à leurs auteurs. Plusieurs sont des livres commerciaux (*About Face*, *The Elements of User Experience*). Les recopier dans ce dépôt étendrait leur redistribution.

| Ouvrage | Ce qu'on en a tiré | Où |
| --- | --- | --- |
| *The Elements of User Experience* (J. J. Garrett) | Les cinq plans : stratégie, périmètre, structure, ossature, surface | Plan de `APP_SPEC.md` |
| *About Face* (Cooper) | Personas et objectifs plutôt que liste de fonctions | `APP_SPEC.md` §2 Cibles |
| *Interaction Design Best Practices* | Retour immédiat, états vides explicites, messages d'erreur qui disent quoi faire | États vides des recettes et vidéos, toasts |
