// MobileMenu.jsx
"use client";
import Link from "next/link";
import { BiHistory, BiEnvelope, BiStore } from "react-icons/bi";
import { GiRunningShoe, GiKeyLock } from "react-icons/gi";
import { useState } from "react";
import { MdClose, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(() => {
    // Initialiser l'onglet actif en fonction du chemin actuel
    if (pathname === "/") return "accueil";
    if (pathname.includes("cordonnerie") || pathname.includes("bourrellerie")) return "cordonnerie";
    if (pathname.includes("serrurerie") || pathname.includes("mon-projet")) return "serrurerie";
    if (
      pathname.includes("process") ||
      pathname.includes("savoir-faire") ||
      pathname.includes("engagements") ||
      pathname.includes("histoire")
    )
      return "apropos";
    if (pathname.includes("contact")) return "contact";
    return "accueil";
  });
  const [overlayMenu, setOverlayMenu] = useState(null);

  // Fermer l'overlay
  const closeOverlay = () => {
    setOverlayMenu(null);
  };

  // Ouvrir l'overlay pour un menu spécifique
  const openOverlay = (menu) => {
    if (menu === "cordonnerie") {
      setOverlayMenu({
        title: "Cordonnerie",
        items: [
          { label: "La cordonnerie traditionnelle", path: "/la-cordonnerie-traditionnelle" },
          { label: "La bourrellerie", path: "/la-bourrellerie" },
        ],
      });
    } else if (menu === "serrurerie") {
      setOverlayMenu({
        title: "Serrurerie",
        items: [
          { label: "La serrurerie traditionnelle", path: "/la-serrurerie-traditionnelle" },
          { label: "Votre projet", path: "/mon-projet" },
        ],
      });
    } else if (menu === "apropos") {
      setOverlayMenu({
        title: "À propos",
        items: [
          { label: "Notre processus", path: "/process" },
          { label: "Nos savoir-faire", path: "/nos-savoir-faire" },
          { label: "Nos engagements", path: "/nos-engagements" },
          { label: "Notre histoire", path: "/notre-histoire" },
        ],
      });
    }
  };

  return (
    <>
      {/* Barre de navigation fixe en bas */}
      <nav className="fixed inset-x-0 bottom-0 bg-primary-dark shadow-lg border-t border-accent/20 backdrop-blur-sm md:hidden z-40">
        <div className="flex justify-around py-4">
          {/* Accueil */}
          <Link href="/">
            <div
              className={`flex flex-col items-center space-y-1 ${
                activeTab === "accueil" ? "text-accent" : "text-white/80 hover:text-accent-light"
              }`}
              onClick={() => setActiveTab("accueil")}
            >
              <BiStore size={24} />
              <span className="text-xs">Accueil</span>
            </div>
          </Link>

          {/* Cordonnerie - avec overlay */}
          <div
            className={`flex flex-col items-center space-y-1 cursor-pointer ${
              activeTab === "cordonnerie" ? "text-accent" : "text-white/80 hover:text-accent-light"
            }`}
            onClick={() => {
              setActiveTab("cordonnerie");
              openOverlay("cordonnerie");
            }}
          >
            <GiRunningShoe size={24} />
            <span className="text-xs">Cordonnerie</span>
          </div>

          {/* Serrurerie - avec overlay */}
          <div
            className={`flex flex-col items-center space-y-1 cursor-pointer ${
              activeTab === "serrurerie" ? "text-accent" : "text-white/80 hover:text-accent-light"
            }`}
            onClick={() => {
              setActiveTab("serrurerie");
              openOverlay("serrurerie");
            }}
          >
            <GiKeyLock size={24} />
            <span className="text-xs">Serrurerie</span>
          </div>

          {/* À propos - avec overlay */}
          <div
            className={`flex flex-col items-center space-y-1 cursor-pointer ${
              activeTab === "apropos" ? "text-accent" : "text-white/80 hover:text-accent-light"
            }`}
            onClick={() => {
              setActiveTab("apropos");
              openOverlay("apropos");
            }}
          >
            <BiHistory size={24} />
            <span className="text-xs">À propos</span>
          </div>

          {/* Contact */}
          <Link href="/contact">
            <div
              className={`flex flex-col items-center space-y-1 ${
                activeTab === "contact" ? "text-accent" : "text-white/80 hover:text-accent-light"
              }`}
              onClick={() => setActiveTab("contact")}
            >
              <BiEnvelope size={24} />
              <span className="text-xs">Contact</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Overlay pour les sous-menus */}
      {overlayMenu && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:hidden">
          <div className="bg-primary-dark/90 w-full max-w-sm rounded-xl border border-accent/20 p-6 relative shadow-xl">
            <button
              className="absolute top-4 right-4 text-white hover:text-accent"
              onClick={closeOverlay}
            >
              <MdClose size={24} />
            </button>

            <h3 className="text-2xl font-bold text-accent mb-6">{overlayMenu.title}</h3>

            <div className="space-y-4">
              {overlayMenu.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="flex items-center justify-between w-full p-3 bg-black/30 hover:bg-accent/20 text-white rounded-lg transition-colors border border-white/10 hover:border-accent/30"
                  onClick={closeOverlay}
                >
                  <span>{item.label}</span>
                  <MdKeyboardArrowRight size={20} className="text-accent" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
