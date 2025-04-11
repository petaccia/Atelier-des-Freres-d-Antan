import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Poppins } from "next/font/google";

// Importation de Poppins depuis Google Fonts pour la police secondaire
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
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
      <body className={`${poppins.variable} antialiased`}>
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
