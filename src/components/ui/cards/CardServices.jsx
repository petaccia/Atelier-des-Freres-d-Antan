// components/PrestationCard.jsx
"use client";
import Image from "next/image";
import GenericButton from "@/components/ui/buttons/GenericButton";
import Link from "next/link";

export default function CardServices({ service }) {
  return (
    <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100 h-[400px]">
      {/* Front side - visible by default, hidden on hover */}
      <div className="absolute inset-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0 group-hover:pointer-events-none">
        {/* Image section */}
        <div className="absolute inset-0">
          <Image
            src={service.img}
            alt={service.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-1000"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <h3 className="text-center mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {service.title}
          </h3>
          <div className="w-16 h-1 bg-white mx-auto mb-6 rounded-full" />
        </div>
      </div>

      {/* Back side - hidden by default, visible on hover */}
      <div className="absolute inset-0 bg-primary p-8 flex flex-col justify-center items-center text-white opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <h3 className="text-center mb-6">{service.title}</h3>
        <p className="text-center text-white/90 text-lg mb-8">{service.description}</p>
        <Link href={service.href || "#"}>
          <GenericButton className="px-8 py-3 bg-primary text-white rounded-full border-2 border-white font-semibold hover:bg-accent transition-colors">
            En savoir plus
          </GenericButton>
        </Link>
      </div>
    </div>
  );
}
