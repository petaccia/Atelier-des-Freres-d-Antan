"use client";
// desktop menu
import Link from "next/link";

export default function DesktopMenu () {
  return (
    <>
            {/* Menu Desktop */}
            <nav className="hidden md:flex space-x-6 font-poppins">
            {/* Cordonnerie avec sous-menu */}
            <div className="relative group">
              <button className="flex items-center hover:text-accent">
                La cordonnerie
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2">
                <Link href="/la-cordonnerie-traditionnelle" className="block hover:text-primary">
                  La cordonnerie traditionnelle
                </Link>
                <Link href="/la-bourrellerie" className="block hover:text-primary">
                  La bourrellerie
                </Link>
              </div>
            </div>
  
            {/* Serrurerie avec sous-menu */}
            <div className="relative group">
              <button className="flex items-center hover:text-accent">
                La serrurerie
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-md mt-2 p-4 space-y-2">
                <Link href="/la-serrurerie-traditionnelle" className="block hover:text-primary">
                  La serrurerie traditionnelle
                </Link>
              </div>
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
