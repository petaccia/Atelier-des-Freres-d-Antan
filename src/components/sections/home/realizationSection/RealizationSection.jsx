'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules' // Ajout de EffectCoverflow [[8]]
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
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
    <section className="py-24">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Réalisations
          </h2>
          <p className="text-gray-600 text-lg">
            L'excellence artisanale en image
          </p>
        </div>

        <div className="relative bg-white">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]} // Ajout du module
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
            currentClass: 'swiper-pagination-current',
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { 
              slidesPerView: 5, 
              spaceBetween: 40 
            }
          }}
          centeredSlides={true}
          className="!overflow-visible"
        >
            {realizations.map((realization) => (
              <SwiperSlide key={realization.id}>
                <div className="relative aspect-square ">
                  <Image
                    src={realization.image}
                    alt={realization.title}
                    fill
                    className="object-cover shadow-2xl rounded-2xl"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={realization.id === 1}
                  />
                  <div className="absolute inset-0  p-6 flex flex-col justify-end">
                    <div className="max-w-2xl mx-auto text-center">
                     
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <div className="swiper-button-next !scale-75 !text-primary hover:!text-primary-dark !transition-colors" />
          <div className="swiper-button-prev !scale-75 !text-primary hover:!text-primary-dark !transition-colors" />

          {/* Pagination */}
          <div className="swiper-pagination !bottom-0 [--swiper-pagination-bullet-size:12px] [--swiper-pagination-bullet-inactive-color:theme(colors.gray.300)] [--swiper-pagination-color:theme(colors.primary)]" />
        </div>
      </div>
    </section>
  )
}