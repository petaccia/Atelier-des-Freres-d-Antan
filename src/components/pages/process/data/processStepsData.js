import { TbHandClick, TbFileAnalytics, TbCircleCheck, TbSettingsAutomation } from "react-icons/tb";

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
  }
];