"use client";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";

export default function CoordinatesSection() {
  return (
    <section id="coordinates" className="py-16 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-whiteAmber mb-12">
          Nos coordonnées
        </h2>
        
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
          {/* Carte */}
          <div className="bg-primary-dark rounded-2xl overflow-hidden h-64 sm:h-80 shadow-xl border border-accent/20">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.0214853808735!2d1.8062359!3d48.7739722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e69c4c8b0f8f8f%3A0x1c4e101a11229a20!2sAtelier%20des%20Fr%C3%A8res%20d&#39;Antan!5e0!3m2!1sfr!2sfr!4v1625764283840!5m2!1sfr!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation de l'Atelier des Frères d'Antan"
            ></iframe>
          </div>

           {/* Réseaux sociaux */}
           <div className="bg-primary-dark rounded-2xl  p-6 md:p-8 shadow-xl border border-accent/20">
              <h4 className="text-lg font-semibold text-whiteAmber mb-4 text-center">Suivez-nous</h4>
              
              <div className="flex justify-center gap-4">
                <a 
                  href="https://www.facebook.com/atelierdesfreresantan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent/10 hover:bg-accent/20 rounded-full flex items-center justify-center text-accent-light transition-colors duration-300"
                >
                  <FaFacebookF size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/atelierdesfreresantan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent/10 hover:bg-accent/20 rounded-full flex items-center justify-center text-accent-light transition-colors duration-300"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href
                  className="w-12 h-12 bg-accent/10 hover:bg-accent/20 rounded-full flex items-center justify-center text-accent-light transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaYoutube size={20} />
                </a>
                <a href="https://www.linkedin.com/in/atelier-des-freres-d-antan" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-accent/10 hover:bg-accent/20 rounded-full flex items-center justify-center text-accent-light transition-colors duration-300"
                  >
                    <FaLinkedin size={20} />
                </a>
              </div>
            </div>
            </div>
          
          {/* Coordonnées */}
          <div className="space-y-8">
            <div className="bg-primary-dark rounded-2xl p-6 md:p-8 shadow-xl border border-accent/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent-light">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-whiteAmber mb-1">Adresse</h4>
                    <p className="text-whiteGray">1 rue de Sancé<br />78490 Montfort l'Amaury</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent-light">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-whiteAmber mb-1">Téléphone</h4>
                    <p className="text-whiteGray">07 88 41 63 91</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent-light">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-whiteAmber mb-1">Email</h4>
                    <p className="text-whiteGray">contact@freresdantan.fr</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Horaires d'ouverture */}
            <div id="opening-hours" className="bg-primary-dark rounded-2xl p-6 md:p-8 shadow-xl border border-accent/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent-light">
                  <FiClock size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-whiteAmber mb-1">Horaires d'ouverture</h4>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-primary/50 p-4 rounded-lg">
                  <p className="text-whiteAmber font-medium mb-2">Mardi</p>
                  <p className="text-whiteGray">14h30 - 19h</p>
                </div>
                <div className="bg-primary/50 p-4 rounded-lg">
                  <p className="text-whiteAmber font-medium mb-2">Mercredi au Samedi</p>
                  <p className="text-whiteGray">10h - 13h30 / 14h30 - 19h</p>
                </div>
                <div className="bg-primary/50 p-4 rounded-lg">
                  <p className="text-whiteAmber font-medium mb-2">Dimanche</p>
                  <p className="text-whiteGray">10h - 13h30</p>
                </div>
                <div className="bg-primary/50 p-4 rounded-lg">
                  <p className="text-whiteAmber font-medium mb-2">Lundi</p>
                  <p className="text-whiteGray">Fermé</p>
                </div>
              </div>
              
              <p className="text-whiteGray mt-4 text-sm italic text-center">Interventions sur rendez-vous pour la serrurerie</p>
            </div>
            
           
          </div>
        </div>
      </div>
    </section>
  );
}
