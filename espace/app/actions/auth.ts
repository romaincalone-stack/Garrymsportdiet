"use server";
import { redirect } from "next/navigation";
import { q, one, tx } from "@/lib/db";
import { hashPassword, verifyPassword, passwordProblem, sha256, newToken, totpStep, decrypt } from "@/lib/crypto";
import { createSession, readSession, markSecondFactor, destroySession, destroyAllSessions } from "@/lib/session";
import { audit, appSecret } from "@/lib/auth";
import { sendEmail, resetEmail } from "@/lib/email";
import type { FormState } from "@/components/state-form";

const MAX_FAILS = 5, LOCK_MIN = 15;
/** Version des conditions d'utilisation acceptées à l'activation (legal/cgu-espace.md). À changer quand le texte change. */
const TERMS_VERSION = "v1";
// Empreinte factice : la vérification prend le même temps qu'un compte existe ou non.
const DUMMY = "scrypt$32768$8$1$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

type Account = { id: string; role: "admin" | "patient"; status: string; password_hash: string | null; totp_enabled: boolean; failed_logins: number; locked_until: Date | null };

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const email = str(form, "email").toLowerCase(), password = String(form.get("password") ?? "");
  const generic = { error: "Email ou mot de passe incorrect." };
  if (!email || !password) return generic;
  const u = await one<Account>("select id, role, status, password_hash, totp_enabled, failed_logins, locked_until from profiles where lower(email) = $1", [email]);
  if (u?.locked_until && new Date(u.locked_until) > new Date()) {
    return { error: `Trop d'essais. Réessayez dans ${LOCK_MIN} minutes ou choisissez « Mot de passe oublié ».` };
  }
  const ok = await verifyPassword(password, u?.password_hash ?? DUMMY);
  if (!u || !ok || u.status !== "active" || !u.password_hash) {
    if (u) {
      const fails = u.failed_logins + 1;
      await q("update profiles set failed_logins = $2, locked_until = $3 where id = $1",
        [u.id, fails >= MAX_FAILS ? 0 : fails, fails >= MAX_FAILS ? new Date(Date.now() + LOCK_MIN * 60_000) : null]);
      if (fails >= MAX_FAILS) await audit(u.id, "verrouillage", "compte", u.id);
    }
    return generic;
  }
  await q("update profiles set failed_logins = 0, locked_until = null where id = $1", [u.id]);
  await createSession(u.id, u.role);
  if (u.role === "admin") {
    await audit(u.id, "connexion", "compte", u.id);
    redirect(u.totp_enabled ? "/connexion/verification" : "/admin/securite");
  }
  redirect("/espace");
}

/** Second facteur du back-office : code à 6 chiffres de l'application d'authentification. */
export async function verifySecondFactor(_: FormState, form: FormData): Promise<FormState> {
  const s = await readSession();
  if (!s || s.role !== "admin" || !s.totp_enabled) redirect("/connexion");
  const u = await one<{ totp_secret_enc: string; totp_last_step: string | null; failed_logins: number; locked_until: Date | null }>(
    "select totp_secret_enc, totp_last_step, failed_logins, locked_until from profiles where id = $1", [s.id]);
  if (!u) redirect("/connexion");
  if (u.locked_until && new Date(u.locked_until) > new Date()) return { error: `Trop d'essais. Réessayez dans ${LOCK_MIN} minutes.` };
  const step = totpStep(decrypt(u.totp_secret_enc, appSecret()), str(form, "code"));
  if (step === null || (u.totp_last_step !== null && step <= Number(u.totp_last_step))) {
    const fails = u.failed_logins + 1;
    await q("update profiles set failed_logins = $2, locked_until = $3 where id = $1",
      [s.id, fails >= MAX_FAILS ? 0 : fails, fails >= MAX_FAILS ? new Date(Date.now() + LOCK_MIN * 60_000) : null]);
    return { error: "Code incorrect ou déjà utilisé. Attendez le code suivant." };
  }
  await q("update profiles set totp_last_step = $2, failed_logins = 0 where id = $1", [s.id, step]);
  await markSecondFactor(s.token_hash);
  await audit(s.id, "double_authentification", "compte", s.id);
  redirect("/admin");
}

/** Activation d'un compte : la patiente (ou Manon) choisit son mot de passe depuis le lien d'invitation. */
export async function acceptInvitation(_: FormState, form: FormData): Promise<FormState> {
  return usePasswordToken(form, "invitation");
}
export async function resetPassword(_: FormState, form: FormData): Promise<FormState> {
  return usePasswordToken(form, "reinitialisation");
}

async function usePasswordToken(form: FormData, kind: "invitation" | "reinitialisation"): Promise<FormState> {
  const token = str(form, "token"), password = String(form.get("password") ?? ""), confirm = String(form.get("confirm") ?? "");
  const problem = passwordProblem(password);
  if (problem) return { error: problem };
  if (password !== confirm) return { error: "Les deux mots de passe ne sont pas identiques." };
  if (kind === "invitation" && form.get("consent") !== "on") return { error: "Merci d'accepter les conditions d'utilisation pour activer votre espace." };
  const hash = await hashPassword(password);
  const user = await tx(async c => {
    const t = (await c.query<{ user_id: string }>(
      `update auth_tokens set used_at = now() where token_hash = $1 and kind = $2 and used_at is null and expires_at > now() returning user_id`,
      [sha256(token), kind])).rows[0];
    if (!t) return null;
    return (await c.query<{ id: string; role: "admin" | "patient" }>(
      `update profiles set password_hash = $2, failed_logins = 0, locked_until = null,
              terms_version = coalesce($3, terms_version), terms_accepted_at = case when $3::text is null then terms_accepted_at else now() end
        where id = $1 and status = 'active' returning id, role`, [t.user_id, hash, kind === "invitation" ? TERMS_VERSION : null])).rows[0] ?? null;
  });
  if (!user) return { error: "Ce lien n'est plus valable. Demandez-en un nouveau à Manon, ou utilisez « Mot de passe oublié »." };
  await destroyAllSessions(user.id);
  await audit(user.id, kind === "invitation" ? "activation" : "reinitialisation", "compte", user.id);
  await createSession(user.id, user.role);
  redirect(user.role === "admin" ? "/admin/securite" : "/espace");
}

/** Réponse identique que le compte existe ou non (on ne révèle pas qui est patiente). */
export async function forgotPassword(_: FormState, form: FormData): Promise<FormState> {
  const email = str(form, "email").toLowerCase();
  const done = { ok: "Si un compte existe avec cette adresse, vous allez recevoir un email avec un lien valable 1 heure." };
  if (!email.includes("@")) return { error: "Indiquez votre adresse email." };
  const u = await one<{ id: string; first_name: string; email: string }>(
    "select id, first_name, email from profiles where lower(email) = $1 and status = 'active' and password_hash is not null", [email]);
  if (u) {
    const recent = await one("select 1 from auth_tokens where user_id = $1 and kind = 'reinitialisation' and created_at > now() - interval '2 minutes'", [u.id]);
    if (!recent) {
      const t = newToken();
      await q("insert into auth_tokens (token_hash, user_id, kind, expires_at) values ($1, $2, 'reinitialisation', now() + interval '1 hour')", [sha256(t), u.id]);
      const m = resetEmail(u.first_name, t);
      await sendEmail(u.email, m.subject, m.body);
    }
  }
  return done;
}

export async function logout() {
  await destroySession();
  redirect("/connexion");
}
