export const menuFormFields = [
  {
    id: 'title',
    name: 'title',
    label: 'Titre',
    type: 'text',
    required: true,
    validation: (value) => !value.trim() ? 'Le titre est requis' : null
  },
  {
    id: 'path',
    name: 'path',
    label: 'Chemin',
    type: 'text',
    required: true,
    defaultValue: '/',
    validation: (value) => !value.trim() ? 'Le chemin est requis' : null
  },
  {
    id: 'order',
    name: 'order',
    label: 'Ordre',
    type: 'number',
    min: 0,
    defaultValue: 0,
    transform: (value) => parseInt(value, 10) || 0
  }
];
