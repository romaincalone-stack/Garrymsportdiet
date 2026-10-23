# CLAUDE.md : instructions permanentes

## Le concept

Plateforme de **Manon Garrione**, diététicienne-nutritionniste et coach sportive (Hyères, La Garde, visio). Marque de travail : **Garrym · Sport Diet** (Instagram `@garrymsportdiet`, nom à confirmer).

Trois briques :
1. **Site public** : présentation, formules, thématiques, journal, cabinets. Objectif unique : faire réserver un bilan sur Doctolib.
2. **Espace patiente** : contenu débloqué selon la formule (Suivi simple, F1 Nutrition, F2 + Recettes, F3 + Sport).
3. **Back-office** : Manon crée les comptes, attribue les formules, publie recettes, vidéos, articles, programmes et séances.

Doctolib reste l'unique outil de prise de rendez-vous. La plateforme ne prend aucun rendez-vous et ne s'y connecte pas.

Documents de référence : `APP_SPEC.md` (produit), `BRAND_BRIEF.md` (identité), `DATA_DICTIONARY.md` (données), `INTEGRATIONS.md` (services), `FEATURE_BACKLOG.md` (avancement), `JOURNAL_ERREURS.md` (incidents).

## Règles impératives

1. **Une livraison n'est terminée que lorsque la documentation concernée est à jour.** Toute modification de fonctionnalité met à jour `APP_SPEC.md` et `FEATURE_BACKLOG.md` ; toute modification de données, `DATA_DICTIONARY.md` ; tout service ajouté, `INTEGRATIONS.md` ; tout incident, `JOURNAL_ERREURS.md`.
2. **Option A : aucune donnée de santé.** Pas de poids, mensurations, journal alimentaire, bilan, note médicale ni messagerie intégrée. Le contact passe par WhatsApp. Un programme porte un nom d'objectif (« Énergie »), jamais un nom de pathologie. Passer à l'option B impose un hébergeur certifié HDS : décision de Manon, pas de Claude.
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
- `site/index.html` : **site public v4** (accueil seul), palette « Calanque et citron » (`BRAND_BRIEF.md` v5.0-B). Un seul fichier ; bibliothèques par CDN à versions figées : three.js 0.160 (module jsDelivr), GSAP 3.12.5 + ScrollTrigger (cdnjs), Lenis 1.1.13 (jsDelivr). Photos provisoires dans `site/img/` (crédits : `site/img/CREDITS.md`). Blocs du script : photos et lien Doctolib (`IMG`, `DOCTOLIB`), défilement doux, scène WebGL des fruits (`initGL` : textures peintes au canvas `T`, matières physiques `M`, géométries `G`, composition `FRUITS`, physique `step()` à sous-pas, qualité adaptative `degrade()`), chargement puis entrée (`heroIntro`), animations au défilement, lignes topographiques (`drawTopo`, carrés marchants sur un bruit de Perlin), révélation au pointeur, formules (`PLANS`, `renderPlans`), curseur et aperçu du journal.
- `prototype/index.html` : prototype cliquable à trois vues, en un seul fichier (HTML, CSS, JS vanilla), palette v5-B. La vue « Site public » affiche `site/index.html` dans un cadre (`siteFrame()`, `SITE_URL`) ; le bouton « Mon espace » du site envoie `postMessage({ garrym: "login" })` et le prototype ouvre sa page de connexion. Espace patiente et back-office dessinés ici. Le code de l'ancien site v3 subsiste mais n'est plus affiché. Données fictives en mémoire, rien n'est enregistré.
- Le bandeau « Prototype » bascule entre les trois vues et la formule de la patiente démo.
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
npm run check                        # trois vues (site dans le cadre, connexion, patiente, admin) ; attendu : "mobile scrollWidth 390" puis "NO ERRORS"
npm run check:site                   # site v4 : WebGL, erreurs JS, 390 px, captures tools/shots/site-*.png ; attendu "NO ERRORS"

# Publier l'aperçu en ligne (page privée claude.ai, lisible sur téléphone)
node tools/build-artifact.mjs        # produit dist/prototype-garrym.html (ignoré par git)
# puis republier ce fichier avec l'outil Artifact sur la même URL, en joignant le site (option files) :
# "site/index.html" → site/index.html et "site/img/xxx.jpg" → site/img/xxx.jpg
# https://claude.ai/artifact/TFtcKDNYB3zCkUfyoQKbPz
node tools/build-artifact.mjs site   # produit dist/site-garrym.html ; republier avec les images
# (option files de l'outil Artifact : "img/xxx.jpg" → site/img/xxx.jpg) sur :
# https://claude.ai/artifact/GaowBpyDd9xSvNujvoimSo
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
- **Copyright des références** : le dépôt `justinhartman/ui-ux-design-library` contient des livres sous droits. Ne pas les copier ici ; lien seulement.
