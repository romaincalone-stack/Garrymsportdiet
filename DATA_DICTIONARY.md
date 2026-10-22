# DATA_DICTIONARY : modèle de données

Version 2026-10-22 · Cible : Supabase (Postgres, région UE) · Statut : proposé, rien n'est encore créé.

Légende sensibilité RGPD : **P** = donnée personnelle ; **—** = non personnelle ; **Santé** = interdite en option A (aucune colonne de ce type n'existe).
Conservation par défaut des données personnelles : durée de la relation + 3 ans après le dernier contact, puis suppression ou anonymisation (à valider par Manon et inscrire dans la politique de confidentialité).

## Comptes et formules

### `profiles` (1 ligne par utilisateur, liée à `auth.users`)
| Champ | Type | Oblig. | Exemple | RGPD | Conservation |
| --- | --- | --- | --- | --- | --- |
| id | uuid (PK, = auth.users.id) | oui | `5b1c…` | P | relation + 3 ans |
| role | enum `admin`, `patient` | oui | `patient` | — | idem |
| first_name | text | oui | Camille | P | idem |
| last_name | text | oui | Roux | P | idem |
| email | text unique | oui | camille@exemple.fr | P | idem |
| phone | text | non | 06 11 22 33 44 | P | idem |
| status | enum `active`, `suspendue`, `archivee` | oui | `active` | — | idem |
| created_by | uuid → profiles | oui | (Manon) | P | idem |
| created_at, last_seen_at | timestamptz | oui / non | 2026-09-01 | P | idem |

### `plans`
| Champ | Type | Oblig. | Exemple | RGPD |
| --- | --- | --- | --- | --- |
| code | text PK | oui | `f3` | — |
| name | text | oui | Nutrition + Recettes + Sport | — |
| price_cents | int | oui | 9000 | — |
| billing_unit | enum `consultation`, `mois` | oui | `mois` | — |
| sort_order | int | oui | 4 | — |

### `features` et `plan_features` (matrice d'accès)
| Table.champ | Type | Oblig. | Exemple |
| --- | --- | --- | --- |
| features.key | text PK | oui | `recettes` |
| features.label | text | oui | Bibliothèque de recettes complète |
| plan_features.plan_code | text → plans | oui | `f2` |
| plan_features.feature_key | text → features | oui | `recettes` |
| plan_features.enabled | bool | oui | true |

Clés : `docs`, `rdv`, `articles`, `nutri`, `contact`, `visio`, `recettes`, `videos`, `sport`, `collectives`, `individuelle`.

### `subscriptions` (historique des formules)
| Champ | Type | Oblig. | Exemple | RGPD | Conservation |
| --- | --- | --- | --- | --- | --- |
| id | uuid PK | oui | | — | |
| patient_id | uuid → profiles | oui | | P | relation + 3 ans |
| plan_code | text → plans | oui | `f3` | P | idem |
| start_date | date | oui | 2026-09-01 | P | idem |
| end_date | date | non (vide = Suivi) | 2026-11-30 | P | idem |
| status | enum `active`, `terminee`, `suspendue` | oui | `active` | P | idem |
| created_by | uuid → profiles | oui | | P | idem |

Une seule souscription `active` par patiente (index unique partiel). Les montants facturés restent dans l'outil comptable (10 ans, Code de commerce), pas ici.

### `appointments` (prochaine consultation recopiée de Doctolib)
| Champ | Type | Oblig. | Exemple | RGPD | Conservation |
| --- | --- | --- | --- | --- | --- |
| id | uuid PK | oui | | — | |
| patient_id | uuid → profiles | oui | | P | supprimé 30 j après la date |
| starts_at | timestamptz | oui | 2026-11-05 18:30 | P | idem |
| location | enum `visio`, `hyeres`, `la_garde`, `domicile` | oui | `visio` | P | idem |

Aucun motif ni commentaire : le motif d'une consultation de diététique est une donnée de santé.

## Contenus

### `recipes`
| Champ | Type | Oblig. | Exemple |
| --- | --- | --- | --- |
| id | uuid PK | oui | |
| slug | text unique | oui | `bowl-saumon-quinoa` |
| title | text | oui | Bowl saumon, quinoa et avocat |
| meal_type | enum `petit_dejeuner`, `dejeuner`, `diner`, `collation`, `dessert` | oui | `dejeuner` |
| prep_min, cook_min | int | oui | 15, 15 |
| difficulty | enum `facile`, `moyen`, `avance` | oui | `facile` |
| base_portions | int ≥ 1 | oui | 2 |
| kcal, protein_g, carbs_g, fat_g, fiber_g | numeric | oui | 640, 40, 45, 32, 9 |
| tip | text | non | Variante : sardines… |
| video_url | text | non | lien Reel |
| cover_path | text (Storage) | non | `recipes/bowl.jpg` |
| status | enum `draft`, `scheduled`, `published` | oui | `published` |
| publish_at | timestamptz | oui | 2026-09-02 |

Tables liées : `recipe_ingredients` (recipe_id, position, quantity numeric nullable, unit text, name text) ; `recipe_steps` (recipe_id, position, text) ; `themes` (id, label) + `recipe_themes` ; `recipe_allergens` (recipe_id, allergen enum des 14 allergènes réglementaires) ; `recipe_diets` (recipe_id, diet enum `vegetarien`, `vegan`, `sans_gluten`, `sans_lactose`). Aucune donnée personnelle.

### `videos`
id · title · theme (enum `abdos_fessiers`, `renforcement`, `cardio`, `mobilite`, `etirements`) · duration_min int · level (enum `debutant`, `intermediaire`, `avance`) · equipment text[] · description · provider (`bunny`, `vimeo`) · provider_video_id · thumbnail_path · published_at. Aucune donnée personnelle.

### `articles`
id · slug · title · body_md · cover_path · visibility (enum `public`, `members`) · published_at. Aucune donnée personnelle.

### Programmes
| Table | Champs |
| --- | --- |
| `nutrition_templates` | id, name (objectif, jamais une pathologie), description, recommendations text[] |
| `nutrition_template_slots` | template_id, day (0-6), slot (enum `petit_dejeuner`, `dejeuner`, `collation`, `diner`), recipe_id nullable, free_text nullable (contrainte : exactement l'un des deux) |
| `sport_templates` | id, name, level, description |
| `sport_template_sessions` | id, template_id, weekday (0-6), title, position |
| `sport_session_videos` | session_id, video_id, position |
| `patient_programs` | patient_id (P), nutrition_template_id nullable, sport_template_id nullable, assigned_at |

### Documents
`documents` (id, title, file_path, mime, size_bytes, created_at) et `document_shares` (document_id, patient_id nullable : vide = toutes les patientes). Fiches conseils génériques uniquement.

## Activité des patientes

| Table | Champs | RGPD | Conservation |
| --- | --- | --- | --- |
| `group_sessions` | id, title, starts_at, duration_min, capacity (déf. 10), video_link, equipment | — | 1 an |
| `session_registrations` | session_id, patient_id, status (`registered`, `waitlist`, `cancelled`), position, created_at | P | 1 an |
| `favorites` | patient_id, item_type (`recipe`, `video`), item_id, created_at | P (faible) | durée du compte |
| `workout_completions` | patient_id, sport_session_id, video_id, week_start date, completed_at | P (faible) : aucune mesure physiologique | 12 mois glissants |
| `shopping_list_items` | patient_id, recipe_id, portions | P (faible) | durée du compte |
| `notification_preferences` | patient_id, reminders, news, weekly_digest (bool) | P | durée du compte |

Point de vigilance : des favoris concentrés sur un thème (« endométriose ») permettent une déduction. Ne jamais les exploiter pour du profilage ni les afficher à Manon nominativement.

## Paramètres et traçabilité

- `settings` : key text PK, value jsonb (`doctolib_url`, `whatsapp_number`, `instagram_url`). Non personnel.
- `audit_log` : id, actor_id (P), action, entity, entity_id, at. Conservation 1 an.

## Relations

```
auth.users 1─1 profiles 1─n subscriptions n─1 plans 1─n plan_features n─1 features
profiles 1─n appointments · profiles 1─1 patient_programs ─ nutrition_templates / sport_templates
recipes 1─n recipe_ingredients · recipe_steps · recipe_themes · recipe_allergens · recipe_diets
nutrition_templates 1─n nutrition_template_slots n─1 recipes
sport_templates 1─n sport_template_sessions 1─n sport_session_videos n─1 videos
group_sessions 1─n session_registrations n─1 profiles
```

## Règles RLS (Row Level Security)

Fonctions SQL `security definer` :
- `is_admin()` : vrai si `profiles.role = 'admin'` pour `auth.uid()`.
- `current_plan(uid)` : code de la souscription active.
- `has_feature(key)` : vrai si `plan_features.enabled` pour `current_plan(auth.uid())` et le compte est `active`.

| Table | Lecture | Écriture |
| --- | --- | --- |
| profiles | soi-même ; admin : tout | admin ; la patiente modifie seulement `phone` |
| plans, features, plan_features, settings | tout utilisateur connecté (plans et settings : public) | admin |
| subscriptions, appointments, patient_programs | soi-même ; admin : tout | admin |
| recipes (+ tables liées) | `status = 'published' and publish_at <= now()` et (`has_feature('recettes')` ou recette du programme de la patiente ou parmi les 3 d'aperçu) ; admin : tout | admin |
| videos | `has_feature('videos')` ; admin : tout | admin |
| articles | `public` : tout le monde ; `members` : `has_feature('articles')` ; admin : tout | admin |
| nutrition_templates / slots | modèle attribué à soi ; admin : tout | admin |
| sport_templates / sessions / videos | modèle attribué à soi et `has_feature('sport')` ; admin : tout | admin |
| documents | partagés avec soi ou avec toutes ; admin : tout | admin |
| group_sessions | `has_feature('collectives')` ; admin : tout | admin |
| session_registrations | ses lignes ; admin : tout | insertion de soi si `has_feature('collectives')` ; capacité et liste d'attente gérées par une fonction `register_to_session()` |
| favorites, workout_completions, shopping_list_items, notification_preferences | ses lignes | ses lignes |
| audit_log | admin | trigger seulement |

Toute nouvelle table : RLS activée dès la création, aucune politique `using (true)` en écriture.
