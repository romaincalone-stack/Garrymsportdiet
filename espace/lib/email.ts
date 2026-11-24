import "server-only";
import { q } from "./db";

// Emails transactionnels. Règle : aucune donnée de santé dans un email (ni motif, ni mesure, ni repas).
// EMAIL_DRIVER=outbox : enregistrés en base (développement, tests) ; EMAIL_DRIVER=brevo : envoyés par l'API Brevo.

export async function sendEmail(to: string, subject: string, body: string) {
  const driver = process.env.EMAIL_DRIVER ?? (process.env.NODE_ENV === "production" ? "brevo" : "outbox");
  if (driver === "outbox") {
    await q("insert into email_outbox (to_email, subject, body) values ($1, $2, $3)", [to, subject, body]);
    return;
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": process.env.BREVO_API_KEY ?? "", "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME ?? "GM Sport et Nutrition" },
      to: [{ email: to }], subject, textContent: body
    })
  });
  if (!res.ok) throw new Error(`Envoi de l'email impossible (${res.status}).`);
}

const appUrl = () => (process.env.APP_URL ?? "http://localhost:3100").replace(/\/$/, "");

export const invitationEmail = (firstName: string, token: string) => ({
  subject: "Votre espace GM Sport et Nutrition",
  body: `Bonjour ${firstName},\n\nManon vous a ouvert un espace personnel : recettes, fiches conseils et contenus de votre accompagnement.\n\nPour l'activer, choisissez votre mot de passe en suivant ce lien (valable 7 jours) :\n${appUrl()}/invitation/${token}\n\nÀ très vite,\nManon Garrione\nDiététicienne-nutritionniste`
});

export const resetEmail = (firstName: string, token: string) => ({
  subject: "Choisir un nouveau mot de passe",
  body: `Bonjour ${firstName},\n\nVous avez demandé à changer votre mot de passe. Suivez ce lien (valable 1 heure) :\n${appUrl()}/reinitialisation/${token}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce message : votre mot de passe reste inchangé.\n\nGM Sport et Nutrition`
});
