import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requirePatient } from "@/lib/auth";
import { patientAccess } from "@/lib/data";
import { one } from "@/lib/db";
import { frDate } from "@/lib/format";
import { Paragraphs } from "@/components/ui";
import { Locked } from "@/components/patient";

export const metadata: Metadata = { title: "Article" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const u = await requirePatient();
  const { slug } = await params;
  const [access, a] = await Promise.all([
    patientAccess(u.id),
    one<{ title: string; body: string; visibility: string; published_at: Date }>("select title, body, visibility, published_at from articles where slug = $1 and status = 'published' and published_at <= now()", [slug])
  ]);
  if (!a) notFound();
  const back = <p><Link href="/espace/ressources">← Ressources</Link></p>;
  if (a.visibility === "members" && !access.can("articles")) return <>{back}<h1>{a.title}</h1><Locked what="Cet article" plan={access.unlock("articles")} /></>;
  return (
    <article className="article">
      {back}
      <h1>{a.title}</h1>
      <p className="muted">{frDate(a.published_at)}</p>
      <Paragraphs text={a.body} />
    </article>
  );
}
