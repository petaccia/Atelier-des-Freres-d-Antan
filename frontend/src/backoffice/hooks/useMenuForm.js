import { useRef } from 'react';
import useForm from './useForm';
import { menuFormFields } from '../components/menu/config/menuFormFields';

export default function useMenuForm({ 
  onSubmit, 
  onClose, 
  editItem, 
  isOpen, 
  menuItems 
}) {
  // Valeurs initiales du formulaire
  const initialValues = {
    title: '',
    path: '/',
    order: 0,
    parentId: null
  };

  // Fonction de validation du formulaire
  const validateForm = (values) => {
    const errors = {};

    // Valider chaque champ en utilisant la configuration
    menuFormFields.forEach(field => {
      if (field.validation) {
        const error = field.validation(values[field.name]);
        if (error) {
          errors[field.name] = error;
        }
      }
    });

    return errors;
  };

  // Utiliser le hook useForm pour gérer l'état du formulaire
  const formState = useForm({
    initialValues,
    onSubmit: async (formData) => {
      await onSubmit(formData);
      onClose();
    },
    validate: validateForm
  });

  // Si nous éditons un élément existant, remplir le formulaire avec ses données
  // Utiliser une référence pour éviter les boucles infinies
  const editItemRef = useRef(null);
  const isOpenRef = useRef(isOpen);

  // Mettre à jour les valeurs du formulaire lorsque editItem ou isOpen change
  if ((editItemRef.current !== editItem) || (isOpenRef.current !== isOpen)) {
    editItemRef.current = editItem;
    isOpenRef.current = isOpen;

    if (editItem) {
      formState.setValues({
        title: editItem.title || '',
        path: editItem.path || '/',
        order: editItem.order || 0,
        parentId: editItem.parentId || null
      });
    } else {
      // Réinitialiser le formulaire si nous créons un nouvel élément
      formState.setValues(initialValues);
    }
  }

  // Gérer le changement de parent
  const handleParentChange = (e) => {
    const value = e.target.value;
    formState.setValues(prev => ({
      ...prev,
      parentId: value === '' ? null : parseInt(value, 10)
    }));
  };

  // Options pour le champ de sélection du parent
  const parentOptions = [
    { value: '', label: 'Aucun (élément principal)' },
    ...menuItems
      .filter(item => !item.parentId) // Ne montrer que les éléments principaux comme parents possibles
      .map(item => ({
        value: item.id,
        label: item.title
      }))
  ];

  return {
    ...formState,
    handleParentChange,
    parentOptions,
    formFields: menuFormFields,
    modalTitle: editItem ? 'Modifier un élément du menu' : 'Ajouter un élément au menu',
    submitLabel: editItem ? 'Mettre à jour' : 'Ajouter'
  };
}
