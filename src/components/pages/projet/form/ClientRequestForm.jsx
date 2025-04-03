"use client";
import Image from "next/image";
import { useState } from "react";
import { servicesClientData } from "../data/servicesClientData";

export default function ClientRequestForm() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState("");

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedOptions([]); // Réinitialiser les options quand on change de service
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
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
                    onClick={() => handleOptionToggle(service)}
                    className={`flex items-center gap-4 p-4 border-2 border-whiteAmber rounded-lg hover:bg-whiteAmber group text-left ${
                      selectedOptions.includes(service) ? "bg-whiteAmber" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <h4 className={`text-lg font-medium transition-colors duration-300 ${
                        selectedOptions.includes(service) ? "text-black" : "text-whiteAmber group-hover:text-black"
                      }`}>
                        {service.title}
                      </h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        selectedOptions.includes(service) ? "text-black/70" : "text-whiteGray group-hover:text-black/70"
                      }`}>
                        {service.description}
                      </p>
                    </div>
                    <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors duration-300 ${
                      selectedOptions.includes(service) 
                        ? "border-black bg-black" 
                        : "border-whiteAmber group-hover:border-black"
                    }`}>
                      {selectedOptions.includes(service) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Détails supplémentaires */}
          {selectedService && selectedOptions.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-whiteAmber">Détails supplémentaires</h3>
              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Décrivez vos besoins spécifiques..."
                className="w-full h-32 p-4 rounded-lg bg-transparent border-2 border-whiteAmber text-whiteAmber placeholder-whiteAmber/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="mt-6 bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 self-center"
              >
                Envoyer la demande
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}