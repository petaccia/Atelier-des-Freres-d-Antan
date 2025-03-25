import ContactButton from '@/components/ui/buttons/ContactButton';
import Image from 'next/image';

export default function CarouselCard({ slide }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
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
      <div className="absolute bottom-1/6 left-1/10 md:bottom-1/4 md:left-1/5 bg-gray-900/70 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-auto rounded-2xl z-20 5 p-6 text-center" >
        <div className="max-w-xs md:max-w-xl mx-auto mt-8">


          {/* Titre, texte et citation */}
          <h3 className="h-16 text-accent mb-12 ">{slide.title}</h3>
          <p className="h-10 text-white text-sm md:text-lg max-w-2xl mb-4">{slide.text}</p>
          <blockquote className="h-10 text-white italic text-lg md:text-xl mb-8 md:mb-4">{slide.quote}</blockquote>

          <div className="flex justify-center gap-2 ">
            <div className="w-1/3 h-1 bg-blue-500"></div>
            <div className="w-1/3 h-1 bg-white"></div>
            <div className="w-1/3 h-1 bg-red-500"></div>
          </div>
        </div>
        {/* Bouton de contact */}
        <div className="flex justify-center items-center mt-8">
        <ContactButton
          className=" bg-accent/30 hover:bg-primary/30 mb-4" />
        </div>
      </div>
    </div>
  )
}