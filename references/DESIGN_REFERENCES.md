# Références design

## Cinq sites haut de gamme (direction v4, site public)

Demandés par Romain le 2026-10-23 (« je veux la même qualité »). Analysés avec [REA](https://github.com/morluto/rea) (`rea-agents` 6.7.0, commande `rea inspect-web-page` sur un Chromium piloté en CDP), puis capturés avec Playwright et WebGL logiciel (SwiftShader). Les preuves REA vivent dans le registre de la session d'analyse ; leurs identifiants sont notés pour traçabilité, pas versionnés.

| Site | Studio / technique observée | Mesures | Preuve REA |
| --- | --- | --- | --- |
| [terminal-industries.com](https://terminal-industries.com/) | Nuxt ; héros WebGL noir ; révélations lettre à lettre et mot à mot au défilement ; capsule de navigation flottante ; bords de section crantés | Suisse Intl serré + Geist Mono capitales ; citron vert `#ABFF02` ; pied de page sarcelle sombre `#052424` | `ev_7a9351542e86…` |
| [landonorris.com](https://landonorris.com/) | OFF+BRAND, Webflow, p5.js ; portrait détouré, lignes topographiques, collage photo dispersé, gribouillis et signature SVG, partage On track / Off track, cartes casque à coins coupés | Mona Sans grasse capitales + Brier serif en citron ; crème `#F4F4ED`, olive `#282C20` / `#343A26`, néon `#D2FF00` | `ev_3efe79e5c8cc…` |
| [symphonyofvines.unseen.co](https://symphonyofvines.unseen.co/) | Unseen Studio ; scène WebGL cinéma sépia, grain, vignettage, son (Howler), pilule « Enter experience » | Bellefair capitales géantes avec « The » italique ; `#E1D9D1`, `#9C6E49`, `#0A0901` | Inspection REA expirée (Page.enable > 20 s) ; analyse par captures Playwright |
| [komagence.com](https://www.komagence.com/) | Webflow + GSAP ScrollTrigger ; objets 3D irisés, mots en dégradé italique, titres à flèche ↗, cartes vidéo à étiquettes, tarifs à boutons dégradés, bords obliques | PolySans ; fond `#060504` | `ev_0eebeab82fc7…` |
| [resn.co.nz](https://resn.co.nz/) | Three.js, CreateJS, TweenMax ; cristal WebGL au chargement | Fort fine ; fond `#141316` | `ev_d293f782633d…` (le chargement WebGL n'a jamais abouti en headless) |

Correspondance section par section : `BRAND_BRIEF.md`, Mises en page (site public v4). Code, images, modèles 3D et polices payantes des références **non copiés** : la scène 3D, les lignes topographiques et les animations de `site/index.html` sont écrites pour le projet.

## Modèles Awwwards (direction v3, conservée pour l'application)

Choisis par Romain, source de `BRAND_BRIEF.md` v3 (aujourd'hui limitée à l'espace patiente et au back-office). Calmlyss, Farm Minerals et Voldog ont été **ouverts dans un navigateur headless** le 2026-10-22, après ajout de leurs domaines aux domaines autorisés de l'environnement : captures et styles calculés (polices, couleurs, rayons). Awwwards refuse les connexions venant de serveurs (erreur 502) ; The Podcast Coach n'a pas pu être vu, faute d'adresse.

| Site | Mesures | Repris |
| --- | --- | --- |
| Calmlyss (calmlyss.webflow.io), Ink Studio | Geist 400 + Instrument Serif italique ; `#301100`, `#6B584E`, `#866452`, `#C78460`, `#F9F6F3` ; pilules, ronds, ovales ; GSAP, SplitText, Lenis | Polices, chocolat, moka, argile ; pilules à flèche ; rangée de ronds ; chiffres clés avec mot en italique ; illustrations au trait |
| Farm Minerals (farmminerals.com), ADELT | Aeonik ; `#F4EDE6`, `#7C914C`, `#404F1D` ; produit 3D, mot géant translucide, plante au trait, grands chiffres | Crème, sauge, olive ; ton crédible et concret ; mot géant translucide (backlog) |
| Voldog (voldogfood.com), CHP Design Studio | Peridot PE ; `#F4F1EB`, `#204E4A`, `#E1E53F` réservé aux pilules ; carte d'accueil arrondie, ingrédients détourés, bande courbe | Carte d'accueil arrondie ; bande défilante ; assiette racontée (backlog) |
| The Podcast Coach, Styles Studio | `#245333` (fiche Awwwards) | Rien de spécifique |

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
