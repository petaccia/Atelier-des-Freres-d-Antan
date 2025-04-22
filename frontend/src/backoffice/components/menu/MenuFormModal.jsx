'use client';
import { useEffect, useRef } from 'react';

// Hooks
import useForm from '@/backoffice/hooks/useForm';

// Composants
import ModalContainer from './components/forms/ModalContainer';
import FormField from './components/forms/FormField';
import SelectField from './components/forms/SelectField';
import FormActions from './components/forms/FormActions';

// Configuration
import { menuFormFields } from './config/menuFormFields';

export default function MenuFormModal({ isOpen, onClose, onSubmit, menuItems, editItem = null }) {
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
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues
  } = useForm({
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

  useEffect(() => {
    // Ne mettre à jour que si editItem ou isOpen a changé
    const editItemChanged = editItemRef.current !== editItem;
    const isOpenChanged = isOpenRef.current !== isOpen;

    if (editItemChanged || isOpenChanged) {
      editItemRef.current = editItem;
      isOpenRef.current = isOpen;

      if (editItem) {
        setValues({
          title: editItem.title || '',
          path: editItem.path || '/',
          order: editItem.order || 0,
          parentId: editItem.parentId || null
        });
      } else {
        // Réinitialiser le formulaire si nous créons un nouvel élément
        setValues(initialValues);
      }
    }
  }, [editItem, isOpen, setValues, initialValues]);

  // Gérer le changement de parent
  const handleParentChange = (e) => {
    const value = e.target.value;
    setValues(prev => ({
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

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={editItem ? 'Modifier un élément du menu' : 'Ajouter un élément au menu'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champs du formulaire basés sur la configuration */}
        {menuFormFields.map(field => (
          <FormField
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            type={field.type}
            value={values[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            min={field.min}
            required={field.required}
          />
        ))}

        {/* Champ de sélection du parent */}
        <SelectField
          id="parentId"
          name="parentId"
          label="Parent (optionnel)"
          value={values.parentId || ''}
          onChange={handleParentChange}
          options={parentOptions}
        />

        {/* Message d'erreur global */}
        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}

        {/* Boutons d'action */}
        <FormActions
          onCancel={onClose}
          isSubmitting={isSubmitting}
          submitLabel={editItem ? 'Mettre à jour' : 'Ajouter'}
        />
      </form>
    </ModalContainer>
  );
}
