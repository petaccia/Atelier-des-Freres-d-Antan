'use client';
import useFormProps from "@/backoffice/components/common/forms/useFormProps";

export const useAddPageForm = (onSuccess, menuItems = []) => {
  const parentOptions = [
    { value: '', label: 'Aucun parent' },
    ...menuItems.map(item => ({
      value: item.id.toString(),
      label: item.title
    }))
  ];

  const formatPath = (path) => {
    // Supprime les / au début et à la fin
    path = path.replace(/^\/+|\/+$/g, '');
    // Remplace les multiples / par un seul
    path = path.replace(/\/+/g, '/');
    return path;
  };

  return useFormProps({
    initialValues: {
      title: '',
      path: '',
      showIcon: true,
      parentId: ''
    },
    fields: [
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
        },
        transform: (value) => formatPath(value)
      }
    ],
    selects: [
      {
        name: 'parentId',
        label: 'Page parente',
        required: false,
        options: parentOptions
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
    ],
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        path: `/${formatPath(values.path)}`, // Ajoute le / au début
        parentId: values.parentId ? parseInt(values.parentId) : null,
        showIcon: values.showIcon === 'true'
      };
      console.log('Données du formulaire:', formattedValues);
      onSuccess?.();
    },
    submitLabel: 'Ajouter la page'
  });
};

