import { Montserrat, Roboto, Source_Sans_3 } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900", "200", "800", "300"],
  variable: "--font-source-sans",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900", "200", "300"],
  variable: "--font-montserrat",
});
