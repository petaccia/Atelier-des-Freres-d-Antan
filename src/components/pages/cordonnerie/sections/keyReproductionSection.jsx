"use client";
import Image from "next/image";
import GenericButton from "@/components/ui/buttons/GenericButton";

export default function KeyReproductionSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-white mb-12">
          Reproduction de Clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image avec bordure, ombre et effet de survol */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden group border-2 border-primary shadow-lg shadow-accent/50">
            <Image
              src="/img/cordonnerie/sections/services/machine_key.webp" // Remplacez par le chemin de votre image
              alt="Reproduction de clés"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
          </div>
          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-whiteGray leading-relaxed">
              Chez l'Atelier des Frères d'Antan, nous reproduisons vos clés avec précision et rapidité. Nos services incluent :
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Clés standard et sécurisées</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Clés de voiture et de maison</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Duplication de clés anciennes</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-whiteGray text-lg sm:text-xl">Réparation de clés cassées</span>
              </li>
            </ul>
            <div className="mt-8">
              <GenericButton className="px-10 py-4 bg-accent text-white rounded-full border-2 border-primary font-semibold hover:bg-primary transition-colors transform hover:scale-105 active:scale-95">
                Prendre rendez-vous
              </GenericButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}