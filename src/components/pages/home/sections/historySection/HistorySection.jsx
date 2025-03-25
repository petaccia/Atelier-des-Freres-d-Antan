"use client";
import Image from "next/image";
import historyImage from "../../../../../../public/img/sections/history/freres.webp";
import GenericButton from "@/components/ui/buttons/GenericButton";

export default function HistorySection() {
  // Calculer le ratio d'aspect de l'image
  const aspectRatio = (historyImage.height / historyImage.width) * 100;

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Conteneur d'image responsive */}
          <div className="relative w-full mx-auto rounded-3xl overflow-hidden shadow-2xl"
            style={{ 
              paddingTop: `${aspectRatio}%`,
              maxWidth: 'min(100vw, 700px)', // Ajusté pour 768px
            }}>
            <Image
              src={historyImage}
              alt="Atelier des Frères d'Antan"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 90vw, (max-width: 1024px) 70vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Contenu */}
          <div className="text-white">
            <h2 className="mb-6 sm:mb-8">
              L'aventure Atelier des Frères d'Antan
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
              <p>
                Nous sommes deux frères : Guillaume et Nicolas. L'un serrurier et l'autre cordonnier. 
                Nous sommes fils d'artisans et avons passé plus de 12 ans dans l'entreprise familiale.
              </p>
              <p>
                À la retraite de nos parents, nous avons décidé de mettre nos savoir-faire au service 
                de notre région natale. C'est ainsi qu'est né Atelier des Frères d'Antan.
              </p>
              <p>
                Un lieu à notre image : authentique, convivial et valorisant nos savoir-faire.
              </p>
            </div>
            {/* Bouton centré sous le texte */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <GenericButton
                className="bg-black/30 text-white font-bold px-8 py-3 rounded-full hover:text-black hover:bg-accent transition-colors duration-300"
                href="/contact"
              >
                Notre histoire
              </GenericButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}