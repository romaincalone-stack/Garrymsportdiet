import { StateForm, type FormState } from "./state-form";
import { Field } from "./ui";
import { Submit } from "./submit";

/** Choix du mot de passe (invitation ou réinitialisation). */
export function PasswordForm({ token, action, consent, email }: { token: string; action: (s: FormState, f: FormData) => Promise<FormState>; consent?: boolean; email?: string }) {
  return (
    <StateForm action={action}>
      <input type="hidden" name="token" value={token} />
      {email && <input type="email" name="username" autoComplete="username" value={email} readOnly hidden />}
      <Field id="password" label="Mot de passe" type="password" autoComplete="new-password" minLength={10} required hint="10 caractères au moins. Une phrase facile à retenir fonctionne très bien." />
      <Field id="confirm" label="Confirmez le mot de passe" type="password" autoComplete="new-password" minLength={10} required />
      {consent && (
        <>
          <p className="muted" style={{ fontSize: 14 }}>
            Vos données servent uniquement à votre accompagnement par Manon, tenue au secret professionnel. Elles ne sont ni vendues
            ni utilisées pour de la publicité. <a href="/confidentialite" target="_blank">Politique de confidentialité</a>.
          </p>
          <div className="check">
            <input type="checkbox" id="consent" name="consent" required />
            <label htmlFor="consent">J&apos;ai lu et j&apos;accepte les <a href="/conditions" target="_blank">conditions d&apos;utilisation</a> de mon espace</label>
          </div>
        </>
      )}
      <Submit>{consent ? "Activer mon espace" : "Enregistrer"}</Submit>
    </StateForm>
  );
}
