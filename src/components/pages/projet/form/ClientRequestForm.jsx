"use client";
import Image from "next/image";
import { servicesClientData } from "../data/servicesClientData";

export default function ClientRequestForm() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-whiteAmber text-center text-3xl font-bold mb-8">
          Faites votre demande
        </h2>

        <form className="mt-10">
         {/* sélection du type de projet */}
         <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-4">Type de projet</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {servicesClientData.map((service, index) => (
              <button
                key={index}
                type="button"
                className="flex flex-col gap-4 items-center justify-center p-6 border-2 border-whiteAmber rounded-lg hover:bg-whiteAmber hover:text-black transition-colors duration-300 group"
              >
               {typeof service.icon === "string" ? (
                <div className="relative w-12 h-12">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={48}
                    height={48}
                    className="object-contain filter invert transition-all duration-300 group-hover:filter-none"
                  />
                </div>
              ) : (
                <service.icon className="w-12 h-12 text-whiteAmber group-hover:text-black transition-colors duration-300" />
              )}
              <span className="text-lg font-medium text-whiteAmber group-hover:text-black transition-colors duration-300">
                {service.title}
              </span>
              </button>
            ))}
          </div>
         </div>
        </form>
      </div>
    </section>
  );
}