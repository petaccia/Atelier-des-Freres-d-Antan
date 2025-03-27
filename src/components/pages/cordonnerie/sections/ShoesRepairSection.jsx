"use client";
import Image from "next/image";
import GenericButton from "@/components/ui/buttons/GenericButton";

export default function ShoeRepairSection() {
  return (
    <section className="py-20 bg-black"> {/* Fond noir */}
      <div className="container mx-auto px-4">
         <h2 className="text-center  text-whiteAmber mb-12">
          Réparation de Chaussures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image avec effet de survol */}
          <div className="relative h-64 md:h-96 shadow-2xl shadow-whiteAmber/30 rounded-2xl border-2 border-whiteAmber overflow-hidden group">
            <Image
              src="/img/cordonnerie/sections/services/shoes-repair.jpg"
              alt="Réparation de chaussures"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
          </div>
          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-whiteGray leading-relaxed">
              Chez l'Atelier des Frères d'Antan, nous redonnons vie à vos chaussures préférées avec un savoir-faire artisanal. Nos services complets incluent :
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Réparation de talons et semelles</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Couture et remplacement de tiges</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Nettoyage et conditionnement du cuir</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Ressemelage et réparation de trépointes</span>
              </li>
            </ul>
            <div className="mt-8">
              <GenericButton className="px-10 py-4 bg-accent text-whiteGray rounded-full border-2 border-white font-semibold hover:bg-primary transition-colors transform hover:scale-105 active:scale-95">
                Prendre rendez-vous
              </GenericButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}