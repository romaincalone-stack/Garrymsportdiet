import "server-only";
import { cookies } from "next/headers";
import { newToken, sha256 } from "./crypto";
import { one, q } from "./db";

// Session : jeton aléatoire dans un cookie httpOnly ; seule son empreinte SHA-256 est stockée en base.
export const COOKIE = "gm_session";
const DAYS = 24 * 60 * 60 * 1000;
export const SESSION_MS = { patient: 30 * DAYS, admin: 12 * 60 * 60 * 1000 };

export async function createSession(userId: string, role: "admin" | "patient", secondFactorOk = false) {
  const token = newToken(), expires = new Date(Date.now() + SESSION_MS[role]);
  await q("insert into sessions (token_hash, user_id, second_factor_ok, expires_at) values ($1, $2, $3, $4)", [sha256(token), userId, secondFactorOk, expires]);
  await q("delete from sessions where expires_at < now()");
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires });
}

export type SessionUser = {
  id: string; role: "admin" | "patient"; first_name: string; last_name: string; email: string;
  totp_enabled: boolean; second_factor_ok: boolean; token_hash: string; last_seen_at: Date | null;
};

export async function readSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  return one<SessionUser>(
    `select p.id, p.role, p.first_name, p.last_name, p.email, p.totp_enabled, p.last_seen_at, s.second_factor_ok, s.token_hash
       from sessions s join profiles p on p.id = s.user_id
      where s.token_hash = $1 and s.expires_at > now() and p.status = 'active'`, [sha256(token)]);
}

export async function markSecondFactor(tokenHash: string) {
  await q("update sessions set second_factor_ok = true where token_hash = $1", [tokenHash]);
}

export async function destroySession() {
  const jar = await cookies(), token = jar.get(COOKIE)?.value;
  if (token) await q("delete from sessions where token_hash = $1", [sha256(token)]);
  jar.delete(COOKIE);
}

/** Déconnecte un compte partout (changement de mot de passe, suspension). */
export async function destroyAllSessions(userId: string, exceptHash?: string) {
  await q("delete from sessions where user_id = $1 and token_hash <> coalesce($2, '')", [userId, exceptHash ?? null]);
}
