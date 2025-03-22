"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

import { partners} from "./partnersData";
import CardPartner from "./CardPartner"


export default function PartnersSection() {
return(
   <section className="py-16 bg-primary">
    <div className="container mx-auto px-40">
      <h2 className="text-center">
        Nos Partenaires
        </h2>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 2000 }}
            loop={true}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 }
            }}
            navigation={{
              prevEl: ".value-prev",
              nextEl: ".value-next"
            }}
            className="!pb-16"
          >
      <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-7 gap-8"> 
          {partners.map((partner) => (
            <SwiperSlide>
          <CardPartner key={partner.id} partner={partner} />
          </SwiperSlide>
          ))}
          </div>
          </Swiper>
          <div className="absolute top-1/2 left-0 z-10"></div>
          <div className="absolute top-1/2 right-0 z-10"></div>
      </div>
    </div>
   </section>
)
}