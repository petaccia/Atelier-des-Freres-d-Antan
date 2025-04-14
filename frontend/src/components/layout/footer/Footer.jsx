"use client";

import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import SocialLinks from "@/components/ui/social/SocialLinks";
import Image from "next/image";
import logo from "../../../../public/logo/logo-blue.svg";
import Link from "next/link";
import { getMapsUrl } from "@/utils/getMapsUrl";
import ShopAddress from "@/components/ui/shopAddress/ShopAddress";

export default function Footer() {
  return (
    <footer className="bg-black text-whiteGray py-16">
      <div className="container mx-auto px-4">
        {/* Section Logo et Description */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-8 border-b border-white/10">
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <div className="bg-primary-dark/50 p-4 rounded-xl mb-4 border border-white/10 shadow-xl">
              <Image src={logo} alt="Logo" width={180} height={180} className="mx-auto" />
            </div>
            <p className="text-whiteAmber text-center md:text-left max-w-md italic">
              "L'excellence artisanale au service de votre quotidien"
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className=" mb-4 text-whiteAmber tracking-wider uppercase">Suivez-nous</h3>
            <SocialLinks
              showColors={false}
              iconSize={24}
              showTitle={false}
              iconContainerClassName="w-10 h-10 bg-accent/10 hover:bg-accent/20 rounded-full flex items-center justify-center text-accent-light transition-colors duration-300"
            />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {/* Section Atelier */}
          <div className="bg-primary-dark/50 p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-accent/5 transition-all duration-300">
            <h3 className=" mb-6 text-whiteAmber tracking-wider uppercase border-b border-accent/20 pb-2">
              L'Atelier
            </h3>
            <div className="space-y-4">
              <Link
                href={getMapsUrl(ShopAddress())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <FiMapPin className="w-5 h-5 text-accent mt-1 group-hover:text-accent-light transition-colors" />
                <p className="text-whiteGray group-hover:text-accent transition-colors">
                  1 rue de Sancé, 78490 Montfort l'Amaury
                </p>
              </Link>
              <div className="flex items-start gap-3">
                <FiClock className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-whiteGray">Mar : 14h30-19h</p>
                  <p className="text-whiteGray">Me-Sam : 10h-13h30 / 14h30-19h</p>
                  <p className="text-whiteGray">Dim : 10h-13h30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-accent mt-1" />
                <p className="text-whiteGray">Tél. 01 34 84 07 84</p>
              </div>
              <p className="text-whiteGray/80 text-sm italic">
                Interventions sur rendez-vous pour la serrurerie
              </p>
            </div>
          </div>

          {/* Section Nos Services */}
          <div className="bg-primary-dark/50 p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-accent/5 transition-all duration-300">
            <h3 className=" mb-6 text-whiteAmber tracking-wider uppercase border-b border-accent/20 pb-2">
              Nos Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/la-serrurerie-traditionnelle"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Serrurerie traditionnelle
                </Link>
              </li>
              <li>
                <Link
                  href="/la-cordonnerie-traditionnelle"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Cordonnerie traditionnelle
                </Link>
              </li>
              <li>
                <Link
                  href="/la-bourrellerie"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Bourrellerie
                </Link>
              </li>
              <li>
                <Link
                  href="/mon-projet"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Demande de devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Section À Propos */}
          <div className="bg-primary-dark/50 p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-accent/5 transition-all duration-300">
            <h3 className="mb-6 text-whiteAmber tracking-wider uppercase border-b border-accent/20 pb-2">
              À Propos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/notre-histoire"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link
                  href="/nos-savoir-faire"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Nos savoir-faire
                </Link>
              </li>
              <li>
                <Link
                  href="/nos-engagements"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Nos engagements
                </Link>
              </li>
              <li>
                <Link
                  href="/process"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Notre processus
                </Link>
              </li>
              <li>
                <Link
                  href="https://atelierfreresdantan.fr/wp-content/uploads/2024/04/Atelier-des-Freres-dAntan-Conditions-Generales-de-Vente-17-avril-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-whiteGray hover:text-accent transition-colors group"
                >
                  <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-accent-light transition-colors"></span>
                  Conditions Générales de Vente
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Contact */}
          <div className="bg-primary-dark/50 p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-accent/5 transition-all duration-300">
            <h3 className="mb-6 text-whiteAmber tracking-wider uppercase border-b border-accent/20 pb-2">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <FiPhone className="w-5 h-5 text-accent mt-1 group-hover:text-accent-light transition-colors" />
                <Link
                  href="tel:0788416391"
                  className="text-whiteGray group-hover:text-accent transition-colors"
                >
                  07 88 41 63 91
                </Link>
              </div>
              <div className="flex items-start gap-3 group">
                <FiMail className="w-5 h-5 text-accent mt-1 group-hover:text-accent-light transition-colors" />
                <Link
                  href="mailto:contact@freresdantan.fr"
                  className="text-whiteGray group-hover:text-accent transition-colors"
                >
                  contact@freresdantan.fr
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-whiteGray/80 mb-2">Zone d'intervention :</p>
                <p className="text-whiteGray/80 text-sm">
                  Montfort l'Amaury et ses environs, Garancières, Houdan, La Queue-les-Yvelines,
                  Galluis, les Mesnuls, Gambais, les Essarts, Elancourt, Jouars-Pontchartrain,
                  Neauphle, Villiers-Saint-Frédéric, Beynes, Maule, Maulette, Thoiry, Chevreuse et
                  tous les villages environnants.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/10 pt-8 mb-8">
          <p className="text-whiteGray/70">
            &copy; {new Date().getFullYear()} L'Atelier des Frères d'Antan. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
