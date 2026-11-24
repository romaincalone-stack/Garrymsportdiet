import { connection } from "next/server";
import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Confidentialité" };

// Texte de base à faire relire (juriste ou AFDN) : les mentions entre crochets restent visibles tant qu'elles ne sont pas complétées.
export default async function Page() {
  await connection(); // rendu à chaque requête (contenu lu en base)
  const s = await getSettings();
  return (
    <main className="auth" style={{ placeItems: "start center" }}>
      <article className="card" style={{ maxWidth: 720 }}>
        <h1>Confidentialité</h1>
        <p><b>Responsable du traitement</b> : {s.practitioner.name}, {s.practitioner.title} · {s.practitioner.registration} · <span className="placeholder">[adresse du cabinet de La Garde]</span>.</p>
        <h2>Ce que contient votre espace</h2>
        <p>Vos nom, prénom, adresse email et téléphone, votre offre et ses dates, la date et le lieu de votre prochain rendez-vous, vos recettes favorites et votre liste de courses. Aucune donnée médicale n&apos;y est enregistrée à ce stade : ni motif de consultation, ni bilan, ni mesure.</p>
        <h2>Pourquoi</h2>
        <p>Uniquement pour votre accompagnement par Manon : vous donner accès aux contenus de votre offre. Vos données ne sont ni vendues, ni utilisées pour de la publicité, ni partagées. Manon est tenue au secret professionnel.</p>
        <h2>Où et combien de temps</h2>
        <p>Chez un hébergeur certifié pour les données de santé (HDS), en France : <span className="placeholder">[nom de l&apos;hébergeur]</span>. Conservation : <span className="placeholder">[durée à valider]</span> après la fin de votre accompagnement, puis suppression.</p>
        <h2>Vos droits</h2>
        <p>Accès, rectification, effacement, limitation, portabilité et opposition : demandez-le à Manon <span className="placeholder">[adresse email de contact]</span>. Vous pouvez aussi saisir la CNIL (cnil.fr).</p>
        <p className="muted">Les contenus de cet espace sont des conseils nutritionnels généraux. Ils complètent votre suivi médical et ne le remplacent pas.</p>
      </article>
    </main>
  );
}
