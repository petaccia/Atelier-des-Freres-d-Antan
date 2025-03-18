"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { testimonials } from "./testimonialsData";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import TestimonialCard from "./TestimonialCard";


export default function Testimonials() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-semibold text-blueLight mb-4">
            Témoignages
          </h2>
          <p className="text-lg text-whiteAmber max-w-2xl mx-auto">
            Découvrez l'expérience de nos clients et partenaires
          </p>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 5000 }}
            loop={true}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              1024: { slidesPerView: 1.2, spaceBetween: 60 }
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "swiper-pagination-bullet bg-stone-300 opacity-100",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-[#185871]"
            }}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next"
            }}
            className="!pb-16"
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                <TestimonialCard testimonial={testimonial}/>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Contrôleurs personnalisés */}
          <div className="testimonial-prev hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors -translate-x-1/2">
            <MdOutlineArrowBackIosNew className="text-stone-700 text-xl"/>
          </div>
          <div className="testimonial-next hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors translate-x-1/2">
            <MdOutlineArrowForwardIos className="text-stone-700 text-xl"/>
          </div>

          {/* Pagination personnalisée */}
          <div className="custom-pagination flex justify-center gap-2 mt-12"/>
        </div>
      </div>
    </section>
  );
}
