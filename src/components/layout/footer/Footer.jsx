"use client";

import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import logo from "../../../../public/logo/logo-blue.svg"
import Link from "next/link";
import { getMapsUrl } from "@/utils/getMapsUrl";
import ShopAddress from "@/components/ui/shopAddress/ShopAddress";

export default function Footer() {
  return (
    <footer className="bg-black text-primary py-12">
      <div className="w-full flex flex-col items-center justify-center">
        {/* Section Logo et Description */}
        <div className="w-full flex items-center justify-center mb-12">
          <div className="space-y-4">
            <Image src={logo} alt="Logo" width={200} height={200} className="mx-auto" />
           
          </div>
          </div>
        <div className="w-full  grid grid-cols-1 md:grid-cols-5 justify-items-center gap-8 mb-16">
          {/* Section Adresse et Horaires */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">L'Atelier</h3>
            <Link
              href={getMapsUrl(ShopAddress())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3">
              <FiMapPin className="w-5 h-5 text-accent mt-1" />
              <p className="text-white/80  hover:text-accent transition-colors">
                1 rue de Sancé, 78490 Montfort l'Amaury
              </p>
            </Link>
            <div className="flex items-start gap-3">
              <FiClock className="w-5 h-5 text-accent mt-1" />
              <div>
                <p className="text-white/80">Mar : 14h30-19h</p>
                <p className="text-white/80">Me-Sam : 10h-13h30 / 14h30-19h</p>
                <p className="text-white/80">Dim : 10h-13h30</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiPhone className="w-5 h-5 text-accent mt-1" />
              <p className="text-white/80">Tél. 01 34 84 07 84</p>
            </div>
            <p className="text-white/80">
              Interventions sur rendez-vous pour la serrurerie
            </p>
          </div>

          {/* Section Nos Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li><a href="/serrurerie" className="text-white/80 hover:text-accent transition-colors">Serrurerie dépannage</a></li>
              <li><a href="/cordonnerie" className="text-white/80 hover:text-accent transition-colors">Cordonnerie</a></li>
              <li><a href="/bourrellerie" className="text-white/80 hover:text-accent transition-colors">Bourrellerie</a></li>
            </ul>
          </div>

          {/* Section Nos Garanties */}
          <div>
            <h3 className="text-xl font-bold mb-6">Nos Garanties</h3>
            <ul className="space-y-3">
              <li><a href="/engagements" className="text-white/80 hover:text-accent transition-colors">Nos engagements</a></li>
              <li><a href="/savoir-faire" className="text-white/80 hover:text-accent transition-colors">Nos savoir-faire</a></li>
              <li><a href="/cgv" className="text-white/80 hover:text-accent transition-colors">Conditions Générales de Vente</a></li>
            </ul>
          </div>

          {/* Section Zone d'Intervention */}
          <div>
            <h3 className="text-xl font-bold mb-6">Notre Zone d'Intervention</h3>
            <p className="text-white/80 mb-4">
              Montfort l'Amaury, Garancières, Houdan, La Queue-les-Yvelines, Galluis, les Mesnuls, Gambais, les Essarts, Elancourt, Jouars-Pontchartrain, Neauphle, Villiers-Saint-Frédéric, Beynes, Maule, Maulette, Thoiry, Chevreuse et tous les villages environnants.
            </p>
            <p className="text-white/80">
              Bref, une grande partie des Yvelines !
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">UNE QUESTION ?</h3>
            <div className="flex items-start gap-3 mb-4">
              <FiPhone className="w-5 h-5 text-accent mt-1" />
              <p className="text-white/80">Téléphone : 07 88 41 63 91</p>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <FiMail className="w-5 h-5 text-accent mt-1" />
              <p className="text-white/80">Mail : contact@freresdantan.fr</p>
            </div>
            <a href="/faq" className="text-white/80 hover:text-accent transition-colors">FAQ</a>
          </div>
        </div>

        {/* Section Contact et Réseaux Sociaux */}
        <div className="w-full flex flex-col items-center justify-center mb-8">
          {/* Section Une Question ? */}
         

          {/* Section Réseaux Sociaux */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-6">Suivez-nous</h3>
            <div className="flex gap-6">
              <a href="#" className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#E4405F] hover:text-[#E4405F]/80 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/80 border-t border-white/10 pt-8">
          <p>&copy; {new Date().getFullYear()} L'Atelier des Frères d'Antan. Tous droits réservés.</p>
          <p className="mt-2">Serrurerie serrurier pages jaunes Yvelines</p>
        </div>
      </div>
    </footer>
  );
}