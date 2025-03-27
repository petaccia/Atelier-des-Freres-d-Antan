"use client";
import Image from "next/image";
import GenericButton from "@/components/ui/buttons/GenericButton";

export default function ShoeRepairSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-white mb-12">
          Réparation de Chaussures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image avec bordure, ombre et effet de survol */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden group border-2 border-white shadow-lg shadow-accent/50"> {/* Bordure et ombre */}
            <Image
              src="/img/cordonnerie/shoe-repair.jpg" // Remplacez par le chemin de votre image
              alt="Réparation de chaussures"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
          </div>
          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Chez l'Atelier des Frères d'Antan, nous redonnons vie à vos chaussures préférées avec un savoir-faire artisanal. Nos services complets incluent :
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-gray-300 text-lg sm:text-xl">Réparation de talons et semelles</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-gray-300 text-lg sm:text-xl">Couture et remplacement de tiges</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-gray-300 text-lg sm:text-xl">Nettoyage et conditionnement du cuir</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent text-2xl mr-4">✓</span>
                <span className="text-gray-300 text-lg sm:text-xl">Ressemelage et réparation de trépointes</span>
              </li>
            </ul>
            <div className="mt-8">
              <GenericButton className="px-10 py-4 bg-accent text-white rounded-full border-2 border-white font-semibold hover:bg-primary transition-colors transform hover:scale-105 active:scale-95">
                Prendre rendez-vous
              </GenericButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 