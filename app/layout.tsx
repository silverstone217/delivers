import type { Metadata } from "next";
import "./globals.css";
import { sourceSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/providers/AuthProvider";
// import Script from "next/script";
// import { GOOGLE_ADSENSE_API_KEY } from "@/lib/env";

export const metadata: Metadata = {
  title: "Delivers",
  description:
    "Delivers est un comparateur de prix de livraison par zones au Congo. Comparez les tarifs des services de livraison selon la zone, la distance et le transporteur.",
  keywords: [
    "comparateur livraison Congo",
    "prix livraison par zone",
    "livraison Congo",
    "tarifs livraison Kinshasa",
    "comparateur transport Congo",
    "delivers",
    "livraison",
    "business",
    "service",
    "otekis",
    "otekis delivery",
    "servi group",
  ],
  authors: [{ name: "SERVI Group", url: "https://servi-group.vercel.app" }],
  robots: "index, follow",
  openGraph: {
    title: "Delivers",
    description:
      "Comparez facilement les prix de livraison par zones au Congo avec Delivers.",
    url: "https://delivers.vercel.app/",
    siteName: "Delivers",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${sourceSans.className} antialiased scroll-smooth`}>
        <AuthProvider>
          {/* <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_API_KEY}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          /> */}
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
