import ContactButton from '@/components/ui/buttons/ContactButton';
import Image from 'next/image';

export default function CarouselCard({ slide }) {
  return (
    <div className="relative h-screen overflow-hidden">
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
      <div className="absolute top-1/3 left-1/3  bg-gray-900/70 w-[40%] h-[40%] rounded-2xl z-20 5 p-6 text-center" >
        <div className="max-w-xl mx-auto mt-8">


          {/* Titre, texte et citation */}
          <h3 className="text-accent mb-4">{slide.title}</h3>
          <p className="h-12 text-white text-base md:text-lg max-w-2xl mb-6">{slide.text}</p>
          <blockquote className="text-white italic text-lg md:text-xl mb-12">{slide.quote}</blockquote>

          <div className="flex justify-center gap-2  ">
            <div className="w-1/3 h-1 bg-blue-500"></div>
            <div className="w-1/3 h-1 bg-white"></div>
            <div className="w-1/3 h-1 bg-red-500"></div>
          </div>
        </div>
        <ContactButton
          className="absolute bg-accent/30 hover:bg-primary/30 bottom-8 left-1/2 transform -translate-x-1/2" />
      </div>
    </div>
  )
}