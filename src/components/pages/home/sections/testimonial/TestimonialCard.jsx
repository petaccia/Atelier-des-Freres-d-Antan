import Image from "next/image";
import { FaQuoteRight, FaStar } from "react-icons/fa";

export default function TestimonialCard({ testimonial }) {
  return (
    <div
      className="relative flex flex-col lg:flex-row gap-6 p-5 lg:p-8 bg-white rounded-[25px] lg:rounded-[35px] shadow-md lg:shadow-lg hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 h-[450px] sm:h-[400px] lg:h-[350px] overflow-hidden group"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)" }}
    >
      {/* Effet de fond animé */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)" }}
      />

      {/* Forme décorative */}
      <div className="absolute -right-12 -top-12 w-40 h-40 lg:w-56 lg:h-56 bg-primary/10 rounded-full transform rotate-45 group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-500" />

      <div className="flex-shrink-0 z-10">
        <div className="relative w-28 h-28 lg:w-40 lg:h-40 mx-auto lg:mx-0">
          <div className="absolute inset-0 bg-primary/10 rounded-[18px] lg:rounded-[25px] transform rotate-12" />
          <Image
            src={testimonial.image || "/icons/avatar.png"}
            alt={testimonial.name}
            className="relative w-full h-full object-cover rounded-[18px] lg:rounded-[25px] border-2 border-white shadow-sm lg:shadow-md"
          />
          <div className="absolute -top-3 -left-3 lg:-top-5 lg:-left-5 bg-white/90 backdrop-blur-sm p-2 lg:p-3 rounded-md lg:rounded-lg shadow-xs lg:shadow-sm">
            <FaQuoteRight className="text-xl lg:text-2xl" style={{ color: testimonial.color }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 h-5 lg:h-full z-10">
        <div className="text-lg lg:text-xl text-stone-700 leading-relaxed mb-3 lg:mb-5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-stone-100 max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]">
          "{testimonial.text}"
        </div>
        <div className="border-t border-stone-200 pt-3 lg:pt-5">
          <h4 className="text-base lg:text-lg font-semibold text-stone-800">{testimonial.name}</h4>
          <p className="text-stone-600 mt-1 text-xs lg:text-sm">{testimonial.title}</p>
          <div className="flex items-center gap-2 mt-2 lg:mt-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-xs lg:text-sm" />
              ))}
            </div>
            <span className="text-xs lg:text-sm text-stone-500">4.9/5 sur 127 avis</span>
          </div>
        </div>
      </div>

      {/* Effet de bordure animé */}
      <div
        className="absolute inset-0 rounded-[25px] lg:rounded-[35px] border border-transparent group-hover:border-primary/20 transition-all duration-500 pointer-events-none"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)" }}
      />
    </div>
  );
}
