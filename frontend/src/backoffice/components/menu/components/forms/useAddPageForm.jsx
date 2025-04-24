'use client';
import useFormProps from "@/backoffice/components/common/forms/useFormProps";

export const useAddPageForm = (onSuccess, menuItems = []) => {
  // Transformer les menuItems en options pour le select
  const parentOptions = [
    { value: '', label: 'Aucun parent' },
    ...menuItems.map(item => ({
      value: item.id.toString(),
      label: item.title
    }))
  ];

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
        label: 'Chemin de la page',
        type: 'text',
        required: true,
        placeholder: 'Ex: /about'
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
      // TODO: Implémenter la logique d'ajout de page
      const formattedValues = {
        ...values,
        parentId: values.parentId ? parseInt(values.parentId) : null,
        showIcon: values.showIcon === 'true'
      };
      console.log('Données du formulaire:', formattedValues);
      onSuccess?.();
    },
    submitLabel: 'Ajouter la page'
  });
};
