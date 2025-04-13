import ContactButton from "@/components/ui/buttons/ContactButton";
import Image from "next/image";
import "./carouselCard.css";

export default function CarouselCard({ slide }) {
  return (
    <div className="relative w-full h-[60vh] md:h-screen overflow-hidden">
      {/* Image principale */}
      <Image
        src={slide.href} // Chemin de l'image
        alt={slide.title}
        fill // Remplir le conteneur parent
        className="object-cover" // Ajuste l'image pour couvrir tout le conteneur
      />
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>

      {/* Lignes horizontales en haut */}
      <div className="absolute  bottom-1/5 left-1/10  sm:left-1/5 md:bottom-[40%] md:left-1/4  bg-gray-900/70 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-[300px] sm:h-[450px] md:h-[450px] rounded-2xl z-20 5 p-6 text-center">
        <div className="max-w-xs md:max-w-xl mx-auto space-y-2 sm:space-y-4 ">
          {/* Titre, texte et citation */}
          <h3 className="h-14 sm:h-16 text-accent-light mb-1 xs:mb-12  ">{slide.title}</h3>
          <p className="h-2 sm:h-14 md:h-12 text-white max-w-2xl mb-12 md:my-8 ">{slide.text}</p>
          <blockquote className="h-10 sm:h-10 md:h-12 text-white italic   sm:mb-8 md:my-12">
            {slide.quote}
          </blockquote>

          <div className="flex justify-center gap-2 h-2">
            <div className="w-1/3 h-1 bg-blue-500"></div>
            <div className="w-1/3 h-1 bg-white"></div>
            <div className="w-1/3 h-1 bg-red-500"></div>
          </div>
        </div>
        {/* Bouton de contact */}
        <div className="button-container flex justify-center items-center mt-12 sm:mt-8">
          <ContactButton className=" bg-accent/30 hover:bg-primary/30 mb-4" />
        </div>
      </div>
    </div>
  );
}
