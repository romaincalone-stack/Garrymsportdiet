import "server-only";
import { q } from "./db";

// Durées de conservation annoncées dans la politique de confidentialité (content/legal/confidentialite.md).
// Appliquées à chaque ouverture du tableau de bord de Manon (pas de tâche planifiée nécessaire à cette échelle).
export async function purgeExpired() {
  await q("delete from appointments where starts_at < now() - interval '30 days'");
  await q("delete from offer_requests where created_at < now() - interval '1 year'");
  await q("delete from audit_log where at < now() - interval '1 year'");
  await q("delete from sessions where expires_at < now()");
  await q("delete from auth_tokens where expires_at < now() - interval '30 days'");
}
