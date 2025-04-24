export const getFormFields = () => [
  {
    name: 'title',
    label: 'Titre de la page',
    type: 'text',
    required: true,
    placeholder: 'Ex: À propos'
  },
  {
    name: 'path',
    label: 'Chemin de la page (sans /)',
    type: 'text',
    required: true,
    placeholder: 'Ex: about',
    validate: (value) => {
      if (value.includes('/')) {
        return "N'utilisez pas de / dans le chemin";
      }
      return '';
    }
  }
];

export const getSelectFields = (menuItems) => [
  {
    name: 'parentId',
    label: 'Page parente',
    required: false,
    options: [
      { value: '', label: 'Aucun parent' },
      ...menuItems.map(item => ({
        value: item.id.toString(),
        label: item.title
      }))
    ]
  },
  {
    name: 'showIcon',
    label: 'Afficher l\'icône',
    required: true,
    options: [
      { value: 'true', label: 'Oui' },
      { value: 'false', label: 'Non' }
    ]
  }
];