"use client";
import { FaLeaf, FaUserFriends, FaAward, FaRecycle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const values = [
  {
    title: "Savoir-Faire Artisanal",
    description: "3 générations d'expertise pour perpétuer l'art du cuir et de la serrurerie",
    icon: <FaAward className="text-5xl" />,
    color: "text-accent"
  },
  {
    title: "Innovation Traditionnelle",
    description: "Alliance de techniques ancestrales et matériaux modernes",
    icon: <FaLeaf className="text-5xl" />,
    color: "text-primary"
  },
  {
    title: "Engagement Client",
    description: "Une relation personnalisée comme une histoire à part",
    icon: <FaUserFriends className="text-5xl" />,
    color: "text-secondary"
  },
  {
    title: "Durabilité",
    description: "Choix éco-responsables pour un héritage durable",
    icon: <FaRecycle className="text-5xl" />,
    color: "text-tertiary"
  }
];

export default function CarouselValue() {
  return (
    <section className="py-20 bg-gradient-to-b from-whiteAmber to-stone-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-16 text-stone-800">
          Nos Valeurs
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-stone-300',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-accent'
          }}
          className="max-w-5xl mx-auto"
        >
          {values.map((value, idx) => (
            <SwiperSlide key={idx}>
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                {/* Fond décoratif */}
                <div className={`absolute inset-0 opacity-5 ${value.color.replace('text', 'bg')}`} />
                
                <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
                  {/* Icône avec effet de profondeur */}
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full blur-lg ${value.color.replace('text', 'bg')} opacity-20`} />
                    <div className={`${value.color} relative z-10 p-6 rounded-2xl bg-white shadow-md`}>
                      {value.icon}
                    </div>
                  </div>

                  {/* Contenu texte */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-stone-800 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}