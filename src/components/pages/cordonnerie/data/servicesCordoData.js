import shoes_repair from "../../../../../public/img/cordonnerie/sections/services/shoes-repair.jpg";
import leatherwork from "../../../../../public/img/cordonnerie/sections/services/leatherwork.jpg";
import machine_key from "../../../../../public/img/cordonnerie/sections/services/machine_key.webp";
import proximity_badge from "../../../../../public/img/cordonnerie/sections/services/badge.webp";
export const servicesCordoData = [
  {
    id: 1,
    title: "Réparation de chaussures",
    description: "Restauration complète : talons, semelles, coutures et plus encore.",
    img: shoes_repair.src,
  },
  {
    id: 2,
    title: "Réparation de maroquinerie",
    description: "De la fermeture éclair aux coutures : nous redonnons vie à vos articles en cuir.",
    img: leatherwork.src, 
  },
  {
    id: 3,
    title: "Reproduction de clés",
    description: "Duplication précise de tous types de clés, de la plus simple à la plus complexe.",
    img: machine_key.src,
  },
  {
    id: 4,
    title: "Duplication de badges",
    description: "Reproduction fiable de badges de proximité pour un accès sécurisé.",
    img: proximity_badge.src,
  },
];
