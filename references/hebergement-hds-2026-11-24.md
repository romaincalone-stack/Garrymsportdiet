# Hébergement certifié HDS de l'espace patiente : comparatif et demandes de devis

Relevé du **2026-11-24**. Besoin : une application Node.js 22 (Next.js 16, `npm ci && npm run build`, `npm start`, port dans `PORT`) et une base PostgreSQL gérée, pour 100 à 200 patientes et très peu de trafic (`espace/README.md`, « Mise en ligne »). Le développeur ne fait que déployer le code : l'hébergeur doit administrer serveurs, système, base et sauvegardes (`INTEGRATIONS.md`, ligne « Plateforme gérée certifiée HDS »).

Ce document est une recherche, pas un avis juridique. Rien n'a été envoyé ni souscrit. Prix hors taxes (HT) sauf mention ; TTC = HT × 1,2, pertinent si l'activité de Manon n'est pas assujettie à la TVA (à vérifier avec son comptable).

---

## 1. Ce que dit le cadre HDS (et ce que cela implique pour un PaaS)

- **Liste officielle** : [esante.gouv.fr, Liste des hébergeurs certifiés](https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies). La page est protégée contre les robots (Incapsula) ; elle a été lue avec un navigateur automatisé le 2026-11-24 : **428 lignes**, colonnes « Activités HDS couvertes », « Version », « Garanties », « Organisme certificateur ». Elle ne donne **pas** de dates de certificat : les dates ci-dessous viennent des hébergeurs.
- **Les 6 activités** (même page, filtre) : 1 sites physiques, 2 infrastructure matérielle, 3 infrastructure virtuelle, 4 plateforme d'hébergement d'applications, 5 administration et exploitation, 6 sauvegarde.
- **Règle clé (ANS, session du 07/10/2026)** : « Pour chacune des activités, il convient d'identifier quel(s) acteur(s) la réalise(nt). Chaque acteur identifié doit être certifié pour la(es) activité(s) qu'il réalise. » Côté client : vérifier que le certificat est valide et que « les prestations réalisées sont dans le périmètre du certificat » ; stockage obligatoirement dans l'EEE. Source : [ANS, « Hébergement des données de santé : cadre applicable et évolutions », 07/10/2026 (PDF)](https://esante.gouv.fr/sites/default/files/media/document/20261007_ANS_SessionCollective_HDS%20v1.0.pdf), diapositives 6 et 18.
- **« Infrastructure physique » / « infogéreur »** : cette distinction en deux groupes d'activités venait du référentiel de 2018 ; « la révision 2024 du référentiel a supprimé la distinction qui existait entre deux groupes d'activités » ([Squire Patton Boggs, La Revue](https://larevue.squirepattonboggs.com/certification-des-hebergeurs-de-donnees-de-sante-hds-date-limite-pour-la-mise-en-conformite-selon-le-nouveau-referentiel.html)). Le référentiel v2.0 (arrêté du 26 avril 2024) s'applique aux nouvelles certifications depuis novembre 2024 ; les certificats v1.1 ne sont plus valides depuis le 16/05/2026 ([même source](https://larevue.squirepattonboggs.com/certification-des-hebergeurs-de-donnees-de-sante-hds-date-limite-pour-la-mise-en-conformite-selon-le-nouveau-referentiel.html) ; [ANS, webinaire du 18/03/2026](https://esante.gouv.fr/sites/default/files/media/document/20260318%20Webinaire%20HDS%20-%20v1.0_0.pdf), PDF non relu en entier depuis la session). On raisonne donc **activité par activité**, plus par « type d'hébergeur ».
- **Activité 5** : l'ANS la définit comme la maîtrise des interventions sur les ressources mises à disposition, activités annexes comprises ([ANS, webinaire HDS du 15/10/2025](https://industriels.esante.gouv.fr/sites/default/files/media/document/Webinaire-HDS_20251015_vf.pdf) ; PDF **inaccessible depuis la session**, contenu connu seulement par l'extrait du moteur de recherche, confiance moyenne).
- **Conséquence pour un PaaS** : il faut un hébergeur certifié **1 à 6** qui opère lui-même système, exécution, base et sauvegardes. Un IaaS (machine virtuelle à administrer), un Kubernetes géré ou un hyperscaler où le client configure réseau, droits et sauvegardes laisse une part de l'activité 5 au client ou à son prestataire. **Point ouvert à faire confirmer par écrit** : le développeur qui garde un accès à la console de la base de production intervient-il au titre de l'activité 5 ? Scalingo écrit d'ailleurs que « only a health professional is authorized to access the Personal Health Data » ([annexe HDS Scalingo](https://scalingo.com/gtc-appendix-health-data-hosting)). Prudence : le développeur ne garde pas d'accès courant aux données de production ; Manon est le contact « professionnel de santé ».
- **À venir** : référentiel v2.1 (loi SREN), publication au JO prévue en décembre 2026, applicable aux audits à partir de mars 2027 ; « à partir de mars 2027, les contrats devront comporter de nouvelles mentions » ([ANS, 07/10/2026, diapositive 20](https://esante.gouv.fr/sites/default/files/media/document/20261007_ANS_SessionCollective_HDS%20v1.0.pdf)).

---

## 2. Tableau comparatif

Activités : telles qu'affichées sur la liste ANS le 2026-11-24 (toutes en version **V2.0**). Prix : plus petite configuration plausible pour Next.js 16 + PostgreSQL avec sauvegardes, **par mois (30 jours), HT**, relevés le 2026-11-24.

| Hébergeur | Activités (liste ANS) | Certificat (source hébergeur) | PaaS Node.js géré dans le périmètre | PostgreSQL géré dans le périmètre | Démarche HDS | Plus petite config HDS, HT/mois | Gratuit / crédits | Données | Simplicité |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Scalingo** | 1, 2, 3, 4, 5, 6 | n° 38436, BYCYB (ex-LNE), renouvelé le 12/09/2025 en HDS 2.0, valide jusqu'au 11/09/2028 ([doc](https://doc.scalingo.com/compliance/hds)) | Oui : option HDS à la création de l'application, **au moins 2 conteneurs web** ([doc](https://doc.scalingo.com/platform/hds)) | Oui, plans **Business** (2 nœuds) seulement : `hds_available: true` ([API osc-fr1](https://api.osc-fr1.scalingo.com/v1/addon_providers/postgresql)) | Case à cocher à l'inscription ; annexe HDS des CGS acceptée « as a whole » ([page santé](https://scalingo.com/health-sector), [annexe](https://scalingo.com/gtc-appendix-health-data-hosting)) ; aucun support payant exigé dans les pages lues ([plans de support](https://scalingo.com/support-plans)) | **48,80 €** (2 × M 512 Mo à 14,40 € + Business 512M à 20,00 €) ; variante 2 × S 256 Mo : **34,40 €** (mémoire juste pour Next.js) ([API tailles](https://api.osc-fr1.scalingo.com/v1/features/container_sizes), [API PostgreSQL](https://api.osc-fr1.scalingo.com/v1/addon_providers/postgresql)) | Essai 30 jours, 1 application, base au plus petit plan ([doc](https://doc.scalingo.com/platform/getting-started/free-trial)) ; le plan Business porte `trial_available: false` : **pas d'HDS gratuit** | France, Paris, région osc-fr1 sur 3DS Outscale ([datacenters](https://scalingo.com/datacenters), [régions](https://doc.scalingo.com/platform/internals/regions)) ; sous-traitant Outscale certifié ([annexe](https://scalingo.com/gtc-appendix-health-data-hosting)) | Très bonne (`git push`, base gérée, sauvegardes et PITR inclus) |
| **Clever Cloud** | 1, 2, 3, 4, 5, 6 | n° FR094504, Bureau Veritas, émis le 20/12/2024, valide jusqu'au 19/12/2027, HDS v2 ([page HDS](https://www.clever.cloud/health-data-hosting/)) | Oui : « a scope, not isolated products » ; runtimes JavaScript cités ([page HDS](https://www.clever.cloud/health-data-hosting/)) | Oui, PostgreSQL cité ([page HDS](https://www.clever.cloud/health-data-hosting/)) | Zone HDS (`parhds`, `grahds`, `rbxhds`) **et contrat HDS spécifique**, après échange avec un Account Manager ([changelog](https://www.clever.cloud/developers/changelog/2025/03-19-paris-hds/), [zones](https://api.clever-cloud.com/v4/products/zones)) ; minimum ou support exigé : **non publié** | Prix catalogue zone `parhds` : **21,25 €** (Node.js XS 1 Go à 16,00 € + PostgreSQL XXS Small 512 Mo / 1 Go à 5,25 €, sauvegarde quotidienne, 7 conservées) ; variante nano : **11,25 €** ([grille parhds](https://api.clever-cloud.com/v4/billing/price-system?zone_id=parhds&currency=EUR), [plans PostgreSQL](https://api.clever-cloud.com/v2/products/addonproviders)) ; **coût du contrat HDS inconnu** (« more expensive than standard hosting », [page HDS](https://www.clever.cloud/health-data-hosting/)) | Crédits à l'inscription sans carte, montant non publié (≈ 20 € selon un tiers, [agentdeals](https://agentdeals.dev/vendor/clever-cloud)) ; programme UP jusqu'à 10 000 € la 1re année, HDS non mentionné ([UP](https://www.clever.cloud/up-program/)) | France : Paris (TH2, nLighten), Gravelines et Roubaix (OVH HDS) ([page HDS](https://www.clever.cloud/health-data-hosting/)) | Très bonne (`git push`) ; construire sur une instance de build dédiée (M) pour Next.js ([guide Nuxt](https://nuxt.com/deploy/clever-cloud)) |
| **Microsoft Azure** (App Service + PostgreSQL Flexible) | **1, 2, 3, 4, 6** (pas 5 sur la liste ANS ; la page Microsoft annonce pourtant les six) | HDS v2.0 par Schellman, « émis en octobre 2025 » ([Microsoft Learn](https://learn.microsoft.com/fr-fr/compliance/regulatory/offering-hds-france)) | Services ISO 27001 en France Centre (App Service le serait ; liste non relue) | Idem | Conditions contractuelles HDS à conclure via « leur point de contact de licence Microsoft » ([Microsoft Learn](https://learn.microsoft.com/fr-fr/compliance/regulatory/offering-hds-france)) : parcours flou pour un petit compte | **≈ 28,13 €** : App Service B1 Linux 0,0162 €/h (11,83 €) + PostgreSQL B1MS 0,0171 €/h (12,48 €) + 32 Go à 0,1194 € (3,82 €) ([API des prix Azure](https://prices.azure.com/api/retail/prices)) | Compte gratuit : PostgreSQL B1MS + 32 Go gratuits **12 mois** ([Microsoft Learn](https://learn.microsoft.com/azure/postgresql/flexible-server/how-to-deploy-on-azure-free-account)) ; App Service F1 gratuit sans limite de durée mais sans « Always On » ni montée en charge ([Tech Community](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/general-availability-free-hosting-plan-for-WordPress-on-app/ba-p/4114613)) | France Centre (EEE) | Moyenne (portail complexe, réseau et droits à configurer) ; société américaine (Cloud Act) |
| **AWS** (ECS Express Mode / Fargate + RDS) | 1, 2, 3, 4, 5, 6 | HDSv2 obtenue le 21/04/2026 ; Paris éligible aux activités 1 à 6 ([AWS HDS](https://aws.amazon.com/fr/compliance/hds/)) | Services du périmètre ISO 27001 ; App Runner **fermé aux nouveaux clients depuis le 30/04/2026** ([AWS](https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html)) | RDS (périmètre ISO, liste non relue) | Avenant HDS cité (section 12), parcours d'acceptation non trouvé ([FAQ AWS HDS](https://aws.amazon.com/compliance/agence-francaise-de-la-sante-numerique-hds/)) | RDS PostgreSQL db.t4g.micro Paris : 0,018 $/h (≈ 13,14 $) ([grille AWS](https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/rds/USD/current/rds-postgresql-ondemand.json)) + calcul Fargate + répartiteur de charge **non relevés** : total estimé 40 à 50 $ (confiance faible) | Nouveaux comptes : jusqu'à 200 $ de crédits, plan gratuit jusqu'à 6 mois ([FAQ Free Tier](https://aws.amazon.com/free/faqs/)) ; applicabilité à l'avenant HDS non vérifiée | Paris (EEE) | Faible pour un non-administrateur (réseau, IAM, sauvegardes à configurer : part d'activité 5 côté client probable) ; Cloud Act |
| **Google Cloud** (Cloud Run + Cloud SQL) | **1, 2, 3, 4, 5** (pas 6) | HDS v2.0 ; « L'activité 6 n'est pas incluse » ([Google Cloud HDS](https://cloud.google.com/security/compliance/hds?hl=fr)) | Cloud Run (activités 1 à 5) ([même page](https://cloud.google.com/security/compliance/hds?hl=fr)) | Cloud SQL (activités 1 à 5) | Avenant HDS via « votre conseiller commercial Google Cloud » ([même page](https://cloud.google.com/security/compliance/hds?hl=fr)) | Cloud SQL db-f1-micro Paris ≈ 9 $/mois (source tierce, [Bytebase](https://www.bytebase.com/dbcost/cloudsql/instance/db-f1-micro/)) + stockage ; Cloud Run souvent dans la gratuité | 300 $ de crédits pendant 90 jours ([Google](https://cloud.google.com/signup-faqs?hl=en)) | Paris possible (EEE) | Moyenne ; activité 6 non couverte ; Cloud Act |
| **OVHcloud** | 1, 2, 3, 4, 5, 6 | Liste ANS : V2.0 ; la doc OVHcloud (mise à jour le 2026-06-02) affiche encore « HDS v2018 » ([doc](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/hds-certification)) : incohérence à faire lever | Web PaaS arrêté (fin de vente 01/10/2024, coupure 31/01/2025, [communauté OVHcloud](https://community.ovhcloud.com/t/end-of-life-eol-web-paas/3526)) ; restent Managed Containers (Kubernetes) et Web Hosting ([doc](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/hds-certification)) | « Managed Relational Database » : oui ; base de l'hébergement web : non ([doc](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/hds-certification)) | **Support Business ou Enterprise obligatoire** + « OVHcloud Healthcare Addendum » ([page HDS](https://www.ovhcloud.com/fr/enterprise/certification-conformity/hds/)) | Support Business seul : **à partir de 250 € HT/mois** (10 % de la facture, minimum 250 €) ([plans de support](https://www.ovhcloud.com/fr/support-levels/plans/)) + services : **≥ 270 €** | Sans objet | France | Faible (Kubernetes) ; **écarté (prix)** |
| **Scaleway** | **1, 2, 3, 4** | Certificat BSI HDS 809731, du 28/06/2024 au 27/06/2027 : Instances, stockage, VPC, Load Balancer, IAM (selon l'annuaire BSI, extrait du moteur de recherche) | Non (Serverless Containers absent du périmètre publié) | Non (Managed Database absent du périmètre publié) | Support Business ou Enterprise + contrat via l'équipe commerciale (extraits de [la page HDS](https://www.scaleway.com/fr/security-and-resilience/hds/), **page inaccessible depuis la session, erreur 403**) | Support Business : **250 € HT/mois minimum** ([Scaleway support](https://www.scaleway.com/en/support/)) | Sans objet | France | **Écarté** (pas d'activité 5, IaaS seulement) |
| **3DS Outscale** | **1, 2, 3, 4** | Liste ANS ; n° 36741-4 cité par Scalingo ([annexe Scalingo](https://scalingo.com/gtc-appendix-health-data-hosting)) | Non (IaaS) | Non | Commercial | Non relevé | — | France | **Écarté** (IaaS ; c'est l'infrastructure de Scalingo) |
| **Infogérants HDS français** (ex. Webaxys, Hopla, Kitry, Ozitem, AZNetwork : 1 à 6 sur la liste ANS) | 1 à 6 | Liste ANS | Sur mesure | Sur mesure | Contrat d'infogérance | **Sur devis, non publié** | — | France | Bonne, mais pas de prix public ; utile seulement si les PaaS refusent |

Non trouvés sur la liste ANS (donc non utilisables pour des données de santé) : Alwaysdata, Infomaniak, Upsun/Platform.sh, Koyeb, Render, Railway, Fly.io, Vercel, Supabase, Hostinger, o2switch, IONOS (recherche par nom dans les 428 lignes relevées).

---

## 3. Existe-t-il une solution gratuite et conforme ?

**Non, pas durablement.** Aucun hébergeur certifié 1 à 6 n'offre de palier gratuit couvrant l'HDS.

- **Scalingo** : l'essai de 30 jours n'inclut pas le plan PostgreSQL Business (`trial_available: false`, [API](https://api.osc-fr1.scalingo.com/v1/addon_providers/postgresql)), seul plan éligible HDS ; et « at the end of your free trial, activating this certification will automatically incur additional costs » ([page santé](https://scalingo.com/health-sector)). Utilisable gratuitement pour tester avec des **données fictives**, pas pour de vraies patientes.
- **Clever Cloud** : les crédits d'inscription sont faibles et le contrat HDS passe par un commercial ; leur application à la zone HDS est à demander.
- **Azure** : le plus proche du « gratuit » (base gratuite 12 mois, App Service F1 gratuit, soit 0 à 12 € HT/mois la première année), mais l'activité 5 n'apparaît pas sur la liste ANS pour Microsoft, le contrat HDS passe par un interlocuteur « licences », et F1 est très limité. **Non recommandé** pour un développeur qui ne veut rien administrer.
- **AWS / Google** : crédits temporaires (200 $ sur 6 mois, 300 $ sur 90 jours) ; configuration lourde ; Google ne couvre pas l'activité 6.

**La moins chère, conforme et sans administration** : Clever Cloud au prix catalogue (**≈ 21 € HT/mois**, ≈ 25,50 € TTC), **si** le contrat HDS n'ajoute ni minimum ni support payant (inconnu). **La moins chère au prix publié et garanti** : Scalingo (**48,80 € HT/mois**, ≈ 58,56 € TTC ; 34,40 € HT avec deux petits conteneurs si la mémoire suffit).

Note pratique : avant l'arrivée de vraies patientes, le développement et les démonstrations peuvent tourner sur une offre non HDS avec des données fictives uniquement (`seed --demo`).

---

## 4. Recommandation

1. **Envoyer les deux premières demandes de devis (Clever Cloud et Scalingo) en même temps.**
2. **Première option : Clever Cloud**, zone `parhds` (Paris), Node.js XS + PostgreSQL XXS Small, construction sur instance M dédiée. Raisons : certifié 1 à 6, PaaS Node.js et PostgreSQL nommés dans le périmètre, prix catalogue le plus bas (~21 € HT), données à Paris, client santé comparable (plateforme pour diététiciennes [Madietenligne](https://www.clever.cloud/blog/testimonial/2025/05/27/how-madietenligne-simplified-its-hds-compliance-with-a-certified-paas/)). **Condition** : le devis écrit confirme l'absence de minimum de facturation et de support obligatoire, et un total sous ~30 € HT/mois.
3. **Solution de repli : Scalingo**, région osc-fr1, option HDS cochée à la création, 2 conteneurs M + PostgreSQL Business 512M : **48,80 € HT/mois**, prix public, souscription en libre-service, certificat valide jusqu'en 2028, haute disponibilité et sauvegardes 12 mois incluses. C'est l'option la plus sûre si Clever Cloud impose un forfait.
4. **Troisième piste, seulement si les deux refusent ou dépassent ~60 € HT** : AWS (Paris, 1 à 6), à condition qu'AWS confirme par écrit l'avenant HDS pour un petit compte et que la configuration ne fasse pas du développeur un acteur de l'activité 5. Sinon, un infogérant HDS français sur devis.
5. **Écartés** : OVHcloud et Scaleway (support obligatoire ≥ 250 € HT/mois ; Scaleway sans activité 5), Outscale (IaaS), Google Cloud (pas d'activité 6), Azure (activité 5 absente de la liste ANS, contrat flou).

Mettre ensuite à jour `INTEGRATIONS.md` (ligne « Plateforme gérée certifiée HDS » : coût indicatif 40 à 120 €/mois à ramener à ~20 à 60 €/mois) une fois les devis reçus : non fait ici, à la demande.

### Niveau de confiance

| Élément | Confiance | Pourquoi |
| --- | --- | --- |
| Activités certifiées (tous) | Élevée | Liste ANS lue le 2026-11-24 |
| Prix Scalingo | Élevée | API publique de prix ; seule inconnue : surcoût éventuel de l'option HDS après l'essai (la doc dit « no direct surcharge », la page santé parle de « additional costs ») |
| Périmètre Scalingo (Node.js + PostgreSQL Business) | Élevée | Doc HDS + drapeau `hds_available` |
| Prix catalogue Clever Cloud | Élevée | API publique, zone `parhds` |
| Coût réel Clever Cloud sous contrat HDS | **Faible** | Contrat sur mesure, aucun chiffre public |
| Azure, AWS, Google | Moyenne à faible | Prix de calcul relevés, mais parcours contractuel HDS et part d'activité 5 côté client non confirmés |
| Interprétation de l'activité 5 pour le développeur | Moyenne | Règle ANS claire (« chaque acteur… »), application au cas d'un développeur sans accès aux données à faire confirmer (hébergeur, juriste ou ANS) |

---

## 4 bis. Vérifications du 2026-11-25

**Prix Clever Cloud** : la grille de l'API (`zone_id=parhds`) est identique à celle de la zone standard `par` (nano 6,00 €, XS 16,00 €, PostgreSQL XXS Small 5,25 € HT par mois). Elle ne contient donc **pas** le coût de l'HDS, facturé par le contrat signé avec le commercial. Les 11,25 € et 21,25 € HT sont un **plancher**, à compléter par le devis.

**Mémoire de l'application** (`node tools/mesure-memoire.mjs`, application construite en mode production, base de démonstration, mémoire de Node plafonnée comme sur un petit ordinateur) :

| Charge | Tas Node | Pages par seconde | Erreurs | Mémoire au pic |
| --- | --- | --- | --- | --- |
| Au repos | — | — | — | 118 Mo |
| 5 connexions en continu | 200 Mo | 182 | 0 | 191 Mo |
| 5 connexions en continu | 256 Mo | 178 | 0 | 195 Mo |
| 10 connexions en continu | 256 Mo | 184 | 0 | 205 Mo |
| 30 connexions en continu | 384 Mo | 142 | 0 | 597 Mo |
| 30 connexions en continu | 256 Mo | — | plantage (mémoire) | — |

La mémoire dépend du nombre de pages servies **en même temps**, pas du nombre de patientes. Usage réel estimé : 200 patientes qui ouvrent chacune 10 pages dans la même heure font moins d'une page par seconde, soit environ 200 fois moins que l'essai à 10 connexions. Conclusion : **nano (512 Mo) suffit**, avec `NODE_OPTIONS=--max-old-space-size=256` pour que Node ne déborde pas ; pico (256 Mo) est trop juste (118 Mo au repos, environ 200 Mo en activité). Construction de l'application : sur une instance de construction plus grande, facturée seulement pendant la construction (quelques minutes).

## 5. À obtenir par écrit de l'hébergeur

1. Le certificat HDS en cours (numéro, organisme, dates, version du référentiel) et le tableau des garanties (exigence 31).
2. La confirmation que **les 6 activités** sont réalisées par l'hébergeur pour **l'application Node.js et la base PostgreSQL** proposées, sauvegardes comprises, et que le client ne fait que déployer son code.
3. Ce que le développeur peut faire sans devenir acteur de l'activité 5 (déploiement, variables d'environnement, migrations, accès console à la base).
4. Le prix mensuel total HT de la configuration minimale HDS (application + base + sauvegardes + option ou contrat HDS), et l'existence d'un **minimum de facturation**, d'un **support payant obligatoire**, de frais de mise en service ou d'un engagement de durée.
5. Lieux de stockage (France, sites), sous-traitants et leur certification, absence d'accès depuis hors EEE.
6. Sauvegardes : fréquence, durée de conservation, test de restauration, site distinct.
7. Réversibilité : export des données, délai et coût de restitution puis destruction en fin de contrat.
8. Mise à jour du contrat pour le référentiel **v2.1** (mentions obligatoires à partir de mars 2027).
9. Si des crédits d'essai ou de programme existent : s'appliquent-ils à la zone ou à l'option HDS ?
10. Le contrat est conclu au nom de Manon (responsable de traitement), avec elle comme contact « professionnel de santé ».

---

## 6. Emails de demande de devis

Aucune donnée personnelle réelle : compléter les crochets avant envoi.

### 6.1 Clever Cloud (formulaire de la [page HDS](https://www.clever.cloud/health-data-hosting/))

> **Objet : Demande de devis, hébergement HDS d'une petite application Node.js + PostgreSQL**
>
> Bonjour,
>
> Je suis diététicienne-nutritionniste libérale. Je prépare un espace patiente en ligne : environ 100 à 200 patientes, très peu de trafic. Certaines rubriques contiendront des données de santé (repas notés, poids, suivi du cycle).
>
> Configuration envisagée, en zone HDS Paris (`parhds`) :
> - une application Node.js 22 (Next.js), taille XS ou nano, construction sur instance dédiée ;
> - une base PostgreSQL gérée, plan XXS (512 Mo, 1 à 2 Go de disque), sauvegardes quotidiennes.
>
> Mon développeur déploie uniquement le code ; il n'administre ni serveur ni base.
>
> Pourriez-vous me confirmer par écrit :
> 1. que votre certificat HDS (FR094504) couvre les 6 activités pour cette application et cette base, sauvegardes comprises ;
> 2. le prix mensuel total HT, contrat HDS compris ;
> 3. s'il existe un minimum de facturation, un support payant obligatoire, des frais de mise en service ou un engagement de durée ;
> 4. les conditions de réversibilité et la mise à jour prévue du contrat pour le référentiel HDS v2.1 ;
> 5. si les crédits d'essai s'appliquent à la zone HDS.
>
> Je vous remercie par avance.
>
> [Nom et coordonnées de Manon]

### 6.2 Scalingo (formulaire commercial, lien depuis la [page santé](https://scalingo.com/health-sector))

> **Objet : Confirmation de prix, option HDS pour une application Node.js et une base PostgreSQL**
>
> Bonjour,
>
> Je suis diététicienne-nutritionniste libérale. Je prépare un espace patiente en ligne pour 100 à 200 patientes, avec très peu de trafic. Certaines rubriques contiendront des données de santé.
>
> Configuration envisagée, région osc-fr1, option HDS cochée à la création :
> - une application Node.js 22 (Next.js), 2 conteneurs M ;
> - une base PostgreSQL Business 512M.
>
> Votre grille publique donne 48,80 € HT pour 30 jours. Pourriez-vous me confirmer par écrit :
> 1. que ce total est complet, sans surcoût lié à l'activation de l'HDS après la période d'essai ;
> 2. qu'aucun plan de support payant n'est exigé pour l'HDS ;
> 3. que les 6 activités de votre certificat n° 38436 couvrent cette application et cette base, sauvegardes comprises, mon développeur ne faisant que déployer le code ;
> 4. si 2 conteneurs S suffiraient pour respecter vos exigences HDS ;
> 5. les conditions de réversibilité et la mise à jour prévue de l'annexe HDS pour le référentiel v2.1.
>
> Je vous remercie par avance.
>
> [Nom et coordonnées de Manon]

### 6.3 AWS France, équipe santé (formulaire « Contacter le service commercial » d'AWS)

> **Objet : Avenant HDS pour un petit compte, région Paris**
>
> Bonjour,
>
> Je suis diététicienne-nutritionniste libérale. Je prépare un espace patiente en ligne pour 100 à 200 patientes, avec très peu de trafic, qui contiendra des données de santé.
>
> J'envisage, en région Europe (Paris) : une application Node.js 22 en conteneur (ECS Fargate ou équivalent géré) et une base Amazon RDS for PostgreSQL (db.t4g.micro), sauvegardes automatiques activées. Mon développeur déploie uniquement le code.
>
> Pourriez-vous me préciser par écrit :
> 1. comment un compte individuel accepte l'avenant HDS, et si cela exige un plan de support payant ;
> 2. si votre certification couvre les 6 activités pour ces services, et quelles tâches de configuration (réseau, droits, sauvegardes) restent à ma charge ;
> 3. une estimation mensuelle HT de cette configuration ;
> 4. si les crédits du programme Free Tier s'appliquent à un compte sous avenant HDS.
>
> Je vous remercie par avance.
>
> [Nom et coordonnées de Manon]

---

## 7. Pages inaccessibles depuis la session

- [Scaleway, page HDS](https://www.scaleway.com/fr/security-and-resilience/hds/) : erreur 403 (protection anti-robots) ; informations reprises d'extraits du moteur de recherche.
- [ANS, webinaire HDS du 15/10/2025 (PDF)](https://industriels.esante.gouv.fr/sites/default/files/media/document/Webinaire-HDS_20251015_vf.pdf) : bloqué ; définition de l'activité 5 connue par extrait seulement.
- Microsoft Service Trust Portal (certificat et tableau des garanties) : non consulté (compte requis).
- Prix AWS Fargate et répartiteur de charge en région Paris : non relevés.
