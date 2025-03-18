"use client";
// components/PrestationCard.jsx
import Image from 'next/image';

export default function ServicesCard({ service }) {
  return (
    <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100 h-[400px]">
      {/* Image section */}
      <div className="absolute inset-0">
        {service.img({ 
          className: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        })}
        {/* Gradient overlay with hover effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 group-hover:bg-black/70 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        {/* Title with modern design */}
        <h3 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
          {service.title}
        </h3>

        {/* Decorative line */}
        <div className="w-16 h-1 bg-white mx-auto mb-6 rounded-full group-hover:w-32 group-hover:bg-primary transition-all duration-500" />

        {/* Subtle description (optional) */}
        <p className="text-center text-white/80 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {service.description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}