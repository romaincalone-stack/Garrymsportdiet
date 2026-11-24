import { eur } from "@/lib/format";
import type { PlanRow } from "@/lib/data";

export const PlanOptions = ({ plans }: { plans: PlanRow[] }) => <>{plans.map(p => (
  <option key={p.code} value={p.code}>{p.name} · {p.billing_unit === "offert" ? "offert" : `${eur(p.price_cents)}${p.billing_unit === "mois" ? " / mois" : ""}`}</option>
))}</>;
