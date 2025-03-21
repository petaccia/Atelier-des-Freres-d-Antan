'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'

const realizations = [
  {
    id: 1,
    image: '/img/sections/realizations/bag.webp',
    title: 'Réparation de sac',
    description: 'Redonner vie à un sac en cuir usé'
  },
  {
    id: 2,
    image: '/img/sections/realizations/door-handle.webp',
    title: 'Création de clé unique',
    description: 'Fabrication artisanale d\'une clé sur mesure'
  },
  {
    id: 3,
    image: '/img/sections/realizations/leather-care.webp',
    title: 'Entretien de vos chaussures en cuir',
    description: 'Remise en beauté de vos chaussures en cuir'
  },
  {
    id: 4,
    image: '/img/sections/realizations/leather-edge-repair.webp',
    title: 'Ressemelage de vos chaussures en cuir',
    description: 'Remise en état de vos chaussures en cuir'
  },
  {
    id: 5,
    image: '/img/sections/realizations/lock-door.webp',
    title: 'Installation de serrure multi-points sur votre porte ',
    description: 'Amelioration de la sécurité de votre porte'
  },
  {
    id: 6,
    image: '/img/sections/realizations/roller-shutter.webp',
    title: 'Réparation de votre volet roulant ',
    description: 'Remise en état de votre volet roulant existant'
  },
]

export default function RealizationsSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12 lg:mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blueLight">
            Nos Réalisations
          </span>
        </h2>

        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="w-full"
          >
            {realizations.map((realization) => (
              <SwiperSlide key={realization.id}>
                <div className="relative aspect-square rounded-lg md:rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={realization.image}
                    alt={realization.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
         
      </div>
    </section>
  )
}