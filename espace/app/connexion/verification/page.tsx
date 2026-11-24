import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";
import { StateForm } from "@/components/state-form";
import { Field } from "@/components/ui";
import { Submit } from "@/components/submit";
import { verifySecondFactor, logout } from "@/app/actions/auth";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Vérification" };

export default async function Page() {
  const u = await currentUser();
  if (!u || u.role !== "admin") redirect("/connexion");
  if (!u.totp_enabled) redirect("/admin/securite");
  if (u.second_factor_ok) redirect("/admin");
  return (
    <AuthCard title="Vérification" lead="Saisissez le code à 6 chiffres affiché par votre application d'authentification."
      foot={<form action={logout}><button className="linkbtn">Annuler et me déconnecter</button></form>}>
      <StateForm action={verifySecondFactor}>
        <Field id="code" label="Code à 6 chiffres" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9 ]{6,7}" maxLength={7} required autoFocus />
        <Submit>Valider</Submit>
      </StateForm>
    </AuthCard>
  );
}
