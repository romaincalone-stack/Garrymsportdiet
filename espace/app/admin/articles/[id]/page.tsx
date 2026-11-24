import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { one } from "@/lib/db";
import { ArticleForm, type ArticleValues } from "@/components/article-form";
import { Check } from "@/components/ui";
import { Submit } from "@/components/submit";
import { deleteArticle } from "../../actions";

export const metadata: Metadata = { title: "Article" };

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ cree?: string }> }) {
  await requireAdmin();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const a = await one<ArticleValues>("select id, title, body, visibility, status, published_at from articles where id = $1", [id]);
  if (!a) notFound();
  return (
    <>
      <p><Link href="/admin/ressources">← Ressources</Link></p>
      <h1>{a.title}</h1>
      {sp.cree && <p className="ok" role="status">Article créé.</p>}
      <div className="card"><ArticleForm a={a} /></div>
      <form action={deleteArticle} className="card"><input type="hidden" name="id" value={id} /><Check id="confirm" label="Je confirme la suppression définitive" required /><Submit className="btn line">Supprimer l&apos;article</Submit></form>
    </>
  );
}
