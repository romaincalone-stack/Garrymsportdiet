import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { RecipeForm } from "@/components/recipe-form";

export const metadata: Metadata = { title: "Nouvelle recette" };

export default async function Page() {
  await requireAdmin();
  return (<><p><Link href="/admin/recettes">← Recettes</Link></p><h1>Nouvelle recette</h1><div className="card"><RecipeForm /></div></>);
}
