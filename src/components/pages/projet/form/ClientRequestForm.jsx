"use client";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import ServiceSelection from "./components/ServiceSelection";
import DetailsInput from "./components/DetailsInput";
import SubmitButton from "./components/SubmitButton"; // Nouveau composant importé

export default function ClientRequestForm() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formIsValid = selectedService && selectedOptions.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formIsValid) {
      toast.error("Veuillez sélectionner au moins un service");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const formData = {
        serviceType: selectedService.title,
        selectedServices: selectedOptions.map(opt => opt.title),
        additionalDetails
      };

      console.log('Données envoyées:', formData);

      setSelectedService(null);
      setSelectedOptions([]);
      setAdditionalDetails("");

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
          <ServiceSelection
            selectedService={selectedService}
            onServiceSelect={setSelectedService}
            selectedOptions={selectedOptions}
            onOptionSelect={setSelectedOptions}
          />

          {formIsValid && (
            <DetailsInput
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              isSubmitting={isSubmitting}
            />
          )}

          <SubmitButton
            isSubmitting={isSubmitting}
            disabled={!formIsValid}
          />
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