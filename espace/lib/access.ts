// Matrice d'accès formule × fonctionnalité (tables plans, features, plan_features).
// Même logique que can() et minPlan() du prototype : ne jamais tester une formule en dur.

export type Plan = { code: string; name: string; price_cents: number; billing_unit: "consultation" | "mois" | "offert"; sort_order: number };
export type Matrix = Record<string, Set<string>>; // plan → fonctionnalités activées

export const can = (matrix: Matrix, plan: string | null, feature: string) => !!plan && !!matrix[plan]?.has(feature);

/**
 * Offre qui débloque une fonctionnalité : la moins chère, payante, qui contient la fonctionnalité
 * et garde tout ce que la patiente a déjà. À défaut, la moins chère qui contient la fonctionnalité.
 */
export function minPlan(plans: Plan[], matrix: Matrix, current: string | null, feature: string): Plan | null {
  const have = current ? matrix[current] ?? new Set<string>() : new Set<string>();
  const paid = plans.filter(p => p.billing_unit !== "offert").sort((a, b) => a.price_cents - b.price_cents || a.sort_order - b.sort_order);
  const has = (p: Plan) => matrix[p.code]?.has(feature);
  const keepsAll = (p: Plan) => [...have].every(f => matrix[p.code]?.has(f));
  return paid.find(p => has(p) && keepsAll(p)) ?? paid.find(has) ?? null;
}
