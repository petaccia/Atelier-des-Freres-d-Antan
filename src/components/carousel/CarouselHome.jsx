"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { carouselSlides } from "./data/carouselSlides";

export default function CarouselHome() {
  

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{ delay: 5000, waitForTransition: true }} // Ajout delai d'attente
      pagination={false} // Désactivation de la pagination
      navigation={false} // Désactivation des flèches de navigation
      speed={1000} // Vitesse de transition
      spaceBetween={0}  // Espace entre les slides
      slidesPerView={1} 
      breakpoints={{
        768: { slidesPerView: 1 }, // Nombre de slides à afficher en fonction de la largeur de l'écran
        1024: { slidesPerView: 1 }, // Nombre de slides à afficher en fonction de la largeur de l'écran
      }}
      className="w-full h-[400px] md:h-[500px] lg:h-[600px] z-0" // Hauteur fixe pour le carousel
    >
      {carouselSlides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            {/* Image qui prend toute la largeur et hauteur */}
            <Image
              src={slide.href} // Chemin de l'image
              alt={slide.title}
              fill // Remplir le conteneur parent
              className="object-cover" // Ajuste l'image pour couvrir tout le conteneur
            />
            {/* Contenu superposé (titre, texte, citation) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
              <h3 className="text-xl font-semibold">{slide.title}</h3>
              <p className="text-sm">{slide.text}</p>
              <blockquote className="italic text-sm">{slide.quote}</blockquote>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}