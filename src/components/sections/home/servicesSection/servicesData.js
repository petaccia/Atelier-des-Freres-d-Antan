import Image from "next/image";
import depan from "../../../../../public/img/sections/services/depan.webp";
import doorLock from "../../../../../public/img/sections/services/door-lock.webp";
import feron from "../../../../../public/img/sections/services/feron.webp";
import product_keys from "../../../../../public/img/sections/services/product_keys.webp";

// data/services.ts
export const services = [
  {
    id: 1,
    title: 'Dépannage Urgence',
    description: 'Porte claquée, cambriolage, clé cassée - Interventions rapides',
    img: (props) => (
      <Image
        src={depan}
        alt="Dépannage"
        width={400}
        height={400}
        {...props}
      />
    )
  },
  {
    id: 2,
    title: 'Blindage de Porte',
    description: 'Sécurisation de votre porte et de vos accès',
    img: (props) => (
      <Image
        src={doorLock}
        alt="Blindage"
        width={400}
        height={400}
        {...props}
      />
    )
  },
  {
    id: 3,
    title: 'Serrurerie Métallique',
    description: 'Création sur mesure de pièces artisanales',
    img: (props) => (
      <Image
        src={feron}
        alt="Féronnerie"
        width={400}
        height={400}
        {...props}
      />
    )
  },
  {
    id: 4,
    title: 'Reproduction de Clés',
    description: 'Votre clé cassée - Reproduction rapide et sur mesure',
    img: (props) => (
      <Image
        src={product_keys}
        alt="Installation"
        width={400}
        height={400}
        {...props}
      />
    )
  },
];
