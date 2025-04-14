import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Poppins, Petrona, Josefin_Sans } from "next/font/google";

// Définition des polices avec optimisation pour Vercel
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial"],
  adjustFontFallback: true,
});

const petrona = Petrona({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-petrona",
  display: "swap",
  preload: true,
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: true,
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial"],
  adjustFontFallback: true,
});

export const metadata = {
  title: "Atelier des Frères d'Antan | Serrurerie et Cordonnerie Traditionnelle",
  description:
    "Artisans passionnés en serrurerie et cordonnerie traditionnelle. Découvrez notre savoir-faire ancestral et nos services de qualité dans les Yvelines.",
  keywords:
    "serrurerie, cordonnerie, bourrellerie, artisanat, tradition, Yvelines, réparation, clés, chaussures, cuir",
  authors: [{ name: "Atelier des Frères d'Antan" }],
  creator: "Atelier des Frères d'Antan",
  publisher: "Atelier des Frères d'Antan",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${poppins.variable} ${petrona.variable} ${josefinSans.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header />

          {/* Contenu principal */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
