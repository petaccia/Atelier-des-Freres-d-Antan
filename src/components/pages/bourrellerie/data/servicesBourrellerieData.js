import bag_repair from "../../../../../public/img/bourrellerie/carousel/bag-repair.jpg";
import belt from "../../../../../public/img/bourrellerie/carousel/belt.webp";
import leather_entret from "../../../../../public/img/bourrellerie/carousel/leather-entret.jpg";
import leather_piece from "../../../../../public/img/bourrellerie/carousel/leather-piece.jpg";

export const servicesBourrellerieData = [
  {
    id: 1,
    title: "Réparation de sacs en cuir",
    description: "Nous redonnons vie à vos sacs en cuir, qu'il s'agisse de réparations de fermetures éclair, de coutures ou de renforts.",
    img: bag_repair.src,
    href: "#bag-repair",
  },
  {
    id: 2,
    title: "Ceintures sur mesure",
    description: "Créez une ceinture unique, parfaitement adaptée à votre style et à vos besoins.",
    img: belt.src,
    href: "#custom-belts",
  },
  {
    id: 3,
    title: "Entretien professionnel du cuir",
    description: "Nous offrons un entretien complet pour préserver la beauté et la durabilité de vos articles en cuir.",
    img: leather_entret.src,
    href: "#leather-care",
  },
  {
    id: 4,
    title: "Réparation d'objets en cuir",
    description: "Votre objet en cuir est endommagé ? Notre atelier le restaure avec soin et précision.",
    img: leather_piece.src,
    href: "#leather-repair",
  },
];