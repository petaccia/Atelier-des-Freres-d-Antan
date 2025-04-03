"use client";
import { useState } from "react";
import { servicesClientData } from "../data/servicesClientData";
import { toast, ToastContainer } from 'react-toastify';
import ServiceTypeButton from "./components/ServiceTypeButton";
import ServiceOptionButton from "./components/ServiceOptionButton";
import DetailsSection from "./components/DetailsSection";

export default function ClientRequestForm() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedOptions([]);
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedService || selectedOptions.length === 0) {
      toast.error("Veuillez sélectionner au moins un service");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un envoi de données
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Créer l'objet de données
      const formData = {
        serviceType: selectedService.title,
        selectedServices: selectedOptions.map(opt => opt.title),
        additionalDetails
      };

      console.log('Données envoyées:', formData);

      // Réinitialiser le formulaire
      setSelectedService(null);
      setSelectedOptions([]);
      setAdditionalDetails("");

      // Afficher le toast de succès
      toast.success("Votre demande a été envoyée avec succès !");
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-whiteAmber text-center text-3xl font-bold mb-8">
          Faites votre demande
        </h2>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {/* Type de projet */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold mb-4 text-whiteAmber">Type de projet</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {servicesClientData.map((service, index) => (
                <ServiceTypeButton
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
                  <ServiceOptionButton
                    key={index}
                    service={service}
                    isSelected={selectedOptions.includes(service)}
                    onToggle={handleOptionToggle}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Détails */}
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
                disabled={isSubmitting}
                className={`mt-6 bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 self-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              </button>
            </div>
          )}
        </form>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </section>
  );
}