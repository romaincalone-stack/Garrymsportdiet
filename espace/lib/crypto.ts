// Cryptographie de l'espace, uniquement avec le module intégré de Node (aucune dépendance externe) :
// mots de passe (scrypt), jetons à usage unique, double authentification (TOTP, RFC 6238), chiffrement AES-256-GCM.
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";

// ---------- Mots de passe ----------
const N = 2 ** 15, R = 8, P = 1, KEYLEN = 64;
const derive = (password: string, salt: Buffer, n = N, r = R, p = P) =>
  new Promise<Buffer>((resolve, reject) =>
    scrypt(password.normalize("NFKC"), salt, KEYLEN, { N: n, r, p, maxmem: 256 * n * r }, (err, key) => (err ? reject(err) : resolve(key))));

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt);
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64url")}$${key.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  if (!stored) return false;
  const [algo, n, r, p, salt, key] = stored.split("$");
  if (algo !== "scrypt" || !salt || !key) return false;
  const expected = Buffer.from(key, "base64url");
  const got = await derive(password, Buffer.from(salt, "base64url"), Number(n), Number(r), Number(p));
  return got.length === expected.length && timingSafeEqual(got, expected);
}

/** Règle de mot de passe : 10 caractères au moins, lisible par tout le monde (pas de règle de complexité obscure). */
export function passwordProblem(password: string): string | null {
  if (password.length < 10) return "Choisissez un mot de passe d'au moins 10 caractères.";
  if (password.length > 200) return "Ce mot de passe est trop long.";
  return null;
}

// ---------- Jetons ----------
export const newToken = () => randomBytes(32).toString("base64url");
export const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

// ---------- Double authentification (TOTP, RFC 6238 : SHA-1, 30 s, 6 chiffres) ----------
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export function base32Encode(buf: Buffer): string {
  let bits = 0, value = 0, out = "";
  for (const byte of buf) {
    value = (value << 8) | byte; bits += 8;
    while (bits >= 5) { out += B32[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  return out;
}
export function base32Decode(s: string): Buffer {
  const clean = s.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0, value = 0; const out: number[] = [];
  for (const c of clean) {
    value = (value << 5) | B32.indexOf(c); bits += 5;
    if (bits >= 8) { out.push((value >>> (bits - 8)) & 255); bits -= 8; }
  }
  return Buffer.from(out);
}

export function totpAt(secret: Buffer, unixSeconds: number, digits = 6, step = 30): string {
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(unixSeconds / step)));
  const h = createHmac("sha1", secret).update(counter).digest();
  const o = h[h.length - 1] & 15;
  const bin = ((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
  return String(bin % 10 ** digits).padStart(digits, "0");
}

/**
 * Accepte le code de la période en cours et des périodes voisines (décalage d'horloge du téléphone).
 * Renvoie le numéro de période reconnu (à mémoriser pour refuser qu'un même code serve deux fois), sinon null.
 */
export function totpStep(secretB32: string, code: string, nowMs = Date.now(), window = 1): number | null {
  const c = code.replace(/\s/g, "");
  if (!/^\d{6}$/.test(c)) return null;
  const secret = base32Decode(secretB32), t = Math.floor(nowMs / 1000);
  for (let w = -window; w <= window; w++) {
    const expected = totpAt(secret, t + w * 30);
    if (timingSafeEqual(Buffer.from(expected), Buffer.from(c))) return Math.floor(t / 30) + w;
  }
  return null;
}
export const verifyTotp = (secretB32: string, code: string, nowMs = Date.now(), window = 1) => totpStep(secretB32, code, nowMs, window) !== null;

export const newTotpSecret = () => base32Encode(randomBytes(20));
export const otpauthUrl = (secretB32: string, account: string, issuer = "GM Sport et Nutrition") =>
  `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secretB32}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

// ---------- Chiffrement (secret de double authentification en base) ----------
const keyFrom = (secret: string) => createHash("sha256").update(secret).digest();
export function encrypt(plain: string, secret: string): string {
  const iv = randomBytes(12), cipher = createCipheriv("aes-256-gcm", keyFrom(secret), iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ct]).toString("base64url");
}
export function decrypt(payload: string, secret: string): string {
  const buf = Buffer.from(payload, "base64url");
  const decipher = createDecipheriv("aes-256-gcm", keyFrom(secret), buf.subarray(0, 12));
  decipher.setAuthTag(buf.subarray(12, 28));
  return Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString("utf8");
}
