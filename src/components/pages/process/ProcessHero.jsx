"use client";
import Image from "next/image";

export default function ProcessHero({ title, description }) {
  return (
    <div className="relative mb-20 sm:mb-24">
      {/* Section image avec overlay */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] mb-12 overflow-hidden">
        <Image
          src="/img/process/process-hero.jpg"
          alt="Processus de travail - Atelier des Frères d'Antan"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />

        {/* Contenu superposé sur l'image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="sr-only">{title}</h1>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-primary uppercase tracking-widest">
            {title}
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-whiteGray text-base sm:text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-8 border-2 border-accent-light border-b-0 border-r-0 rotate-[225deg]"></div>
      </div>
    </div>
  );
}
