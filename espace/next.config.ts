import type { NextConfig } from "next";

// En-têtes de sécurité : l'espace contient des données personnelles (et, dès l'étape 2, de santé).
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Le dépôt contient deux package-lock (racine et espace) : la racine de l'application est ce dossier.
  turbopack: { root: process.cwd() },
  // Fiches conseils en PDF : 5 Mo au plus (vérifié aussi dans uploadDocument).
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  }
};

export default nextConfig;
