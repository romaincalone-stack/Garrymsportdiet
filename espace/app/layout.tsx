import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/bellefair/latin-400.css";
import "./globals.css";

// Polices hébergées avec l'application (aucun appel à Google Fonts).
export const metadata: Metadata = {
  title: { default: "Mon espace · GM Sport et Nutrition", template: "%s · GM Sport et Nutrition" },
  description: "Espace personnel des patientes de Manon Garrione, diététicienne-nutritionniste.",
  robots: { index: false, follow: false },
  manifest: "/manifest.webmanifest"
};
export const viewport: Viewport = { themeColor: "#0F3A2A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
