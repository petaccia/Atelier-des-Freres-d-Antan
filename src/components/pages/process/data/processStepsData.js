import { TbHandClick, TbFileAnalytics, TbCircleCheck, TbSettingsAutomation, TbLock } from "react-icons/tb";

export const processStepsData = [
  {
    id: 1,
    title: "Votre demande",
    description: "Vous nous contactez pour exposer votre besoin. Nous échangeons avec vous pour préciser vos exigences.",
    icon: <TbHandClick className="w-10 h-10 text-accent-light animate-[pulse_3s_ease-in-out_infinite]" />
  },
  {
    id: 2,
    title: "Le devis détaillé",
    description: "Notre analyse précise débouche sur une estimation transparente et complète de votre projet.",
    icon: <TbFileAnalytics className="w-10 h-10 text-accent-light animate-[slideRight_2s_ease-in-out_infinite]" />
  },
  {
    id: 3,
    title: "Validation du projet",
    description: "Confirmation interactive avec suivi en temps réel de votre dossier numérique.",
    icon: <TbCircleCheck className="w-10 h-10 text-accent-light animate-[bounce_2s_ease-in-out_infinite]" />
  },
  {
    id: 4,
    title: "Mise en œuvre technique",
    description: "Exécution optimisée avec monitoring des interventions et reporting digital.",
    icon: <TbSettingsAutomation className="w-10 h-10 text-accent-light animate-[spin_15s_linear_infinite]" />
  },
  {
    id: 5,
    title: "Démarrez votre projet",
    description: "Maintenant que vous connaissez notre processus transparent, passez à l'action et sécurisez votre propriété avec notre expertise en serrurerie.",
    buttonText: "Commencer le processus",
    buttonLink: "/contact",
    icon: <TbLock className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-accent-light animate-[pulse_3s_ease-in-out_infinite]" />,
    isCTA: true
  }
];

// Données pour la section Hero du processus
export const processHeroData = {
  title: "Notre Processus Sécurisé",
  description: "Une méthodologie éprouvée pour une serrurerie haute précision et une sécurité optimale.",
  imageSrc: "/img/process/process-hero.jpg",
  imageAlt: "Processus de travail - Atelier des Frères d'Antan"
};