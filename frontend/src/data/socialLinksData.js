import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import PagesJaunesIcon from "@/components/ui/icons/PagesJaunesIcon";
import GensDeConfianceIcon from "@/components/ui/icons/GensDeConfianceIcon";

export const socialLinks = [
  {
    id: 1,
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/people/Atelier-des-Fr%C3%A8res-dAntan/100086610096883/",
    color: "text-[#1877F2]",
    hoverColor: "hover:text-[#1877F2]/80",
  },
  {
    id: 2,
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/atelierfreresdantan/?hl=fr",
    color: "text-[#E4405F]",
    hoverColor: "hover:text-[#E4405F]/80",
  },
  {
    id: 3,
    name: "Youtube",
    icon: FaYoutube,
    url: "https://www.youtube.com/channel/UCFo9ctUenbS_tSGL-Dhps5g",
    color: "text-[#FF0000]",
    hoverColor: "hover:text-[#FF0000]/80",
  },
  {
    id: 4,
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/company/atelier-des-fr%C3%A8res-d-antan/posts/?feedView=all",
    color: "text-[#0A66C2]",
    hoverColor: "hover:text-[#0A66C2]/80",
  },
  {
    id: 5,
    name: "Pages Jaunes",
    icon: PagesJaunesIcon,
    url: "https://www.pagesjaunes.fr/pros/62106420",
    color: "text-[#FFCC00]",
    hoverColor: "hover:text-[#FFCC00]/80",
  },
  {
    id: 6,
    name: "Gens de Confiance",
    icon: GensDeConfianceIcon,
    url: "https://gensdeconfiance.com/fr/invite/atelier-des-freres-d-antan",
    color: "text-[#4CAF50]",
    hoverColor: "hover:text-[#4CAF50]/80",
  },
];
