import { MdPhoneIphone, MdTablet, MdLaptop, MdDesktopWindows } from 'react-icons/md';

export const deviceOptions = [
  {
    value: 'mobile',
    label: 'Mobile',
    icon: <MdPhoneIphone size={20} />,
    showIcons: true,
    tips: [
      'Les icônes sont particulièrement importantes pour les menus mobiles - elles aident les utilisateurs à identifier rapidement les éléments du menu.',
      'Gardez les éléments du menu mobile concis et limités en nombre.',
      'Assurez-vous d\'inclure les éléments essentiels comme "Appeler" et de placer "Processus" dans le sous-menu "À propos".',
    ]
  },
  {
    value: 'tablet',
    label: 'Tablette',
    icon: <MdTablet size={20} />,
    showIcons: true,
    tips: [
      'Les icônes aident à la navigation sur tablette, tout en permettant plus d\'\u00e9léments que sur mobile.',
      'Assurez-vous d\'inclure les éléments essentiels comme "Appeler" et de placer "Processus" dans le sous-menu "À propos".',
      'Vous pouvez afficher plus d\'\u00e9léments que sur mobile, mais restez concis.',
    ]
  },
  {
    value: 'laptop',
    label: 'Portable',
    icon: <MdLaptop size={20} />,
    showIcons: false,
    tips: [
      'Privilégiez une navigation claire et intuitive.',
      'Vous pouvez afficher plus d\'options que sur les appareils mobiles.',
      'Assurez-vous que la structure du menu est logique et hiérarchisée.',
    ]
  },
  {
    value: 'desktop',
    label: 'Bureau',
    icon: <MdDesktopWindows size={20} />,
    showIcons: false,
    tips: [
      'Profitez de l\'espace disponible pour créer une navigation complète.',
      'Vous pouvez afficher tous les éléments du menu sans contrainte d\'espace.',
      'Organisez les éléments de manière logique pour faciliter la navigation.',
    ]
  }
];
