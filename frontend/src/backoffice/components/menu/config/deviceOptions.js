import { MdSmartphone, MdLaptop, MdTablet } from 'react-icons/md';

export const deviceOptions = [
  {
    value: 'mobile',
    label: 'Mobile',
    icon: <MdSmartphone size={20} />,
    showIcons: true,
    tips: [
      'Gardez le menu simple et concis',
      'Évitez les sous-menus trop profonds',
      'Utilisez des icônes pour une meilleure lisibilité'
    ]
  },
  {
    value: 'tablet',
    label: 'Tablette',
    icon: <MdTablet size={20} />,
    showIcons: true,
    tips: [
      'Optimisez pour les interactions tactiles',
      'Équilibrez entre mobile et desktop',
      'Utilisez l\'espace disponible efficacement'
    ]
  },
  {
    value: 'desktop',
    label: 'Desktop',
    icon: <MdLaptop size={20} />,
    showIcons: false,
    tips: [
      'Profitez de l\'espace pour un menu plus détaillé',
      'Les sous-menus peuvent être plus élaborés',
      'Pensez aux interactions au survol'
    ]
  }
];

export const getDeviceConfig = (deviceType) => {
  return deviceOptions.find(option => option.value === deviceType) || deviceOptions[0];
};