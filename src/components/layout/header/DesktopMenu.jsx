// desktop menu
"use client";
import { useMenuManager } from "@/hooks/useMenuManager";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function DesktopMenu () {
 const { activeMenu, handleMouseEnter, hideMenu, rotatedArrows } = useMenuManager();
  return (
    <>
            {/* Menu Desktop */}
            <nav className="hidden md:flex space-x-6 font-poppins">
            {/* Cordonnerie avec sous-menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter("cordonnerie")}
              onMouseLeave={hideMenu}
              >
              <button className="flex items-center hover:text-accent">
                La cordonnerie
                <MdKeyboardArrowDown 
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                rotatedArrows["cordonnerie"] ? "rotate-180" : ""
              }`}
              />
              </button>
              {activeMenu === "cordonnerie" && (
              <div className="w-72 absolute  bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2 rounded-2xl transition-opacity duration-300">
                <Link href="/la-cordonnerie-traditionnelle" className=" w-full block px-2 hover:rounded-md hover:bg-accent/60 hover:text-primary">
                  La cordonnerie traditionnelle
                </Link>
                <Link href="/la-bourrellerie" className="w-full block px-2 hover:rounded-md hover:bg-accent/60 hover:text-primary">
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
              <button className="flex items-center hover:text-accent">
                La serrurerie
                <MdKeyboardArrowDown 
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                rotatedArrows["serrurerie"] ? "rotate-180" : ""
              }`}
              />
              </button>
              {activeMenu === "serrurerie" && (
              <div className="w-60 absolute bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2 rounded-2xl">
                <Link href="/la-serrurerie-traditionnelle" className="w-full block px-2 hover:rounded-md hover:bg-accent/60 hover:text-primary">
                  La serrurerie traditionnelle
                </Link>
                <Link href="/la-serrurerie-automobile" className="w-full block px-2 hover:rounded-md hover:bg-accent/60 hover:text-primary">
                  Votre projet
                </Link>
              </div>
              )}
            </div>
  
            {/* Processus */}
            <Link href="/notre-processus-travaux" className="hover:text-accent">
              Notre processus
            </Link>
  
            {/* A propos avec sous-menu */}
            <div className="relative group">
              <button className="flex items-center hover:text-accent">
                À propos
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2">
                <Link href="/nos-savoir-faire" className="block hover:text-primary">
                  Nos savoir-faire
                </Link>
                <Link href="/nos-engagements" className="block hover:text-primary">
                  Nos engagements
                </Link>
                <Link href="/notre-histoire" className="block hover:text-primary">
                  Notre histoire
                </Link>
              </div>
            </div>
  
            {/* Contact */}
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
          </nav>
          </>
  )
  }
