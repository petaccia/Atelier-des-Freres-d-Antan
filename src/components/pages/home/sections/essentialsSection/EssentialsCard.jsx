"use client";
import GenericButton from '@/components/ui/buttons/GenericButton';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function EssentialsCard({
  image,
  alt,
  title,
  description,
  icons,
  buttonText,
  href
}) {
  return (
    <div className="relative group flex-1 hover:transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 backdrop-blur-sm bg-white/5">
          <h3 className="text-white mb-2 sm:mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl">{title}</h3>
          
          <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-4 sm:mb-6 md:mb-8">
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              {description}
            </p>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {icons.map((icon, index) => (
                <div key={index} className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="p-2 sm:p-3 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-lg hover:bg-white/20 transition-colors">
                    {icon.component}
                  </div>
                  <span className="text-white text-xs sm:text-sm font-medium text-center">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <GenericButton>
            <Link href={href}
            className="flex items-center justify-center gap-1 bg-accent text-white py-2 sm:py-2.5 md:py-3 px-4 sm:px-4.5 md:px-5 rounded-full hover:bg-primary text-sm sm:text-base"
            icon={<MdOutlineKeyboardArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 pt-1 text-white" />}
            >
            {buttonText}
            </Link>
          </GenericButton>
        </div>
      </div>
    </div>
  );
}
