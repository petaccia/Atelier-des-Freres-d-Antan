"use client";

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import Image from "next/image";
import blacksmith from "../../../../../../public/img/sections/newletter/blacksmith.png";

export default function NewLetter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative min-h-[900px] sm:min-h-[700px] md:min-h-[600px] overflow-hidden">
      <Image src={blacksmith} alt="Newsletter Background" fill className="object-cover" />

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <FiMail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-white text-xl sm:text-3xl md:text-4xl text-center h-2">
              Découvrez l'Art de la Durabilité
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <p className="text-gray-200 mb-8">
                Plongez dans l'univers de l'artisanat ! Recevez nos actualités, des promotions
                exclusives, des conseils d'experts en serrurerie et cordonnerie, et découvrez les
                coulisses de notre atelier. Abonnez-vous pour ne rien manquer.
              </p>
              <div className="space-y-3">
                <p className="text-gray-200">
                  <span className="font-semibold text-primary">✓</span> Conseils d'entretien
                  exclusifs
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold text-primary">✓</span> Promotions réservées aux
                  abonnés
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold text-primary">✓</span> Coulisses de l'atelier
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg mt-8 lg:mt-0">
              {isSubscribed ? (
                <div className="p-6 bg-green-50/50 backdrop-blur-sm rounded-xl border border-green-100">
                  <p className="text-green-700 font-medium text-center">
                    Merci pour votre inscription !
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse e-mail"
                      className="w-full px-5 py-4 pl-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-gray-400"
                      required
                    />
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-br from-primary to-primary-dark text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    {isLoading ? "Inscription en cours..." : "S'inscrire"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
