"use client";
import { createContext, startTransition, useActionState } from "react";
import { Msg } from "./ui";

export type FormState = { error?: string | null; ok?: string | null } | undefined;
export const PendingContext = createContext(false);

/**
 * Formulaire relié à une action serveur qui renvoie un message d'erreur ou de confirmation.
 * L'envoi passe par onSubmit pour que les champs restent remplis après une erreur (React vide sinon le formulaire) ;
 * sans JavaScript, l'attribut action prend le relais.
 */
export function StateForm({ action, children, className }: { action: (s: FormState, f: FormData) => Promise<FormState>; children: React.ReactNode; className?: string }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className={className} onSubmit={e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter);
      startTransition(() => formAction(data));
    }}>
      <Msg error={state?.error} ok={state?.ok} />
      <PendingContext.Provider value={pending}>{children}</PendingContext.Provider>
    </form>
  );
}
