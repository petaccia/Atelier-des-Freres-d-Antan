import { GiRunningShoe, GiKeyLock } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";

export const faqCategoriesData = [
  {
    id: "cordonnerie",
    title: "Cordonnerie",
    description: "Questions sur nos services de cordonnerie traditionnelle",
    icon: GiRunningShoe,
    faqs: [
      {
        question: "Quel est le délai pour la réparation d'une chaussure ?",
        answer:
          "Le délai dépend de la complexité de la réparation. Pour une réparation standard, comptez environ 1 semaine. Pour des travaux plus complexes ou des restaurations complètes, le délai peut aller jusqu'à 3 semaines. Nous vous informerons du délai précis lors du dépôt de votre chaussure.",
      },
      {
        question: "Quels types de chaussures pouvez-vous réparer ?",
        answer:
          "Nous réparons tous types de chaussures : chaussures de ville, bottes, escarpins, mocassins, chaussures de sport, chaussures de randonnée, etc. Notre expertise nous permet d'intervenir sur des modèles classiques comme sur des pièces de luxe.",
      },
      {
        question: "Est-il possible de changer la couleur de mes chaussures en cuir ?",
        answer:
          "Oui, nous proposons des services de teinture pour chaussures en cuir. Nous pouvons modifier la couleur de vos chaussures ou simplement raviver leur teinte d'origine. Ce service est particulièrement adapté pour les chaussures de qualité qui méritent d'être conservées.",
      },
      {
        question: "Pouvez-vous élargir des chaussures trop étroites ?",
        answer:
          "Oui, nous disposons d'équipements spécifiques pour élargir les chaussures en cuir qui serrent trop. Cette opération peut être réalisée en largeur ou en longueur selon vos besoins, tout en préservant l'intégrité et l'esthétique de la chaussure.",
      },
      {
        question:
          "Quel entretien recommandez-vous pour prolonger la durée de vie des chaussures en cuir ?",
        answer:
          "Nous recommandons un nettoyage régulier avec des produits adaptés au type de cuir, suivi d'une hydratation avec une crème nourrissante. L'utilisation d'embauchoirs en cèdre entre les portées permet également de préserver la forme et d'absorber l'humidité. Nous proposons tous ces produits d'entretien dans notre atelier.",
      },
    ],
  },
  {
    id: "serrurerie",
    title: "Serrurerie",
    description: "Questions sur nos services de serrurerie traditionnelle",
    icon: GiKeyLock,
    faqs: [
      {
        question: "Que faire en cas de perte de clés ?",
        answer:
          "En cas de perte de clés, contactez-nous rapidement. Nous pouvons fabriquer de nouvelles clés à partir de vos serrures existantes ou, pour plus de sécurité, procéder au remplacement complet du cylindre. Pour les serrures anciennes, nous pouvons souvent reproduire des clés même sans modèle.",
      },
      {
        question: "Intervenez-vous en urgence pour les ouvertures de porte ?",
        answer:
          "Oui, nous proposons un service d'intervention d'urgence pour les ouvertures de porte. Contactez-nous au 07 88 41 63 91, et nous vous indiquerons notre délai d'intervention en fonction de votre localisation et de nos disponibilités.",
      },
      {
        question: "Pouvez-vous restaurer d'anciennes serrures ?",
        answer:
          "Absolument, la restauration de serrures anciennes fait partie de nos spécialités. Nous pouvons remettre en état des serrures d'époque, réparer les mécanismes défectueux et fabriquer des pièces sur mesure pour remplacer celles qui sont manquantes ou trop usées.",
      },
      {
        question: "Quels types de systèmes de sécurité proposez-vous ?",
        answer:
          "Nous proposons une gamme complète de solutions de sécurité : serrures multipoints, serrures à pompe, verrous de sûreté, serrures connectées, etc. Nous privilégions les systèmes mécaniques de haute qualité, fiables et durables, tout en proposant des solutions modernes pour ceux qui le souhaitent.",
      },
      {
        question: "Comment savoir si ma serrure est sécurisée ?",
        answer:
          "Une serrure sécurisée doit résister aux techniques d'ouverture fine, au perçage et à l'arrachement. Nous pouvons réaliser un diagnostic de sécurité de vos installations et vous conseiller sur les améliorations possibles. N'hésitez pas à nous contacter pour une évaluation personnalisée.",
      },
    ],
  },
  {
    id: "bourrellerie",
    title: "Bourrellerie",
    description: "Questions sur nos services de bourrellerie et travail du cuir",
    icon: "/icons/leather-icon.svg",
    faqs: [
      {
        question: "Quels types d'articles en cuir pouvez-vous réparer ?",
        answer:
          "Nous réparons une large gamme d'articles en cuir : sacs, portefeuilles, ceintures, étuis, selles d'équitation, harnais, etc. Notre expertise en bourrellerie nous permet d'intervenir sur des pièces complexes nécessitant des coutures à la main ou des assemblages spécifiques.",
      },
      {
        question: "Proposez-vous des créations sur mesure en cuir ?",
        answer:
          "Oui, nous réalisons des créations sur mesure en cuir selon vos besoins et vos envies. Qu'il s'agisse d'accessoires personnels, d'équipements équestres ou d'objets décoratifs, nous pouvons concevoir et fabriquer des pièces uniques adaptées à vos exigences.",
      },
      {
        question: "Comment entretenir les articles en cuir pour préserver leur qualité ?",
        answer:
          "Pour préserver la qualité de vos articles en cuir, nous recommandons un nettoyage régulier avec des produits spécifiques au type de cuir, suivi d'une hydratation avec une crème ou une huile adaptée. Il est également important de protéger le cuir de l'humidité excessive, de la chaleur directe et des rayons UV prolongés.",
      },
      {
        question: "Pouvez-vous restaurer des pièces de collection ou des objets anciens en cuir ?",
        answer:
          "Oui, nous sommes spécialisés dans la restauration d'objets anciens en cuir. Notre approche respecte l'authenticité et l'histoire de chaque pièce, en utilisant des techniques traditionnelles et des matériaux compatibles avec ceux d'origine.",
      },
      {
        question: "Quels types de cuir utilisez-vous pour vos créations et réparations ?",
        answer:
          "Nous utilisons principalement des cuirs de tannage végétal, qui sont plus respectueux de l'environnement et vieillissent mieux avec le temps. Selon les projets, nous travaillons avec différentes qualités de cuir : vachette, veau, buffle, chèvre ou cuirs exotiques pour des créations spécifiques.",
      },
    ],
  },
];
