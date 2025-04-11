import depan from "../../../../../public/img/sections/services/depan.webp";
import doorLock from "../../../../../public/img/sections/services/door_lock.webp";
import feron from "../../../../../public/img/sections/services/feron.webp";
import product_keys from "../../../../../public/img/sections/services/product_keys.webp";

// data/services.ts
export const servicesDataHome = [
  {
    id: 1,
    title: "Dépannage Urgence",
    description: "Porte claquée, cambriolage, clé cassée - Interventions rapides",
    img: depan.src,
    href: "tel:0788416391",
  },
  {
    id: 2,
    title: "Blindage de Porte",
    description: "Sécurisation de votre porte et de vos accès",
    img: doorLock.src,
    href: "/#traditional-locksmith",
  },
  {
    id: 3,
    title: "Serrurerie Métallique",
    description: "Création sur mesure de pièces artisanales",
    img: feron.src,
    href: "/contact"
  },
  {
    id: 4,
    title: "Reproduction de Clés",
    description: "Votre clé cassée - Reproduction rapide et sur mesure",
    img: product_keys.src,
    href: "/#key-duplication",
  },
];
