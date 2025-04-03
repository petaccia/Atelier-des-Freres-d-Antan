"use client";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import ServiceSelection from "./components/ServiceSelection";
import DetailsInput from "./components/DetailsInput";

export default function ClientRequestForm() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


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
         <ServiceSelection
          selectedService={selectedService}
          onServiceSelect={setSelectedService}
          selectedOptions={selectedOptions}
          onOptionSelect={setSelectedOptions}
        />


          {/* Détails */}
          {selectedService && selectedOptions.length > 0 && (
           <DetailsInput
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            isSubmitting={isSubmitting}
         />
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