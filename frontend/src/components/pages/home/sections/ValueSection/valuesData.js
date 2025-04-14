import { FaHandPaper } from "react-icons/fa"; // [[1]]
import { MdOutlineFamilyRestroom } from "react-icons/md";
import olive from "../../../../../../public/img/sections/values/olive.png";
import french from "../../../../../../public/img/sections/values/french.png";
import Image from "next/image";

export const valuesData = [
  {
    title: "Savoir-Faire Artisanal",
    description: "Un savoir-faire transmis de génération en génération",
    icon: () => <FaHandPaper className="text-5xl text-accent" />,
    color: "accent",
  },
  {
    title: "Ecologique",
    description: "Préserver l'environnement",
    icon: () => (
      <Image src={olive} alt="Ecologique" width={40} height={40} className="object-contain" />
    ),
    color: "green-500",
  },
  {
    title: "Travail Français",
    description: "De la fabrication française",
    icon: () => (
      <Image
        src={french}
        alt="Travail Français"
        width={40}
        height={40}
        className="object-contain"
      />
    ),
    color: "blue-500",
  },
  {
    title: "Famille",
    description: "Un travail en famille",
    icon: () => <MdOutlineFamilyRestroom className="text-5xl text-accent" />,
    color: "accent",
  },
];
