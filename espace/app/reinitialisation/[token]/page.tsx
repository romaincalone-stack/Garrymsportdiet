import type { Metadata } from "next";
import { AuthCard, BackToLogin } from "@/components/auth-card";
import { PasswordForm } from "@/components/password-form";
import { resetPassword } from "@/app/actions/auth";

export const metadata: Metadata = { title: "Nouveau mot de passe" };

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <AuthCard title="Nouveau mot de passe" lead="Choisissez un nouveau mot de passe. Vous serez déconnectée de vos autres appareils." foot={<BackToLogin />}>
      <PasswordForm token={token} action={resetPassword} />
    </AuthCard>
  );
}
