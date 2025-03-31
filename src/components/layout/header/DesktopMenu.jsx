"use client";
import FloatingCallButton from "@/components/ui/buttons/floatingCallButton/FloatingCallButton";
import { useMenuManager } from "@/hooks/useMenuManager";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
  const pathname = usePathname();
  const { activeMenu, handleMouseEnter, hideMenu, rotatedArrows } = useMenuManager();

  // Fonction pour vérifier si un lien principal ou ses sous-liens sont actifs
  const isActive = (mainPath, subPaths = []) => {
    return pathname === mainPath || subPaths.some((path) => pathname === path);
  };

  return (
    <>
      {/* Menu Desktop */}
      <nav className="relative hidden md:flex md:text-sm space-x-6 font-primary capitalize font-light tracking-wider xl:text-lg">
        {/* Cordonnerie avec sous-menu */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("cordonnerie")}
          onMouseLeave={hideMenu}
        >
          <button
            className={`flex items-center hover:text-accent-light capitalize ${
              isActive("/la-cordonnerie", ["/la-cordonnerie-traditionnelle", "/la-bourrellerie"])
                ? "text-accent-light"
                : ""
            }`}
          >
            La cordonnerie
            <MdKeyboardArrowDown
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                rotatedArrows["cordonnerie"] ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeMenu === "cordonnerie" && (
            <div className="w-80 absolute bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2 rounded-2xl z-10">
              <Link
                href="/la-cordonnerie-traditionnelle"
                className={`w-full block px-2 py-1 hover:rounded-md hover:bg-accent/60 hover:text-primary ${
                  pathname === "/la-cordonnerie-traditionnelle" ? "text-accent" : ""
                }`}
              >
                La cordonnerie traditionnelle
              </Link>
              <Link
                href="/la-bourrellerie"
                className={`w-full block px-2 py-1 hover:rounded-md hover:bg-accent/60 hover:text-primary ${
                  pathname === "/la-bourrellerie" ? "text-accent" : ""
                }`}
              >
                La bourrellerie
              </Link>
            </div>
          )}
        </div>

        {/* Serrurerie avec sous-menu */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("serrurerie")}
          onMouseLeave={hideMenu}
        >
          <button
            className={`flex items-center hover:text-accent-light capitalize ${
              isActive("/la-serrurerie", ["/la-serrurerie-traditionnelle", "/la-serrurerie-automobile"])
                ? "text-accent-light"
                : ""
            }`}
          >
            La serrurerie
            <MdKeyboardArrowDown
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                rotatedArrows["serrurerie"] ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeMenu === "serrurerie" && (
            <div className="w-80 absolute bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2 rounded-2xl z-10">
              <Link
                href="/la-serrurerie-traditionnelle"
                className={`w-full block px-2 py-1 hover:rounded-md hover:bg-accent/60 hover:text-primary ${
                  pathname === "/la-serrurerie-traditionnelle" ? "text-accent" : ""
                }`}
              >
                La serrurerie traditionnelle
              </Link>
              <Link
                href="/la-serrurerie-automobile"
                className={`w-full block px-2 py-1 hover:rounded-md hover:bg-accent/60 hover:text-primary ${
                  pathname === "/la-serrurerie-automobile" ? "text-accent" : ""
                }`}
              >
                Votre projet
              </Link>
            </div>
          )}
        </div>

        {/* Processus */}
        <Link
          href="/notre-processus-travaux"
          className={`hover:text-accent-light ${pathname === "/notre-processus-travaux" ? "text-accent-light" : ""}`}
        >
          Notre processus
        </Link>

        {/* À propos avec sous-menu */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("À propos")}
          onMouseLeave={hideMenu}
        >
          <button
            className={`flex items-center hover:text-accent-light capitalize ${
              isActive("/a-propos", ["/nos-savoir-faire", "/nos-engagements", "/notre-histoire"])
                ? "text-accent-light"
                : ""
            }`}
          >
            À propos
            <MdKeyboardArrowDown
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                rotatedArrows["À propos"] ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeMenu === "À propos" && (
            <div className="w-60 absolute bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2 rounded-2xl z-10">
              <Link
                href="/nos-savoir-faire"
                className={`w-full block px-2 py-1 hover:rounded-md hover:bg-accent/60 hover:text-primary ${
                  pathname === "/nos-savoir-faire" ? "text-accent" : ""
                }`}
              >
                Nos savoir-faire
              </Link>
              <Link
                href="/nos-engagements"
                className={`w-full block px-2 py-1 hover:rounded-md hover:bg-accent/60 hover:text-primary ${
                  pathname === "/nos-engagements" ? "text-accent" : ""
                }`}
              >
                Nos engagements
              </Link>
              <Link
                href="/notre-histoire"
                className={`w-full block px-2 py-1 hover:rounded-md hover:bg-accent/60 hover:text-primary ${
                  pathname === "/notre-histoire" ? "text-accent" : ""
                }`}
              >
                Notre histoire
              </Link>
            </div>
          )}
        </div>

        {/* Contact */}
        <Link
          href="/contact"
          className={`hover:text-accent-light ${pathname === "/contact" ? "text-accent-light" : ""}`}
        >
          Contact
        </Link>
      </nav>

      {/* CallButton */}
      <FloatingCallButton phoneNumber="07 88 41 63 91" position="top-right" className="hidden md:block" />
    </>
  );
}