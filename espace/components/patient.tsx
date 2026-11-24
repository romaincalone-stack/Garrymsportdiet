import Link from "next/link";
import { ILock } from "./icons";
import { eur } from "@/lib/format";
import type { PlanRow, Settings } from "@/lib/data";

/** Contenu verrouillé : nomme l'offre la moins chère qui le débloque (minPlan), sans pression commerciale. */
export function Locked({ what, plan }: { what: string; plan: PlanRow | null }) {
  return (
    <div className="card locked">
      <div className="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
        <span style={{ flex: "none", width: 24 }}><ILock /></span>
        <div>
          <h3>{what}</h3>
          <p className="muted">
            {plan ? <>Inclus dans : {plan.name} ({eur(plan.price_cents)}{plan.billing_unit === "mois" ? " / mois" : ""}).</> : "Non inclus dans votre offre actuelle."}
          </p>
          <Link className="btn small" href="/espace/offres">Voir les offres</Link>
        </div>
      </div>
    </div>
  );
}

/** Mentions de la professionnelle (CLAUDE.md, règle 10 : titre et numéro d'enregistrement affichés). */
export function Legal({ s }: { s: Settings }) {
  return (
    <p className="legal">
      {s.practitioner.name}, {s.practitioner.title} · {s.practitioner.registration}<br />
      Les contenus de cet espace sont des conseils nutritionnels généraux. Ils complètent votre suivi médical et ne le remplacent pas.
      <br /><Link href="/mentions-legales">Mentions légales</Link> · <Link href="/confidentialite">Confidentialité</Link> · <Link href="/conditions">Conditions</Link>
    </p>
  );
}
