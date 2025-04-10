"use client";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isChecked) {
      setSubmitError("Veuillez accepter la politique de confidentialité.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      // Simuler un envoi de formulaire
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Réinitialiser le formulaire après succès
      setEmail("");
      setIsChecked(false);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-primary-dark to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-whiteAmber mb-6">Découvrez notre newsletter</h2>
          <p className="text-whiteGray text-lg mb-8">
            Recevez de nos nouvelles : nos actualités, des promotions, des conseils d'artisan en serrurerie et cordonnerie, les coulisses de notre entreprise, etc.
          </p>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p>Merci pour votre inscription ! Vous recevrez bientôt nos actualités.</p>
            </div>
          )}
          
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{submitError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="px-4 py-3 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-whiteGray w-full sm:w-auto sm:flex-1 max-w-md"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-accent hover:bg-accent-light text-whiteStone font-medium px-8 py-3 rounded-lg transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Inscription...' : 'JE M\'INSCRIS !'}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id="privacy-policy"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="w-4 h-4 accent-accent"
              />
              <label htmlFor="privacy-policy" className="text-whiteGray text-sm">
                En validant, j'accepte la politique de confidentialité
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
