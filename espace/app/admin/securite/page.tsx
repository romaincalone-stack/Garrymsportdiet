import type { Metadata } from "next";
import QRCode from "qrcode";
import { requireAdmin, appSecret } from "@/lib/auth";
import { one } from "@/lib/db";
import { decrypt, otpauthUrl } from "@/lib/crypto";
import { StateForm } from "@/components/state-form";
import { Field } from "@/components/ui";
import { Submit } from "@/components/submit";
import { startTotp, confirmTotp, changeAdminPassword } from "../actions";

export const metadata: Metadata = { title: "Sécurité" };

export default async function Page() {
  const me = await requireAdmin({ setupPage: true });
  if (!me.totp_enabled) {
    const row = await one<{ totp_secret_enc: string | null }>("select totp_secret_enc from profiles where id = $1", [me.id]);
    const secret = row?.totp_secret_enc ? decrypt(row.totp_secret_enc, appSecret()) : null;
    const qr = secret ? await QRCode.toString(otpauthUrl(secret, me.email), { type: "svg", margin: 0, color: { dark: "#0F3A2A", light: "#FFFFFF" } }) : null;
    return (
      <>
        <h1>Double authentification</h1>
        <div className="card">
          <p>Le back-office donne accès aux données de vos patientes : un code à usage unique, affiché par une application sur votre téléphone, est demandé à chaque connexion. C&apos;est obligatoire.</p>
          <ol>
            <li>Installez une application d&apos;authentification (par exemple celle de votre téléphone, ou une application libre comme Aegis ou 2FAS).</li>
            <li>Affichez le QR code ci-dessous et scannez-le avec cette application.</li>
            <li>Saisissez le code à 6 chiffres qu&apos;elle affiche.</li>
          </ol>
          {!qr ? (
            <form action={startTotp}><Submit className="btn">Afficher le QR code</Submit></form>
          ) : (
            <>
              <div className="qr" role="img" aria-label="QR code à scanner avec l'application d'authentification" dangerouslySetInnerHTML={{ __html: qr }} />
              <p className="muted" style={{ fontSize: 14 }}>Impossible de scanner ? Saisissez cette clé dans l&apos;application :</p>
              <p className="secret" data-testid="totp-secret">{secret}</p>
              <StateForm action={confirmTotp}>
                <Field id="code" label="Code à 6 chiffres" inputMode="numeric" autoComplete="one-time-code" maxLength={7} required />
                <Submit className="btn">Activer</Submit>
              </StateForm>
            </>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Sécurité</h1>
      <div className="card"><p style={{ margin: 0 }}>Double authentification : <b>active</b>. En cas de perte du téléphone, la personne qui administre le serveur peut la réinitialiser (voir espace/README.md).</p></div>
      <section className="card" aria-labelledby="pw-t">
        <h2 id="pw-t">Changer de mot de passe</h2>
        <StateForm action={changeAdminPassword}>
          <Field id="current" label="Mot de passe actuel" type="password" autoComplete="current-password" required />
          <Field id="password" label="Nouveau mot de passe" type="password" autoComplete="new-password" minLength={10} required />
          <Field id="confirm" label="Confirmez le nouveau mot de passe" type="password" autoComplete="new-password" minLength={10} required />
          <Submit className="btn">Enregistrer</Submit>
        </StateForm>
      </section>
    </>
  );
}
