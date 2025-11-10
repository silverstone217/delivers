import type { Metadata } from "next";
import "./globals.css";
import { sourceSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/providers/AuthProvider";
// import Script from "next/script";
// import { GOOGLE_ADSENSE_API_KEY } from "@/lib/env";

export const metadata: Metadata = {
  title: "Delivers ",
  description: "Comparateur de prix de livraison en ligne au Congo+",
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
