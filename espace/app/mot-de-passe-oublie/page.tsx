import type { Metadata } from "next";
import { AuthCard, BackToLogin } from "@/components/auth-card";
import { StateForm } from "@/components/state-form";
import { Field } from "@/components/ui";
import { Submit } from "@/components/submit";
import { forgotPassword } from "@/app/actions/auth";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function Page() {
  return (
    <AuthCard title="Mot de passe oublié" lead="Indiquez votre adresse email : vous recevrez un lien pour en choisir un nouveau." foot={<BackToLogin />}>
      <StateForm action={forgotPassword}>
        <Field id="email" label="Adresse email" type="email" autoComplete="email" required />
        <Submit>Recevoir le lien</Submit>
      </StateForm>
    </AuthCard>
  );
}
