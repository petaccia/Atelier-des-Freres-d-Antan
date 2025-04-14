import depan_door from "../../../../../public/img/serrurerie/services/depan-door.webp";
import production_key from "../../../../../public/img/serrurerie/services/production-key.png";
import serr_multi_points from "../../../../../public/img/serrurerie/services/serr-multi-points.webp";
import claq_door from "../../../../../public/img/serrurerie/services/claq-door.jpg";

export const servicesSerrurerieData = [
  {
    id: 1,
    title: "Réparation ou installation de serrures",
    description: "Service professionnel pour réparer ou installer des serrures.",
    img: depan_door.src,
    href: "#lock-repair",
  },
  {
    id: 2,
    title: "Reproduction de clés",
    description: "Reproduction précise et rapide de tous types de clés.",
    img: production_key.src,
    href: "#key-duplication",
  },
  {
    id: 3,
    title: "Systèmes de sécurité",
    description: "Installation et maintenance de systèmes de sécurité modernes.",
    img: serr_multi_points.src,
    href: "#security-system",
  },
  {
    id: 4,
    title: "Dépannage",
    description: "Service rapide après une effraction ou une perte de clés, ect...",
    img: claq_door.src,
    href: "#emergency-locksmith",
  },
];
