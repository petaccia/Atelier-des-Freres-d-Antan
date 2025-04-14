"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { partners } from "./partnersData";
import CardPartner from "./CardPartner";

export default function PartnersSection() {
  return (
    <section className="pb-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-whiteStone">Nos Partenaires</h2>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 2000 }}
            loop={true}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
            navigation={{
              prevEl: ".value-prev",
              nextEl: ".value-next",
            }}
            className=""
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-8">
              {partners.map((partner) => (
                <SwiperSlide key={partner.id}>
                  <CardPartner partner={partner} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          <div className="absolute top-1/2 left-0 z-10"></div>
          <div className="absolute top-1/2 right-0 z-10"></div>
        </div>
      </div>
    </section>
  );
}
