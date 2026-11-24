import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { q } from "./db";
import { readSession, type SessionUser } from "./session";

// Couche d'accès : chaque page et chaque action vérifie la session ici, au plus près des données.

export const currentUser = cache(async (): Promise<SessionUser | null> => {
  const u = await readSession();
  if (u && (!u.last_seen_at || Date.now() - new Date(u.last_seen_at).getTime() > 60 * 60 * 1000)) {
    await q("update profiles set last_seen_at = now() where id = $1", [u.id]);
  }
  return u;
});

export async function requirePatient(): Promise<SessionUser> {
  const u = await currentUser();
  if (!u) redirect("/connexion");
  if (u.role !== "patient") redirect("/admin");
  return u;
}

/**
 * Back-office : double authentification obligatoire. Sans elle configurée, seule la page Sécurité est accessible ;
 * configurée mais pas encore saisie dans cette session, retour à la vérification du code.
 */
export async function requireAdmin(opts: { setupPage?: boolean } = {}): Promise<SessionUser> {
  const u = await currentUser();
  if (!u) redirect("/connexion");
  if (u.role !== "admin") redirect("/espace");
  if (!u.totp_enabled) { if (!opts.setupPage) redirect("/admin/securite"); return u; }
  if (!u.second_factor_ok) redirect("/connexion/verification");
  return u;
}

export async function audit(actorId: string | null, action: string, entity: string, entityId?: string | null) {
  await q("insert into audit_log (actor_id, action, entity, entity_id) values ($1, $2, $3, $4)", [actorId, action, entity, entityId ?? null]);
}

export function appSecret(): string {
  const s = process.env.APP_SECRET;
  if (!s || s.length < 32) throw new Error("APP_SECRET manquant ou trop court (32 caractères au moins).");
  return s;
}
