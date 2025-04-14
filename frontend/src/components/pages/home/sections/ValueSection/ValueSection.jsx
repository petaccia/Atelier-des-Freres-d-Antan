"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardValue from "./CardValue";
import { valuesData } from "./valuesData";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function ValueSection() {
  return (
    <section className="bg-gradient-to-b from-whiteAmber to-whiteAmber/40">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-stone-800">Nos Valeurs</h2>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5000 }}
            loop={true}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".value-prev",
              nextEl: ".value-next",
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
          <div className="value-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors -translate-x-1/2 hidden md:block">
            <MdOutlineKeyboardArrowLeft className="w-6 h-6  text-stone-700" />
          </div>
          <div className="value-next absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors translate-x-1/2 hidden md:block">
            <MdOutlineKeyboardArrowRight className="w-6 h-6 text-stone-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
