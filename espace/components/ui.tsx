// Petits composants partagés (serveur). Chaque champ a un id et un label (CLAUDE.md, règle 8).
import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type Base = { id: string; label: string; hint?: string };

export function Field({ id, label, hint, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={rest.name ?? id} aria-describedby={hint ? `${id}-hint` : undefined} {...rest} />
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}

export function Select({ id, label, hint, children, ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={rest.name ?? id} aria-describedby={hint ? `${id}-hint` : undefined} {...rest}>{children}</select>
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}

export function Area({ id, label, hint, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={rest.name ?? id} aria-describedby={hint ? `${id}-hint` : undefined} {...rest} />
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}

export function Check({ id, label, ...rest }: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="check">
      <input type="checkbox" id={id} name={rest.name ?? id} {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export const Msg = ({ error, ok }: { error?: string | null; ok?: string | null }) =>
  error ? <p className="error" role="alert">{error}</p> : ok ? <p className="ok" role="status">{ok}</p> : null;

/** Texte brut en paragraphes (échappé par React : aucun HTML saisi n'est interprété). */
export const Paragraphs = ({ text }: { text: string }) => <>{text.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}</>;
