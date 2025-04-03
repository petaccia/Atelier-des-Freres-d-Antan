"use client";
import { useState } from "react";
import { servicesClientData } from "../data/servicesClientData";
import ServicesTypeButton from "./components/ServicesTypeButton";
import ServicesOptionButton from "./components/ServicesOptionButton";
import DetailsSection from "./components/DetailsSection";

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
  const onChange = (e) => {
    setAdditionalDetails(e.target.value);
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
               <ServicesTypeButton
               key={index}
               service={service}
               isSelected={selectedService?.title === service.title}
               onSelect={handleServiceSelect}
               />
              ))}
            </div>
          </div>

          {/* Services spécifiques */}
          {selectedService && (
            <div className="flex flex-col gap-4 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-whiteAmber">Services disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedService.services.map((service, index) => (
                  <ServicesOptionButton
                    key={index}
                    service={service}
                    isSelected={selectedOptions.includes(service)}
                    onToggle={handleOptionToggle}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Détails supplémentaires */}
          {selectedService && selectedOptions.length > 0 && (
            <div className="flex flex-col gap-4">
              <DetailsSection 
                value={additionalDetails}
                onChange={onChange}
                placeholder="décrivez vos besoins spécifiques"
                className="w-full h-32 p-4 rounded-lg bg-transparent border-2 border-whiteAmber text-whiteAmber placeholder-whiteAmber/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          )}
        </form>
      </div>
    </section>
  );
}