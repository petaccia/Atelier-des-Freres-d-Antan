"use client";
import Image from "next/image";
import GenericButton from "@/components/ui/buttons/GenericButton";

export default function ContentImageSection({
  bgColor,
  title,
  imageSrc,
  imageAlt,
  content,
  services,
  buttonText,
  imagePosition,
  id,
}) {
  return (
    <section id={id} className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <h2 className={
          `text-center 
          ${bgColor === "bg-black" || bgColor === "bg-primary" ? "text-whiteAmber" : "text-primary"} }
          mb-12`
          }
        >
          {title}
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center `}>
          {/* Image avec bordure, ombre et effet de survol */}
          <div className={`relative h-64 md:h-96 rounded-2xl overflow-hidden group border-2 border-white shadow-lg shadow-accent/50 ${imagePosition === "right" ? "md:order-last" : ""}` }> 
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
          </div>
          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-whiteGray leading-relaxed">
              {content}
            </p>
            <ul className="space-y-4">
              {services.map ((service, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent text-2xl mr-4">✓</span>
                  <span className="text-whiteGray text-lg sm:text-xl">{service}</span>
                </li>
              ))}  
            </ul>
            <div className="mt-8">
              <GenericButton className={`px-10 py-4 bg-accent text-white rounded-full border-2 border-white font-semibold ${bgColor === "bg-primary" ?"hover:bg-black" : "hover:bg-primary"} transition-colors transform hover:scale-105 active:scale-95 duration-300`}>
                {buttonText}
              </GenericButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 