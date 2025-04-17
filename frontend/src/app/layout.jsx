import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Poppins, Petrona, Josefin_Sans } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const petrona = Petrona({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Atelier des Frères d'Antan | Serrurerie et Cordonnerie Traditionnelle",
  description:
    "Artisans passionnés en serrurerie et cordonnerie traditionnelle. Découvrez notre savoir-faire ancestral et nos services de qualité dans les Yvelines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${poppins.className} ${petrona.className} ${josefinSans.className}`}>
        {children}
      </body>
    </html>
  );
}
