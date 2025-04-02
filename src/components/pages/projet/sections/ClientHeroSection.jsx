"use client";
import GenericButton from "@/components/ui/buttons/GenericButton";
import Image from "next/image";

export default function ClientHeroSection() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center z-0">
      <div className="absolute inset-0">
        <Image
          src="/img/projet/client.png"
          alt="Atelier des Frères d'Antan"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="lg:text-5xl font-bold text-white mb-6">
          Bienvenue à l'Atelier des Frères d'Antan
        </h1>
        <p className="text-lg md:text-xl text-whiteGray mb-8">
          Votre partenaire de confiance pour des services de qualité
        </p>
        <GenericButton className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
          Prendre rendez-vous
        </GenericButton>
      </div>
    </section>
  );
}