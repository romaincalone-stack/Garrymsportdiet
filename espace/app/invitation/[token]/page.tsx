import type { Metadata } from "next";
import { AuthCard, BackToLogin } from "@/components/auth-card";
import { PasswordForm } from "@/components/password-form";
import { acceptInvitation } from "@/app/actions/auth";
import { one } from "@/lib/db";
import { sha256 } from "@/lib/crypto";

export const metadata: Metadata = { title: "Activer mon espace" };

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const t = await one<{ first_name: string; email: string }>(
    `select p.first_name, p.email from auth_tokens t join profiles p on p.id = t.user_id
      where t.token_hash = $1 and t.kind = 'invitation' and t.used_at is null and t.expires_at > now() and p.status = 'active'`, [sha256(token)]);
  if (!t) return <AuthCard title="Lien expiré" lead="Ce lien d'activation n'est plus valable (7 jours, une seule utilisation). Demandez à Manon de vous en renvoyer un." foot={<BackToLogin />}>{null}</AuthCard>;
  return (
    <AuthCard title={`Bienvenue ${t.first_name}`} lead="Choisissez votre mot de passe pour activer votre espace.">
      <PasswordForm token={token} action={acceptInvitation} consent email={t.email} />
    </AuthCard>
  );
}
