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

