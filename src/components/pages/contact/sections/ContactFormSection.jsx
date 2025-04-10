"use client";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      // Simuler un envoi de formulaire
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Réinitialiser le formulaire après succès
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-whiteAmber mb-12">
          Envoyez-nous un message
        </h2>
        
        <div className="max-w-3xl mx-auto bg-primary-dark rounded-2xl p-6 md:p-8 shadow-xl border border-accent/20">
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p>Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          )}
          
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{submitError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-whiteGray mb-2">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-whiteGray"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-whiteGray mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-whiteGray"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-whiteGray mb-2">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-whiteGray"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-whiteGray mb-2">Sujet *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-whiteGray"
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  <option value="cordonnerie">Cordonnerie</option>
                  <option value="serrurerie">Serrurerie</option>
                  <option value="devis">Demande de devis</option>
                  <option value="information">Demande d'information</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-whiteGray mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-whiteGray resize-none"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-whiteStone font-medium px-8 py-3 rounded-full border-2 border-white transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                <FiSend className={isSubmitting ? 'animate-pulse' : 'animate-[slideRight_1.5s_ease-in-out_infinite]'} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
