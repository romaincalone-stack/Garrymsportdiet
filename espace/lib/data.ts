import "server-only";
import { cache } from "react";
import { q, one } from "./db";
import { can as canIn, minPlan, type Matrix, type Plan } from "./access";

// Lectures partagées par les pages. Le contrôle d'accès à une fonctionnalité passe toujours par can().

export type PlanRow = Plan & { commitment_months: number | null; upfront_price_cents: number | null; upfront_months: number | null; public: boolean; highlights: string[] };

export const getPlans = cache(() => q<PlanRow>("select * from plans order by sort_order"));

export const getMatrix = cache(async (): Promise<Matrix> => {
  const m: Matrix = {};
  for (const r of await q<{ plan_code: string; feature_key: string }>("select plan_code, feature_key from plan_features where enabled")) {
    (m[r.plan_code] ??= new Set()).add(r.feature_key);
  }
  return m;
});

export const getFeatures = cache(() => q<{ key: string; label: string }>("select key, label from features order by sort_order"));

export type Settings = {
  doctolib_url: string; whatsapp_url: string;
  practitioner: { name: string; title: string; registration: string };
  extra_offers: { code: string; name: string; price_label: string; highlights: string[] }[];
};
export const getSettings = cache(async (): Promise<Settings> => {
  const rows = await q<{ key: string; value: unknown }>("select key, value from settings");
  return Object.fromEntries(rows.map(r => [r.key, r.value])) as Settings;
});

export type Subscription = { plan_code: string; plan_name: string; start_date: Date; end_date: Date | null; commitment_end: Date | null; billing_unit: string };
export const getSubscription = cache((patientId: string) =>
  one<Subscription>(`select s.plan_code, p.name plan_name, s.start_date, s.end_date, s.commitment_end, p.billing_unit
                       from subscriptions s join plans p on p.code = s.plan_code
                      where s.patient_id = $1 and s.status = 'active'`, [patientId]));

/** Accès d'une patiente : formule active, fonctionnalités, et offre la moins chère pour débloquer une fonctionnalité. */
export async function patientAccess(patientId: string) {
  const [sub, matrix, plans] = await Promise.all([getSubscription(patientId), getMatrix(), getPlans()]);
  const plan = sub && (!sub.end_date || new Date(sub.end_date) >= startOfToday()) ? sub.plan_code : null;
  return {
    sub, plan,
    can: (feature: string) => canIn(matrix, plan, feature),
    unlock: (feature: string) => minPlan(plans, matrix, plan, feature) as PlanRow | null
  };
}

export function startOfToday() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
