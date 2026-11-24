import Link from "next/link";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { patientAccess, getSettings } from "@/lib/data";
import { one, q } from "@/lib/db";
import { frDateTime, daysUntil, LOCATIONS, MEALS } from "@/lib/format";
import { ICal, IGift, IChat, IBowl, IBook, ICart } from "@/components/icons";
import { Legal } from "@/components/patient";

export const metadata: Metadata = { title: "Accueil" };

export default async function Page() {
  const u = await requirePatient();
  const [access, s] = await Promise.all([patientAccess(u.id), getSettings()]);
  const [rdv, latest, listCount] = await Promise.all([
    one<{ starts_at: Date; location: string }>("select starts_at, location from appointments where patient_id = $1 and starts_at > now()", [u.id]),
    one<{ slug: string; title: string; meal_type: string }>("select slug, title, meal_type from recipes where status = 'published' and publish_at <= now() order by publish_at desc limit 1"),
    q<{ n: number }>("select count(*)::int n from shopping_list_items where patient_id = $1", [u.id])
  ]);
  const gift = access.sub?.plan_code === "decouverte" && access.sub.end_date ? Math.max(0, daysUntil(access.sub.end_date)) : null;

  return (
    <>
      <h1>Bonjour {u.first_name}</h1>
      <p className="muted">{access.sub ? `Votre offre : ${access.sub.plan_name}` : "Aucune offre active pour le moment."}</p>

      {gift !== null && (
        <div className="notice"><IGift /><span><b>Mois offert après votre bilan</b> : encore {gift} jour{gift > 1 ? "s" : ""} d&apos;accès. <Link href="/espace/offres">Voir la suite</Link></span></div>
      )}

      <section className="card raised" aria-labelledby="rdv-t">
        <div className="row" style={{ flexWrap: "nowrap" }}><ICal /><h2 id="rdv-t" style={{ margin: 0 }}>Prochain rendez-vous</h2></div>
        {rdv
          ? <p style={{ marginTop: 10 }}><b>{frDateTime(rdv.starts_at)}</b><br />{LOCATIONS[rdv.location]}</p>
          : <p className="muted" style={{ marginTop: 10 }}>Aucun rendez-vous à venir enregistré par Manon.</p>}
        {access.can("rdv") && <a className="btn" href={s.doctolib_url} target="_blank" rel="noopener">Prendre rendez-vous sur Doctolib</a>}
      </section>

      {access.can("contact") && (
        <div className="notice"><IChat /><span>
          Une question entre deux rendez-vous ? Écrivez à Manon sur WhatsApp
          {s.whatsapp_url ? <> : <a href={s.whatsapp_url} target="_blank" rel="noopener">ouvrir WhatsApp</a></> : <span className="placeholder"> [lien WhatsApp à fournir par Manon]</span>}.
          {" "}WhatsApp sert à la prise de contact : gardez les détails de santé pour la consultation. Urgence médicale : appelez le 15.
        </span></div>
      )}

      <div className="grid2">
        {latest && (
          <Link className="card" href={`/espace/recettes/${latest.slug}`}>
            <span className="tag on">Nouvelle recette</span>
            <h3 style={{ marginTop: 10 }}>{latest.title}</h3>
            <span className="muted">{MEALS[latest.meal_type]}</span>
          </Link>
        )}
        <Link className="card" href="/espace/courses">
          <div className="row" style={{ flexWrap: "nowrap" }}><ICart /><h3 style={{ margin: 0 }}>Liste de courses</h3></div>
          <p className="muted" style={{ margin: "8px 0 0" }}>{listCount[0].n ? `${listCount[0].n} recette${listCount[0].n > 1 ? "s" : ""} dans la liste` : "Ajoutez des recettes pour la remplir"}</p>
        </Link>
        <Link className="card" href="/espace/recettes">
          <div className="row" style={{ flexWrap: "nowrap" }}><IBowl /><h3 style={{ margin: 0 }}>Recettes</h3></div>
          <p className="muted" style={{ margin: "8px 0 0" }}>Idées simples, portions ajustables</p>
        </Link>
        <Link className="card" href="/espace/ressources">
          <div className="row" style={{ flexWrap: "nowrap" }}><IBook /><h3 style={{ margin: 0 }}>Articles et fiches</h3></div>
          <p className="muted" style={{ margin: "8px 0 0" }}>Les repères de Manon, à lire ou télécharger</p>
        </Link>
      </div>
      <p style={{ marginTop: 8 }}><Link href="/espace/offres">Mes offres</Link></p>
      <Legal s={s} />
    </>
  );
}
