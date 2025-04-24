'use client';
import useFormProps from "@/backoffice/components/common/forms/useFormProps";


export const useAddPageForm = (onSuccess) => {
  return useFormProps({
    initialValues: {
      title: '',
      path: '',
      showIcon: true
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
      console.log('Données du formulaire:', values);
      onSuccess?.();
    },
    submitLabel: 'Ajouter la page'
  });
};