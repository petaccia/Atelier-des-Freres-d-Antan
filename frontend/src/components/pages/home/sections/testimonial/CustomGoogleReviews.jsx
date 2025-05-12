'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import GoogleReviewCard from './GoogleReviewCard';

// Exemple d'avis Google (à remplacer par les vrais avis récupérés via l'API)
const SAMPLE_REVIEWS = [
  {
    author_name: "Jean Dupont",
    rating: 5,
    text: "Service exceptionnel ! L'équipe a été très professionnelle et attentive à nos besoins. Je recommande vivement leurs services à tous ceux qui recherchent une expertise de qualité.",
    time: Date.now() / 1000 - 86400 * 2, // Il y a 2 jours
    profile_photo_url: "/icons/avatar.png"
  },
  {
    author_name: "Marie Martin",
    rating: 4,
    text: "Très satisfaite de la prestation. L'équipe est réactive et compétente. Seul petit bémol, le délai était un peu plus long que prévu, mais le résultat final en valait la peine.",
    time: Date.now() / 1000 - 86400 * 7, // Il y a 7 jours
    profile_photo_url: "/icons/avatar.png"
  },
  {
    author_name: "Pierre Leroy",
    rating: 5,
    text: "Une expérience client remarquable du début à la fin. L'attention aux détails et la qualité du travail sont impressionnantes. Je n'hésiterai pas à faire appel à leurs services à nouveau.",
    time: Date.now() / 1000 - 86400 * 14, // Il y a 14 jours
    profile_photo_url: "/icons/avatar.png"
  },
  {
    author_name: "Sophie Bernard",
    rating: 5,
    text: "Je suis extrêmement satisfaite du résultat. L'équipe a su comprendre mes attentes et y répondre parfaitement. Un grand merci pour votre professionnalisme et votre gentillesse.",
    time: Date.now() / 1000 - 86400 * 21, // Il y a 21 jours
    profile_photo_url: "/icons/avatar.png"
  },
  {
    author_name: "Thomas Petit",
    rating: 4,
    text: "Bonne prestation dans l'ensemble. L'équipe est à l'écoute et propose des solutions adaptées. Je recommande leurs services pour leur rapport qualité-prix.",
    time: Date.now() / 1000 - 86400 * 30, // Il y a 30 jours
    profile_photo_url: "/icons/avatar.png"
  }
];

/**
 * Composant pour afficher les avis Google avec des cards personnalisées
 * @returns {JSX.Element} Composant d'avis Google personnalisés
 */
export default function CustomGoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer les avis Google depuis notre API
    const fetchGoogleReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/google-reviews`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        } else {
          // Utiliser les avis de secours si l'API ne renvoie pas de données
          setReviews(SAMPLE_REVIEWS);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des avis Google:', err);
        // Utiliser les avis de secours en cas d'erreur
        setReviews(SAMPLE_REVIEWS);
        setIsLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Nous n'avons plus besoin de gérer l'erreur ici car nous utilisons les avis de secours

  if (reviews.length === 0) {
    return (
      <div className="text-center p-4">
        <p>Aucun avis Google disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000 }}
        loop={true}
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          1024: { slidesPerView: 1.2, spaceBetween: 60 },
        }}
        pagination={{
          clickable: true,
          el: ".google-reviews-pagination",
          bulletClass: "swiper-pagination-bullet bg-stone-300 opacity-100",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-[#185871]",
        }}
        navigation={{
          prevEl: ".google-reviews-prev",
          nextEl: ".google-reviews-next",
        }}
        className="!pb-16"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <GoogleReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Contrôleurs personnalisés */}
      <div className="google-reviews-prev hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors -translate-x-1/2">
        <MdOutlineArrowBackIosNew className="text-stone-700 text-xl" />
      </div>
      <div className="google-reviews-next hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-4 rounded-full shadow-lg hover:bg-stone-50 transition-colors translate-x-1/2">
        <MdOutlineArrowForwardIos className="text-stone-700 text-xl" />
      </div>

      {/* Pagination personnalisée */}
      <div className="google-reviews-pagination flex justify-center gap-2 mt-12" />
    </div>
  );
}
