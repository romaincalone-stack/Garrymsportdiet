"use client";
import { useContext } from "react";
import { useFormStatus } from "react-dom";
import { PendingContext } from "./state-form";

/** Bouton d'envoi désactivé pendant l'envoi (évite les doubles envois). */
export function Submit({ children, className = "btn block", pendingText = "Un instant…" }: { children: React.ReactNode; className?: string; pendingText?: string }) {
  const { pending } = useFormStatus();
  const actionPending = useContext(PendingContext);
  const busy = pending || actionPending;
  return <button type="submit" className={className} disabled={busy} aria-busy={busy}>{busy ? pendingText : children}</button>;
}
