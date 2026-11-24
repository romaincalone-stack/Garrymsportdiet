import { test } from "node:test";
import assert from "node:assert/strict";
import { base32Decode, base32Encode, decrypt, encrypt, hashPassword, passwordProblem, totpAt, verifyPassword, verifyTotp } from "../lib/crypto.ts";
import { can, minPlan, type Matrix, type Plan } from "../lib/access.ts";

test("mot de passe : vérification correcte, refus d'un autre mot de passe", async () => {
  const h = await hashPassword("un mot de passe long");
  assert.ok(h.startsWith("scrypt$"));
  assert.equal(await verifyPassword("un mot de passe long", h), true);
  assert.equal(await verifyPassword("un mot de passe lonG", h), false);
  assert.equal(await verifyPassword("x", null), false);
  assert.ok(passwordProblem("court"));
  assert.equal(passwordProblem("assez long ici"), null);
});

test("TOTP : vecteurs de la RFC 6238 (SHA-1)", () => {
  const secret = Buffer.from("12345678901234567890");
  assert.equal(totpAt(secret, 59, 8), "94287082");
  assert.equal(totpAt(secret, 1111111109, 8), "07081804");
  assert.equal(totpAt(secret, 2000000000, 8), "69279037");
});

test("TOTP : code courant accepté, décalage d'une période accepté, code faux refusé", () => {
  const b32 = base32Encode(Buffer.from("12345678901234567890"));
  assert.deepEqual(base32Decode(b32), Buffer.from("12345678901234567890"));
  const now = 1_700_000_000_000, code = totpAt(base32Decode(b32), now / 1000);
  assert.equal(verifyTotp(b32, code, now), true);
  assert.equal(verifyTotp(b32, code, now + 30_000), true);
  assert.equal(verifyTotp(b32, code, now + 95_000), false);
  assert.equal(verifyTotp(b32, "000000", now), code === "000000");
  assert.equal(verifyTotp(b32, "abc", now), false);
});

test("chiffrement : aller-retour, refus avec une autre clé", () => {
  const c = encrypt("SECRET", "clé-1");
  assert.equal(decrypt(c, "clé-1"), "SECRET");
  assert.throws(() => decrypt(c, "clé-2"));
});

test("accès : formule qui débloque une fonctionnalité", () => {
  const plans: Plan[] = [
    { code: "suivi", name: "Unité", price_cents: 5000, billing_unit: "consultation", sort_order: 1 },
    { code: "decouverte", name: "Mois offert", price_cents: 0, billing_unit: "offert", sort_order: 2 },
    { code: "f1", name: "Nutrition", price_cents: 6000, billing_unit: "mois", sort_order: 3 },
    { code: "f2", name: "All in", price_cents: 9000, billing_unit: "mois", sort_order: 4 },
    { code: "f3", name: "Recettes + sport", price_cents: 2000, billing_unit: "mois", sort_order: 5 }
  ];
  const m: Matrix = { suivi: new Set(["docs"]), decouverte: new Set(["docs", "recettes"]), f1: new Set(["docs", "recettes", "contact"]), f2: new Set(["docs", "recettes", "contact", "videos"]), f3: new Set(["docs", "recettes", "videos"]) };
  assert.equal(can(m, "f1", "recettes"), true);
  assert.equal(can(m, "suivi", "recettes"), false);
  assert.equal(can(m, null, "docs"), false);
  assert.equal(minPlan(plans, m, "suivi", "recettes")?.code, "f3");      // la moins chère qui garde « docs »
  assert.equal(minPlan(plans, m, "f1", "videos")?.code, "f2");           // garder le contact impose All in
  assert.equal(minPlan(plans, m, "decouverte", "contact")?.code, "f1");  // le mois offert n'est jamais proposé
});
