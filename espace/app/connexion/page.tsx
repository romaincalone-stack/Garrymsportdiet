import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";
import { StateForm } from "@/components/state-form";
import { Field } from "@/components/ui";
import { Submit } from "@/components/submit";
import { login } from "@/app/actions/auth";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Connexion" };

export default async function Page() {
  const u = await currentUser();
  if (u) redirect(u.role === "admin" ? "/admin" : "/espace");
  return (
    <AuthCard title="Mon espace" lead="Votre compte est créé par Manon. Vous avez reçu un email pour l'activer."
      foot={<Link href="/mot-de-passe-oublie">Mot de passe oublié</Link>}>
      <StateForm action={login}>
        <Field id="email" label="Adresse email" type="email" autoComplete="email" required />
        <Field id="password" label="Mot de passe" type="password" autoComplete="current-password" required />
        <Submit>Me connecter</Submit>
      </StateForm>
    </AuthCard>
  );
}
