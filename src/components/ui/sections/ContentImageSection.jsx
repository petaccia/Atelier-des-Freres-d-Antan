"use client";
import Image from "next/image";
import GenericButton from "@/components/ui/buttons/GenericButton";
import Link from "next/link";

export default function ContentImageSection({
  bgColor,
  title,
  imageSrc,
  imageAlt,
  images,
  content,
  services,
  buttonText,
  imagePosition,
  id,
  href,
}) {
  // Vérifie si nous avons un tableau d'images ou une image unique
  const hasMultipleImages = Array.isArray(images) && images.length > 0;
  const imageContent = hasMultipleImages ? images : [{ src: imageSrc, alt: imageAlt }];

  return (
    <section id={id} className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-center
          ${bgColor === "bg-black" || bgColor === "bg-primary" ? "text-whiteAmber" : "text-primary"}
          mb-12`}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Section images */}
          <div className={`${imagePosition === "right" ? "md:order-last" : ""}`}>
            {hasMultipleImages ? (
              // Grille pour plusieurs images
              <div className="grid grid-cols-2 gap-4">
                {imageContent.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-40 md:h-48 rounded-2xl overflow-hidden group border-2 border-white shadow-lg shadow-accent/50"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                  </div>
                ))}
              </div>
            ) : (
              // Une seule image
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden group border-2 border-white shadow-lg shadow-accent/50">
                <Image
                  src={imageContent[0].src}
                  alt={imageContent[0].alt}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-whiteGray leading-relaxed">{content}</p>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent text-2xl mr-4">✓</span>
                  <span className="text-whiteGray text-lg sm:text-xl">{service}</span>
                </li>
              ))}
            </ul>
            <Link href={href} className="mt-8">
              <GenericButton
                className={`px-10 py-4 bg-accent text-white rounded-full border-2 border-white font-semibold ${bgColor === "bg-primary" ? "hover:bg-black" : "hover:bg-primary"} transition-colors transform hover:scale-105 active:scale-95 duration-300`}
              >
                {buttonText}
              </GenericButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
