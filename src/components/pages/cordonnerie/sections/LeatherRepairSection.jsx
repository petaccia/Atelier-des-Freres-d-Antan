"use client";
import Image from "next/image";
import GenericButton from "@/components/ui/buttons/GenericButton";

export default function LeatherRepairSection() {
  return (
    <section className="py-20 bg-black ">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-white mb-12">
          Réparation de Maroquinerie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-whiteGray leading-relaxed">
              Notre atelier spécialisé redonne une seconde vie à vos articles en cuir. Nous proposons des services de réparation et de restauration pour :
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Sacs à main et sacs à dos</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Portefeuilles et étuis</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Ceintures et accessoires en cuir</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Restauration de pièces anciennes</span>
              </li>
            </ul>
            <div className="mt-8">
              <GenericButton className="px-10 py-4 bg-accent text-white rounded-full border-2 border-primary font-semibold hover:bg-primary transition-colors transform hover:scale-105 active:scale-95">
                Prendre rendez-vous
              </GenericButton>
            </div>
          </div>
          {/* Image avec bordure, ombre et effet de survol */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden group border-2 border-primary shadow-lg shadow-accent/50">
            <Image
              src="/img/cordonnerie/sections/services/leatherwork.jpg" // Remplacez par le chemin de votre image
              alt="Réparation de maroquinerie"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}