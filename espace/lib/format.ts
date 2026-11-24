// Mise en forme française (fuseau de Manon).
const TZ = "Europe/Paris";
export const frDate = (d: Date | string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  new Date(d).toLocaleDateString("fr-FR", { timeZone: TZ, ...opts });
export const frDateTime = (d: Date | string) =>
  new Date(d).toLocaleString("fr-FR", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
export const eur = (cents: number) => (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0 });
export const daysUntil = (d: Date | string) => Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000);

export const MEALS: Record<string, string> = { petit_dejeuner: "Petit-déjeuner", dejeuner: "Déjeuner", diner: "Dîner", collation: "Collation", dessert: "Dessert" };
export const DIFFICULTY: Record<string, string> = { facile: "Facile", moyen: "Moyen", avance: "Avancé" };
export const LOCATIONS: Record<string, string> = { visio: "Visio", la_garde: "Cabinet de La Garde", domicile: "À domicile" };
export const STATUS: Record<string, string> = { active: "Active", suspendue: "Suspendue", archivee: "Archivée" };

export const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

/** Quantité d'ingrédient pour un nombre de portions (arrondie lisiblement). */
export function scaleQty(qty: number | null, base: number, portions: number): string {
  if (qty == null) return "";
  const v = (Number(qty) * portions) / base;
  const r = v >= 10 ? Math.round(v) : Math.round(v * 4) / 4;
  return r.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}
