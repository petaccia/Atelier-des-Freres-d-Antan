"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import CarouselCard from "./components/carouselCard/CarouselCard";
import MapButton from "../buttons/MapButton";
import ShopAddress from "../shopAddress/ShopAddress";

export default function Carousel( { slides }) {
 

  return (
    <>
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{ delay: 5000, waitForTransition: true }} // Ajout delai d'attente
      pagination={false} // Désactivation de la pagination
      navigation={false} // Désactivation des flèches de navigation
      speed={1000} // Vitesse de transition
      spaceBetween={0}  // Espace entre les slides
      slidesPerView={1}
      loop={true} // Boucle infinie
      breakpoints={{
        768: { slidesPerView: 1 }, // Nombre de slides à afficher en fonction de la largeur de l'écran
        1024: { slidesPerView: 1 }, // Nombre de slides à afficher en fonction de la largeur de l'écran
      }}
      className="relative w-full h-full   z-0" // Hauteur fixe pour le carousel
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <CarouselCard slide={slide} />
          <div className="hidden md:block">
          <MapButton destination={ShopAddress()} />
          </div>
        </SwiperSlide>
  ))
}
    </Swiper >
    <div className="md:hidden flex justify-center mt-10">
        <MapButton destination={ShopAddress()} />
      </div>
    </>
  );
}
