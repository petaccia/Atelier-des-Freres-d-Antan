import { BiHistory, BiEnvelope, BiStore, BiPhone, BiCog } from "react-icons/bi";
import { GiRunningShoe, GiKeyLock } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";

// Configuration des icônes en fonction des mots-clés dans le titre
export const menuIconsConfig = [
  {
    keywords: ['accueil', 'home'],
    icon: BiStore,
    size: 20
  },
  {
    keywords: ['cordonnerie', 'shoe'],
    icon: GiRunningShoe,
    size: 20
  },
  {
    keywords: ['serrurerie', 'lock', 'key'],
    icon: GiKeyLock,
    size: 20
  },
  {
    keywords: ['propos', 'histoire', 'about', 'history'],
    icon: BiHistory,
    size: 20
  },
  {
    keywords: ['contact'],
    icon: BiEnvelope,
    size: 20
  },
  {
    keywords: ['processus', 'process'],
    icon: BiCog,
    size: 20
  },
  {
    keywords: ['appeler', 'téléphone', 'call', 'phone'],
    icon: FaPhoneAlt,
    size: 20
  }
];

// Fonction utilitaire pour trouver l'icône appropriée en fonction du titre
export function getIconByTitle(title) {
  if (!title) return null;
  
  const titleLower = title.toLowerCase();
  
  // Rechercher la première configuration d'icône qui correspond à un mot-clé dans le titre
  const iconConfig = menuIconsConfig.find(config => 
    config.keywords.some(keyword => titleLower.includes(keyword))
  );
  
  if (iconConfig) {
    const IconComponent = iconConfig.icon;
    return <IconComponent size={iconConfig.size} />;
  }
  
  return null;
}
