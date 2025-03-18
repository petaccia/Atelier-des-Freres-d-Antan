"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardValue from "./CardValue";
import { valuesData } from "./valuesData";

export default function ValueSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-whiteAmber to-stone-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-16 text-stone-800">
          Nos Valeurs
        </h2>
        
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5000 }}
            loop={true}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            navigation={{
              prevEl: ".value-prev",
              nextEl: ".value-next"
            }}
            className="!pb-16"
          >
            {valuesData.map((value, idx) => (
              <SwiperSlide key={idx}>
                <CardValue value={value} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Contrôles de navigation */}
          <div className="value-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors -translate-x-1/2">
            <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="value-next absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors translate-x-1/2">
            <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}