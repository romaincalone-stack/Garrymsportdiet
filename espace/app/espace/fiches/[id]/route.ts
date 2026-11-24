import { currentUser } from "@/lib/auth";
import { patientAccess } from "@/lib/data";
import { one } from "@/lib/db";

// Téléchargement d'une fiche conseil : Manon, ou une patiente dont l'offre inclut « docs ».
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const u = await currentUser();
  if (!u) return new Response("Connexion requise", { status: 401 });
  const allowed = u.role === "admin" ? u.totp_enabled && u.second_factor_ok : (await patientAccess(u.id)).can("docs");
  if (!allowed) return new Response("Accès refusé", { status: 403 });
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response("Introuvable", { status: 404 });
  const d = await one<{ title: string; mime: string; data: Buffer }>("select title, mime, data from documents where id = $1", [id]);
  if (!d) return new Response("Introuvable", { status: 404 });
  const name = d.title.normalize("NFD").replace(/[^\w .-]/g, "").trim() || "fiche";
  return new Response(new Uint8Array(d.data), {
    headers: {
      "content-type": d.mime,
      "content-disposition": `attachment; filename="${name}.pdf"; filename*=UTF-8''${encodeURIComponent(d.title)}.pdf`,
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff"
    }
  });
}
