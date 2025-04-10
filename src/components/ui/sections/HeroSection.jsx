"use client";
import GenericButton from "@/components/ui/buttons/GenericButton";
import Image from "next/image";

export default function HeroSection({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  buttonText,
  buttonLink = "#",
  overlayColor = "bg-black/40",
  height = "h-[60vh]",
  children
}) {
  return (
    <section className={`relative ${height} flex items-center justify-center z-0`}>
      {/* Image d'arrière-plan avec overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
        />
        <div className={`absolute inset-0 ${overlayColor}`} />
      </div>
      
      {/* Contenu */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        {title && (
          <h1 className="lg:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
        )}
        
        {subtitle && (
          <p className="text-lg md:text-xl text-whiteGray mb-8">
            {subtitle}
          </p>
        )}
        
        {buttonText && (
          <GenericButton 
            href={buttonLink}
            className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {buttonText}
          </GenericButton>
        )}
        
        {children}
      </div>
    </section>
  );
}
