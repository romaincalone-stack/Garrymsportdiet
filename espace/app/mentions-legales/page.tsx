import type { Metadata } from "next";
import { LegalPage } from "@/components/markdown";

// Texte rédigé par l'agent juridique (legal/), recopié par scripts/sync-legal.mjs. À faire relire avant la mise en ligne.
export const metadata: Metadata = { title: "Mentions légales" };

export default function Page() {
  return <LegalPage title="Mentions légales" file="mentions-legales.md" />;
}
