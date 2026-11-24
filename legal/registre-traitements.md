# Registre des activités de traitement de Manon Garrione

Registre simplifié (RGPD, art. 30) · version du 2026-11-24 · à tenir à jour par Manon, responsable de traitement · **durées à valider** (`legal/AUDIT.md`, V7).

Le registre est obligatoire ici : l'exemption des structures de moins de 250 personnes ne joue pas quand le traitement porte sur des données de santé ou n'est pas occasionnel (art. 30.5). Modèle de référence : CNIL, modèle de registre simplifié ; référentiel CNIL « gestion des cabinets médicaux et paramédicaux » (2020).

## Responsable de traitement

Manon Garrione, diététicienne-nutritionniste (RPPS `[à compléter]`) et coach sportive, `[à compléter : adresse]`, `[à compléter : email]`. Délégué à la protection des données : non obligatoire pour une professionnelle libérale exerçant seule (considérant 91 ; traitement non « à grande échelle ») `[à vérifier]`.

## Sous-traitants (contrat art. 28 obligatoire pour chacun)

| Sous-traitant | Traitements | Lieu | Contrat | Statut |
| --- | --- | --- | --- | --- |
| `[Hébergeur certifié HDS]` | Espace patiente (T1 à T5, T10 à T12) | France | Contrat d'hébergement HDS + DPA | `[à signer]` |
| Brevo (Sendinblue SAS) | Emails (T4) | UE `[à vérifier]` | DPA Brevo | `[à accepter]` |
| Cloudflare, Inc. | Site, fonction d'analyse (T6, T7) | Mondial, société américaine | DPA Cloudflare `[à vérifier : DPF]` | `[à accepter]` |
| Anthropic PBC | Analyse photo (T7) | États-Unis | Conditions commerciales + DPA avec clauses types | `[à accepter, étape 5]` |
| `[Développeur / mainteneur]` | Déploiement, maintenance (tous) | France | Contrat de sous-traitance + confidentialité | `[à signer]` |
| Doctolib SAS | Agenda (T9) | France, hébergement HDS | Contrat Doctolib existant | Existant |
| `[Outil comptable]` | Facturation (T8) | `[à compléter]` | `[à compléter]` | `[à compléter]` |
| `[Paiement : Stripe ou GoCardless]` | Paiement (T13) | `[à compléter]` | `[à compléter]` | Étape 4 |
| `[Bunny Stream]` | Vidéos (T12) | UE | `[à compléter]` | Étape 3 |

## Traitements

| N° | Traitement | Personnes | Données | Finalité | Base légale (art. 6 ; art. 9 si santé) | Destinataires | Durée | Sécurité |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Comptes de l'espace patiente | Patientes | Identité, email, téléphone, statut, mot de passe chiffré, dates de connexion | Donner accès à l'espace | 6.1.b ; 9.2.h `[à valider]` | Manon ; hébergeur | Accompagnement + `[3 mois de lecture + 3 mois]`, puis suppression | HDS, HTTPS, scrypt, blocage après 5 essais |
| T2 | Offres et accès | Patientes | Offre, dates, engagement, demandes « Je suis intéressée » | Gérer l'offre et ses contenus | 6.1.b ; 9.2.h | Manon ; hébergeur | Offre : comme T1 ; demandes : 1 an | Contrôle d'accès serveur |
| T3 | Rendez-vous affiché | Patientes | Date, heure, lieu (jamais le motif) | Rappeler le prochain rendez-vous | 6.1.b ; 9.2.h | Manon ; hébergeur | 30 jours après la date | Idem |
| T4 | Emails transactionnels | Patientes, Manon | Email, prénom, lien d'invitation ou de réinitialisation | Activer le compte, changer le mot de passe, prévenir de la fin d'offre | 6.1.b | Brevo | Journaux Brevo : `[à régler au minimum]` | Aucune donnée de santé dans les emails |
| T5 | Sécurité et traçabilité | Patientes, Manon | Sessions (empreinte), journal des actions, double authentification de Manon | Sécuriser, prouver | 6.1.c (art. 32) et 6.1.f | Manon ; hébergeur | Sessions : 30 j (patiente), 12 h (Manon) ; journal : 1 an ; preuve des CGU : 5 ans après le compte | Secret TOTP chiffré, codes à usage unique |
| T6 | Site public | Visiteuses | IP, navigateur, pages (journaux techniques) | Afficher et protéger le site | 6.1.f | Cloudflare | `[à vérifier : journaux Cloudflare]` | HTTPS ; aucune donnée du test n'est envoyée |
| T7 | Mon assiette : analyse photo (étape 5) | Visiteuses | Photo de repas, précisions, empreinte d'IP | Reconnaître les aliments ; limiter les abus | 6.1.f | Cloudflare, Anthropic (États-Unis, clauses types) | Site : rien ; Anthropic : `[30 jours, à vérifier]` ; limite : 26 h | EXIF retiré dans le navigateur ; limite par jour ; plafond de dépense |
| T8 | Facturation et comptabilité | Patientes, clientes | Identité, adresse, prestations, montants, moyen de paiement | Obligations comptables et fiscales | 6.1.c | Expert-comptable, outil comptable | 10 ans (Code de commerce, art. L.123-22) | `[à compléter]` |
| T9 | Prise de rendez-vous Doctolib | Patientes | Données du compte Doctolib, motif | Agenda | 6.1.b ; 9.2.h | Doctolib (sous-traitant pour l'agenda) | Selon contrat Doctolib | Hébergement HDS de Doctolib |
| T10 | Dossier patient (hors plateforme) | Patientes | Bilan, notes, mesures en consultation | Prise en charge diététique | 6.1.b ; 9.2.h | Manon seule | 20 ans après la dernière prise en charge (5 ans actif + 15 ans archivé, référentiel CNIL) | `[outil de Manon, HDS s'il est en ligne]` |
| T11 | **Suivi nutritionnel et évolution (étape 2)** | Patientes | Repas notés, semainiers, réponses de Manon, poids, énergie, sommeil, symptômes digestifs, cycle | Suivi diététique entre les consultations | 6.1.b ; **9.2.a (consentement explicite par rubrique)** ou 9.2.h `[à trancher]` | Manon ; hébergeur HDS | Accompagnement, puis report utile dans T10 et suppression `[sous 3 mois]` ; retrait : 30 jours ; preuve des accords : 5 ans | **AIPD**, accès tracés, HDS, aucune donnée dans les emails |
| T12 | Sport (étape 3) | Patientes | Inscriptions aux séances, vidéos faites, préférences sport, playlists | Séances collectives, programme | 6.1.b | Manon ; hébergeur ; Bunny Stream (lecture vidéo) | Inscriptions : 1 an ; vidéos faites : 12 mois glissants ; préférences : durée du compte | Liens visio non publics |
| T13 | Paiement (étape 4) | Patientes, clientes | Identité, IBAN ou carte (chez le prestataire), échéances | Encaisser les offres | 6.1.b ; 6.1.c | `[Stripe / GoCardless]` | Selon obligations légales du prestataire ; mandat SEPA : `[à vérifier]` | Aucune donnée de carte ni d'IBAN complet chez Manon |
| T14 | Contact WhatsApp | Patientes | Numéro, messages | Questions pratiques entre deux rendez-vous | 6.1.b | Meta (WhatsApp) | `[à définir : supprimer les conversations à la fin du suivi]` | Chiffrement de bout en bout ; consigne : pas de détails de santé |
| T15 | Mesure d'audience (si retenue) | Visiteuses | Pages vues agrégées, sans cookie | Statistiques | 6.1.f | `[Plausible / Umami]` | `[à compléter]` | Sans cookie, sans IP conservée `[à vérifier]` |

## Analyse d'impact (AIPD)

- **Étape 1** : AIPD non obligatoire selon notre lecture (professionnelle libérale seule, pas de traitement à grande échelle ; considérant 91), mais recommandée de façon légère, puisque les données sont probablement de santé. `[à valider]`
- **Étape 2** : **AIPD obligatoire avant l'ouverture** : données de santé, suivi régulier des personnes, données intimes (cycle) ; au moins deux critères des lignes directrices du CEPD (WP248). Outil : logiciel PIA de la CNIL.

## Violations de données

Procédure : constater, contenir (couper l'accès, changer les secrets), noter dans le registre des violations (date, nature, données, personnes, mesures), notifier la CNIL sous 72 heures si un risque existe (art. 33), informer les patientes si le risque est élevé (art. 34). Contacts : hébergeur `[à compléter]`, mainteneur `[à compléter]`.

| Date | Nature | Données et personnes | Conséquences | Mesures | Notifiée à la CNIL ? |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Demandes d'exercice des droits

| Date de la demande | Personne | Droit | Réponse et date (sous 1 mois) |
| --- | --- | --- | --- |
| | | | |
