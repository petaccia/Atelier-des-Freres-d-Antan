import product_shoes from "../../../../../public/img/sections/essentials/products_shoes.webp";
import locksmith from "../../../../../public/img/sections/essentials/locksmith.webp";


import { GiStarsStack } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { PiArrowsClockwiseThin } from "react-icons/pi";
import { IoFlashOutline } from "react-icons/io5";
import { CgTrending } from "react-icons/cg";
import { RiSmartphoneLine } from "react-icons/ri";


export const cobblerData = {
  image: product_shoes,
  alt: "Chaussures signature",
  title: "Cordonnerie · Nicolas",
  description: "Réparation experte de chaussures avec un savoir-faire artisanal depuis 15 ans.",
  icons: [
    { component: <GiStarsStack className="h-8 w-8 text-white" />, label: "Travail de haute qualité" },
    { component: <GoClock className="h-8 w-8 text-white" />, label: "Réparation express" },
    { component: <PiArrowsClockwiseThin className="h-8 w-8 text-white" />, label: "Tutoriels vidéo" }
  ],
  buttonText: "Voir les réalisations"
};

export const serrurierData = {
  image: locksmith,
  alt: "Service Serrurerie",
  title: "Serrurerie · Guillaume",
  description: "Solutions de sécurité sur mesure alliant tradition et innovation.",
  icons: [
    { component: <IoFlashOutline className="h-8 w-8 text-white" />, label: "Intervention rapide" },
    { component: <CgTrending className="h-8 w-8 text-white" />, label: "Dernière technologie" },
    { component: <RiSmartphoneLine className="h-8 w-8 text-white" />, label: "Devis digital" }
  ],
  buttonText: "Demander un devis"
};