import type { Metadata } from "next";
import { LegalPage } from "@/components/markdown";

// Texte rédigé par l'agent juridique (legal/), recopié par scripts/sync-legal.mjs. À faire relire avant la mise en ligne.
export const metadata: Metadata = { title: "Conditions d'utilisation" };

export default function Page() {
  return <LegalPage title="Conditions d'utilisation" file="conditions.md" />;
}
