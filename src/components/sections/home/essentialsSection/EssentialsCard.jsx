"use client";
import GenericButton from '@/components/ui/buttons/GenericButton';
import Image from 'next/image';

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function EssentialsCard({
  image,
  alt,
  title,
  description,
  icons,
  buttonText
}) {
  return (
    <div className="relative group flex-1 hover:transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm bg-white/5">
          <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
          
          <div className="space-y-6 mb-8">
            <p className="text-lg text-white/90 leading-relaxed">
              {description}
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              {icons.map((icon, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-lg hover:bg-white/20 transition-colors">
                    {icon.component}
                  </div>
                  <span className="text-white text-sm font-medium text-center">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <GenericButton
            icon={<MdOutlineKeyboardArrowRight className="h-6 w-6 pt-1 text-white" />}
            className="flex items-center justify-center gap-1 bg-accent text-white py-3 px-5 rounded-full hover:bg-primary"
          >
            {buttonText}
          </GenericButton>
        </div>
      </div>
    </div>
  );
}