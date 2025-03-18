import { FaLeaf, FaUserFriends, FaAward, FaRecycle, FaStar } from "react-icons/fa"; // [[1]]
import { MdOutlineFamilyRestroom } from "react-icons/md";

export const valuesData = [
  {
    title: "Savoir-Faire Artisanal",
    description: "Un savoir-faire transmis de génération en génération",
    icon: <FaAward className="text-5xl text-accent" />,
    color: "accent"
  },
  {
    title: "Innovation Traditionnelle",
    description: "Alliance de techniques ancestrales et matériaux modernes",
    icon: <FaLeaf className="text-5xl text-primary" />,
    color: "primary"
  },
  {
    title: "Engagement Client",
    description: "Une relation personnalisée comme une histoire à part",
    icon: <FaUserFriends className="text-5xl text-primary" />,
    color: "primary"
  },
  {
    title: "Durabilité",
    description: "Choix éco-responsables pour un héritage durable",
    icon: <FaRecycle className="text-5xl text-tertiary" />,
    color: "tertiary"
  },
  {
    title: "Familial",
    description: "Un savoir-faire et une aventure familiale",
    icon: <MdOutlineFamilyRestroom className="text-5xl text-accent" />,
    color: "accent"
  },
    {
      title: "Qualité Exceptionnelle",
      description: "Des produits conçus pour durer et impressionner",
      icon: <FaStar className="text-5xl text-yellow-500" />, // Nouvelle icône
      color: "yellow" // Nouvelle couleur
    }
];
