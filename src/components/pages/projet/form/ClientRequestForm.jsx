"use client";
import Image from "next/image";
import { useState } from "react";
import { servicesClientData } from "../data/servicesClientData";

export default function ClientRequestForm() {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <section className="py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-whiteAmber text-center text-3xl font-bold mb-8">
          Faites votre demande
        </h2>

        <form className="mt-10 space-y-8">
          {/* sélection du type de projet */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold mb-4 text-whiteAmber">Type de projet</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {servicesClientData.map((service, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleServiceSelect(service)}
                  className={`flex flex-col gap-4 items-center justify-center p-6 border-2 border-whiteAmber rounded-lg hover:bg-whiteAmber hover:text-black transition-colors duration-300 group ${
                    selectedService?.title === service.title ? "bg-whiteAmber text-black" : ""
                  }`}
                >
                  {typeof service.icon === "string" ? (
                    <div className="relative w-12 h-12">
                      <Image 
                        src={service.icon} 
                        alt={service.title} 
                        width={48}
                        height={48}
                        className={`object-contain filter invert transition-all duration-300 ${
                          selectedService?.title === service.title ? "filter-none" : "group-hover:filter-none"
                        }`}
                      />
                    </div>
                  ) : (
                    <service.icon className={`w-12 h-12 transition-colors duration-300 ${
                      selectedService?.title === service.title ? "text-black" : "text-whiteAmber group-hover:text-black"
                    }`} />
                  )}
                  <span className={`text-lg font-medium transition-colors duration-300 ${
                    selectedService?.title === service.title ? "text-black" : "text-whiteAmber group-hover:text-black"
                  }`}>
                    {service.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Services spécifiques */}
          {selectedService && (
            <div className="flex flex-col gap-4 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-whiteAmber">Services disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedService.services.map((service, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex items-center gap-4 p-4 border-2 border-whiteAmber rounded-lg hover:bg-whiteAmber group text-left"
                  >
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-whiteAmber group-hover:text-black transition-colors duration-300">
                        {service.title}
                      </h4>
                      <p className="text-sm text-whiteGray group-hover:text-black/70 transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}