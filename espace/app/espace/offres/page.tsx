import Link from "next/link";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { getPlans, getSettings, getSubscription } from "@/lib/data";
import { q } from "@/lib/db";
import { eur } from "@/lib/format";
import { Submit } from "@/components/submit";
import { requestOffer } from "../actions";

export const metadata: Metadata = { title: "Mes offres" };

export default async function Page() {
  const u = await requirePatient();
  const [plans, s, sub, pending] = await Promise.all([
    getPlans(), getSettings(), getSubscription(u.id),
    q<{ offer: string }>("select offer from offer_requests where patient_id = $1 and handled_at is null", [u.id])
  ]);
  const asked = new Set(pending.map(p => p.offer));
  const offers = [
    ...plans.filter(p => p.public && p.code !== "suivi").map(p => ({ code: p.code, name: p.name, price: `${eur(p.price_cents)}${p.billing_unit === "mois" ? " / mois" : ""}`, highlights: p.highlights })),
    ...(s.extra_offers ?? []).map(o => ({ code: o.code, name: o.name, price: o.price_label, highlights: o.highlights }))
  ];

  return (
    <>
      <p><Link href="/espace">← Accueil</Link></p>
      <h1>Mes offres</h1>
      <p className="muted">Changer d&apos;offre ou ajouter un service. Touchez « Je suis intéressée » : Manon vous recontacte pour en parler. Rien n&apos;est payé ici.</p>
      {offers.map(o => {
        const current = sub?.plan_code === o.code;
        return (
          <article key={o.code} className={`card${current ? " raised" : ""}`}>
            <div className="row between"><h2 style={{ margin: 0 }}>{o.name}</h2>{current && <span className="tag on">Votre offre</span>}</div>
            <p className="price" style={{ margin: "6px 0" }}>{o.price}</p>
            <ul>{o.highlights.map(h => <li key={h}>{h}</li>)}</ul>
            {!current && (asked.has(o.code)
              ? <p className="ok" role="status">Demande envoyée. Manon vous recontacte.</p>
              : <form action={requestOffer}><input type="hidden" name="offer" value={o.code} /><Submit className="btn">Je suis intéressée</Submit></form>)}
          </article>
        );
      })}
    </>
  );
}
