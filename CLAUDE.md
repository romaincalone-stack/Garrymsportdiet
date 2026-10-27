# CLAUDE.md : instructions permanentes

## Le concept

Plateforme de **Manon Garrione**, diététicienne-nutritionniste et coach sportive (cabinet à La Garde, visio ; Hyères retiré le 2026-10-27). Marque : **GM Sport et Nutrition**, lue sur le logo de Manon (`site/img/logo.png`, nom à confirmer ; Instagram `@garrymsportdiet`). Clientèle : femmes pressées, souvent mamans, en péri-ménopause ou ménopause, orientées santé : l'interface doit rester très simple.

Trois briques :
1. **Site public** : présentation, formules, thématiques, journal, cabinets. Objectif unique : faire réserver un bilan sur Doctolib.
2. **Espace patiente** : contenu débloqué selon la formule (Suivi simple 50 €/consultation, F1 Nutrition + Recettes 65 €, F2 Nutrition + Recettes + Sport 90 €, F3 Recettes + Sport 40 € après le suivi). La formule qui débloque un contenu est la moins chère qui garde tout ce que la patiente a déjà (`minPlan()`).
3. **Back-office** : Manon crée les comptes, attribue les formules, publie recettes, vidéos, articles, programmes et séances.

Doctolib reste l'unique outil de prise de rendez-vous. La plateforme ne prend aucun rendez-vous et ne s'y connecte pas.

Documents de référence : `APP_SPEC.md` (produit), `BRAND_BRIEF.md` (identité), `DATA_DICTIONARY.md` (données), `INTEGRATIONS.md` (services), `FEATURE_BACKLOG.md` (avancement), `JOURNAL_ERREURS.md` (incidents).

## Règles impératives

1. **Une livraison n'est terminée que lorsque la documentation concernée est à jour.** Toute modification de fonctionnalité met à jour `APP_SPEC.md` et `FEATURE_BACKLOG.md` ; toute modification de données, `DATA_DICTIONARY.md` ; tout service ajouté, `INTEGRATIONS.md` ; tout incident, `JOURNAL_ERREURS.md`.
2. **Données de santé : option B demandée par Manon le 2026-10-26, limitée au prototype.** Seuls le semainier partagé (repas notés, semainier proposé, réponses de Manon) et la rubrique Évolution (poids facultatif, tours, ressentis) en contiennent. Aucune mise en ligne de ces rubriques sans hébergeur certifié HDS, AIPD et consentement explicite : décision et contrats de Manon, pas de Claude. Toujours exclus : bilan, note médicale, messagerie intégrée (le contact passe par WhatsApp). Un programme porte un nom d'objectif (« Énergie »), jamais un nom de pathologie.
3. **Pas d'inscription libre.** Seule Manon crée les comptes (invitation par email).
4. **Aucune allégation thérapeutique.** « Adapté à », « en complément de votre suivi médical » ; jamais « soigne », « guérit », « brûle-graisse ».
5. **Aucun faux contenu présenté comme réel** : pas d'avis client inventé, pas de diplôme inventé. Les emplacements à remplir restent visibles `[entre crochets]`.
6. **Secrets** : jamais de valeur de clé dans le dépôt, les docs ou les messages. Noms de variables seulement (`INTEGRATIONS.md`). `.env*` est ignoré par git.
7. **Design** : utiliser uniquement les tokens de `BRAND_BRIEF.md` (couleurs, polices, rayons). Pas de nouvelle couleur, police ou ombre sans mise à jour du brief. Respecter la liste « À ne jamais faire » du brief.
8. **Accessibilité** : contraste AA, cibles tactiles ≥ 44 px, focus visible, `prefers-reduced-motion` respecté, chaque champ a un `id` et un `label`.
9. **Langue** : interface et docs en français ; vouvoiement côté patiente ; écriture simple, phrases courtes.
10. **Vérifier avant de livrer** : `npm run check` doit afficher `NO ERRORS` et une largeur mobile de 390 px.

## Architecture

### Actuelle (phase 1 : prototype)
- `site/index.html` : **site public v4** (accueil seul), direction v6 « GM Sport et Nutrition » (`BRAND_BRIEF.md`) : dominante blanche (v6.1) : `--blanc` #FFFFFF, `--vert`/`--nuit` #18694B (vert du logo), `--ink` #0F3A2A (vert foncé), `--brume` et `--tilleul` (verts clairs) ; polices Poppins et Bellefair ; logo `img/logo.png` dans le héros et la capsule, `img/logoclair.png` sur fond vert. Surcharges dans le bloc « Surcharges v6.1 » en fin de feuille. Plus d'écran de chargement (retiré le 2026-10-27) : `body.ready` est posé au démarrage, puis `heroIntro()`. Un seul fichier ; bibliothèques par CDN à versions figées : three.js 0.160 (module jsDelivr), GSAP 3.12.5 + ScrollTrigger (cdnjs), Lenis 1.1.13 (jsDelivr). Photos provisoires dans `site/img/` (crédits : `site/img/CREDITS.md`). Blocs du script : photos et lien Doctolib (`IMG`, `DOCTOLIB`), défilement doux, scène WebGL des fruits (`initGL` : textures peintes au canvas `T`, matières physiques `M`, géométries `G`, composition `FRUITS`, physique `step()` à sous-pas, qualité adaptative `degrade()`), chargement puis entrée (`heroIntro`), animations au défilement, lignes topographiques (`drawTopo`, carrés marchants sur un bruit de Perlin), révélation au pointeur, formules (`PLANS`, `renderPlans`), curseur et aperçu du journal.
- `prototype/index.html` : prototype cliquable à trois vues, en un seul fichier (HTML, CSS, JS vanilla), palette v6 (anciens noms de tokens v3, nouvelles valeurs). La vue « Site public » affiche `site/index.html` dans un cadre (`siteFrame()`, `SITE_URL`) ; le bouton « Mon espace » du site envoie `postMessage({ garrym: "login" })` et le prototype ouvre sa page de connexion. Espace patiente, back-office et page de connexion (`loginPage()`) dessinés ici, habillés comme le site par la couche « Harmonisation » en fin de feuille (fond `--topo` peint par `paintTopo()`) et animés par `animateView()` à chaque rendu (rideau, titres par mots, entrées, compteurs, curseur `.pcur`). L'**espace patiente** est une application mobile sombre à la TSE (`patient()`, `body.v-patient`, classes `.m*`) : onglets `MTABS` (Aujourd'hui `mHome`, Training `mTraining`, Nutrition `mNutrition`, Évolution `mEvolution`), sous-pages par `S.ptSub` (`mRecettes`, `mVideos`, `mSemainier`, `mProposer`, `mSeances`, `mProfil`), données `MEALLOG` (repas notés), `PROPOSALS` (semainiers proposés), `PROGRESS` (mesures), `SHOW_WEIGHT` ; images par `ASSET(nom)` (`window.ASSETS` dans le fichier autonome, sinon `../site/img/`). Back-office : « Suivi des repas » (`adSuivi()`, `suiviModal()`, `reviewModal()`) ; sur téléphone (≤ 860 px), barre d'onglets en bas (`adTabbar()` : Accueil, Patientes, Suivi, Plus), panneau « Plus » (`adMoreSheet()`) et tableaux affichés en cartes (`labelTables()` recopie les en-têtes dans `data-label`). Thèmes fixes, indépendants du mode sombre de l'appareil. Le code de l'ancien site v3 subsiste mais n'est plus affiché. Données fictives en mémoire, rien n'est enregistré.
- Le bandeau « Prototype » bascule entre les trois vues et la formule de la patiente démo. Sa ligne « Affichage » choisit **Téléphone** (390 px) ou **Ordinateur** (1 280 px) pour chaque vue (`S.device`). Si la largeur réelle de l'écran ne correspond pas (`framed()`), le prototype se recharge lui-même dans un cadre `#devframe` : `loadDev()` écrit un `srcdoc` avec la feuille de style, le script (`SELF_SRC`) et `window.EMBED` (vue, page, formule) ; l'instance intégrée n'a pas de bandeau, reprend `SITE_HTML`/`ASSETS` du parent et lui renvoie sa page (`postMessage({ garrym: "state" })`) pour que le bandeau suive. Sur ordinateur, l'espace patiente a une barre latérale et un accueil en deux colonnes (`.mcols`, bloc « Espace patiente sur ordinateur » en fin de feuille).
- `prototype/archive/` : versions précédentes, pour comparaison.

Organisation du script dans `index.html` :
| Bloc | Rôle |
| --- | --- |
| `DONNÉES FICTIVES` | `PLANS`, `FEATURES`, `ACCESS` (matrice formule × fonctionnalité), `RECIPES`, `VIDEOS`, `NUTRI_TEMPLATES`, `SPORT_TEMPLATES`, `ARTICLES`, `DOCUMENTS`, `PATIENTS`, `SESSIONS` |
| `ÉTAT` | objet `S` : vue, page courante, filtres, favoris, liste de courses |
| `FORMES DÉCOUPÉES` | `SH.*` : illustrations au trait (olivier, algue, citron, galet, étoile, feuille, baies, vague) ; `art()` et `artBox()` composent les visuels des recettes en attendant les photos |
| `SITE PUBLIC` / `ESPACE PATIENTE` / `BACK-OFFICE` | une fonction par écran, qui renvoie du HTML. Site : `siteNav()`, `siteHome()` et ses blocs (`themesSlider()`, `weekSection()`, `pricing()`), `footer()`. `ph(label, ton, illustration)` dessine un emplacement photo à remplacer par une vraie image |
| `ACTIONS` | `A` (clics `data-act`), `CHANGE` (`data-change`), `INPUT` (`data-input`), `FORMS` (`data-form`) |

L'accès à une fonctionnalité passe toujours par `can(featureKey)`, qui lit `ACCESS`. Ne jamais tester une formule en dur (`plan === "f3"`).

### Cible (phase 3, proposée, à valider)
- **Front** : Next.js (App Router) + TypeScript, déployé sur Vercel (offre Pro, l'offre Hobby interdit l'usage commercial).
- **Données et auth** : Supabase, région UE, Postgres + Row Level Security (voir `DATA_DICTIONARY.md`), invitations par email via Supabase Auth.
- **Emails** : Resend ou Brevo. **Vidéos** : Bunny Stream ou Vimeo. **Polices** : auto-hébergées (`next/font`), pas d'appel à Google Fonts en production.
- La matrice `ACCESS` devient la table `plan_features`, et `can()` devient la fonction SQL `has_feature()`.

## Commandes utiles

```bash
# Ouvrir le prototype
open prototype/index.html            # macOS ; sinon double-clic sur le fichier

# Vérifier le prototype (parcours automatisé, erreurs JS, débordement mobile)
npm install                          # une fois (installe Playwright)
npm run check                        # trois vues (site dans le cadre, connexion, patiente, admin), puis aperçus Téléphone sur PC et Ordinateur sur téléphone (captures 7-*, 8-*) ; attendu : "mobile scrollWidth 390" puis "NO ERRORS"
npm run check:site                   # site v4 : WebGL, erreurs JS, 390 px, captures tools/shots/site-*.png ; attendu "NO ERRORS"

# Fichier HTML unique et autonome (trois vues + site intégré, photos en data URI)
npm run build:standalone             # produit dist/garrym-prototype.html (ignoré par git), à envoyer tel quel
npm run check:standalone             # même parcours que npm run check, sur ce fichier

# Brief fonctionnel en PDF (source : references/brief-fonctionnalites.html, à mettre à jour avec APP_SPEC.md)
npm run build:brief                  # produit dist/Brief-fonctionnel-Garrym.pdf

# Publier l'aperçu en ligne (page privée claude.ai, lisible sur téléphone)
node tools/build-artifact.mjs        # produit dist/prototype-garrym.html (ignoré par git)
# puis republier ce fichier avec l'outil Artifact sur la même URL, en joignant le site (option files) :
# "site/index.html" → site/index.html et "site/img/xxx.jpg" → site/img/xxx.jpg
# https://claude.ai/artifact/TFtcKDNYB3zCkUfyoQKbPz
npm run build:standalone && node tools/build-artifact.mjs standalone
# produit dist/garrym-trois-espaces.html (trois espaces, site et photos intégrés, aucun fichier joint) ; republier sur :
# https://claude.ai/artifact/GaowBpyDd9xSvNujvoimSo  (lien partagé par Romain, « toute personne disposant du lien »)
```

Après chaque livraison visuelle : republier l'aperçu et envoyer des captures (`tools/shots/`), Romain consulte depuis l'application mobile.

## Pièges connus

- **Délégation de clic** : l'overlay des modales porte `data-act="overlay"`. Il est traité à part et ne doit jamais appeler `preventDefault`, sinon cases à cocher et boutons d'envoi ne marchent plus dans les modales (voir journal, incident 2).
- **Injection d'attributs par `replace`** : ne jamais faire `html.replace("<div", '<div style="…"')` sur un élément qui a déjà un `style` (le second attribut est ignoré). Passer un paramètre (`artBox(seed, meal, extra)`).
- **Cascade CSS** : les media queries qui surchargent une règle vont dans le bloc « Surcharges responsives » en fin de feuille, jamais avant la règle de base (incidents 4 et 13).
- **État initial `S`** : ne référencer que des constantes déjà déclarées (incident 14).
- **Références visuelles** : reprendre la structure de page, pas seulement la palette (incident 12).
- **View Transitions** : une capture d'écran prise moins de 400 ms après un changement de page montre l'animation en cours, pas la page. Attendre avant de capturer.
- **Animations au défilement** (`animation-timeline: view()`) : l'état de départ reste lisible (opacité ≥ 0,5). Ne jamais partir d'une opacité nulle.
- **Doctolib** : aucune API publique. Le domaine n'est pas joignable depuis certains environnements cloud ; demander une capture plutôt que deviner.
- **Direction artistique d'après un site** : toujours le voir rendu et mesurer les styles calculés ; ne jamais déduire une palette de codes hex seuls (journal, incident 10).
- **Sites de référence (Awwwards…)** : souvent bloqués par le réseau de l'environnement cloud. Ne rien inventer de leur direction artistique ; passer par la recherche web, des captures, ou l'ajout du domaine aux domaines autorisés.
- **Renommage** : après un renommage de classe ou de token, `grep -rn "ancien_nom" .`, tests compris.
- **GitHub depuis une session cloud** : vérifier `gh auth status` avant toute création de dépôt.
- **GSAP et transformations** : ne jamais animer avec GSAP (`x`, `y`, `scale`) un élément déjà positionné par `transform` (barre centrée en `translateX(-50%)`) ; passer par une classe CSS ou animer un enfant (incident 22).
- **WebGL en test** : Chromium lancé à la main en headless n'a pas de WebGL. Lancer Playwright avec `--use-angle=swiftshader --enable-unsafe-swiftshader` ; en root, un Chromium manuel exige `--no-sandbox` (incidents 17, 19).
- **Réseau depuis Node** : `fetch` ignore le proxy de la session ; lancer avec `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt` (incident 20).
- **Photos libres** : Unsplash et Pexels bloquent les robots ; passer par l'API Wikimedia Commons, lire la licence, créditer dans `site/img/CREDITS.md` (incident 21).
- **`pkill -f`** : jamais avec un motif présent dans sa propre commande, il tue le shell (incident 18).
- **Analyse de sites de référence** : REA (`npx -y rea-agents@6.7.0 inspect-web-page <cdp> <target>`) pour la preuve, captures Playwright pour le rendu. Ne reprendre que les techniques et compositions, jamais le code, les images, les modèles 3D ni les polices payantes.
- **Simulation** : toute physique suit le temps réel en sous-pas et protège les divisions par l'intervalle de temps (incidents 23, 24). Le navigateur de test rend la 3D à moins d'une image par seconde : attendre longtemps avant de capturer.
- **Site dans le cadre du prototype** : chemins relatifs à `site/` ; à la publication, joindre `site/index.html` et `site/img/*` au prototype (voir Commandes).
- **`String.replace` avec une chaîne de remplacement** : `$$`, `$&`, `$1` y sont des motifs. Pour injecter du code ou du HTML, passer une fonction (`s.replace(x, () => code)`) (incident 26).
- **Masques de texte** : un titre animé derrière `overflow:hidden` coupe les accents des capitales ; garder une marge haute (incident 28).
- **Mode sombre de l'appareil** : capturer aussi avec `colorScheme: "dark"` ; le prototype et le site ont des fonds fixes (incident 27).
- **Classes du prototype** : le CSS de l'ancien site v3 est toujours dans la feuille ; `grep` un nom de classe avant de le réutiliser (`.circles`, `.fan` ont cassé l'application, incident 29). `.mcard` impose `display:block` : mettre la mise en ligne flex en style local.
- **Image dans une barre flexible** : `flex:none`, sinon elle s'écrase (incident 30).
- **Chemins dans un `srcdoc`** : `location.pathname` y vaut `srcdoc` ; calculer les chemins relatifs avec `new URL(document.baseURI).pathname` (incident 31).
- **`order` et grille** : un bloc à `order` en ligne garde cet ordre dans une grille ; le forcer dans la media query (`order:-1!important`) (incident 32).
- **Copyright des références** : le dépôt `justinhartman/ui-ux-design-library` contient des livres sous droits. Ne pas les copier ici ; lien seulement.
