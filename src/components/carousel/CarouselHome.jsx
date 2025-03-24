"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { carouselSlides } from "./data/carouselSlides";
import CarouselCard from "./components/CarouselCard";
import MapButton from "../ui/buttons/MapButton";

export default function CarouselHome() {
 const shopAdress = "https://www.google.com/maps/place/Serrurerie+Cordonnerie+Bourrellerie+des+Yvelines+-+Atelier+des+Frères+d'Antan/@48.7765017,1.8048008,17z/data=!3m1!4b1!4m6!3m5!1s0xa6c1002cb0eabefd:0xa27ade113f066152!8m2!3d48.7764982!4d1.8073757!16s%2Fg%2F11k9yksj1p?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNjM5SAFQAw%3D%3D"

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
      className="relative w-full h-full  z-0" // Hauteur fixe pour le carousel
    >
      {carouselSlides.map((slide, index) => (
        <SwiperSlide key={index}>
          <CarouselCard slide={slide} />
          <MapButton destination={shopAdress} />
        </SwiperSlide>
  ))
}
    </Swiper >
  );
}