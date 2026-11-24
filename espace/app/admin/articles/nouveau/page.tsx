import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { ArticleForm } from "@/components/article-form";

export const metadata: Metadata = { title: "Nouvel article" };

export default async function Page() {
  await requireAdmin();
  return (<><p><Link href="/admin/ressources">← Ressources</Link></p><h1>Nouvel article</h1><div className="card"><ArticleForm /></div></>);
}
