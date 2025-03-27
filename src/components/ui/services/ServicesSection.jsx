// app/(landing)/prestations/page.jsx
"use client";

import { services } from "../../pages/home/sections/servicesSection/servicesData";

export default function ServicesSection( { ServicesCard }) {
  return (
    <section className="py-16 bg-gradient-to-b from-whiteAmber to-whiteAmber/40">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-gray-800">
          Nos Prestations Artisanales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

