'use client';

// Hooks
import useMenuForm from '@/backoffice/hooks/useMenuForm';

// Composants
import ModalForm from '../common/ModalForm';

export default function MenuFormModal({ isOpen, onClose, onSubmit, menuItems, editItem = null }) {
  // Utiliser le hook personnalisé pour gérer la logique du formulaire
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleParentChange,
    parentOptions,
    formFields,
    modalTitle,
    submitLabel
  } = useMenuForm({
    onSubmit,
    onClose,
    editItem,
    isOpen,
    menuItems
  });

  // Préparer les propriétés pour le formulaire générique
  const formProps = {
    formFields,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    submitLabel,
    selectFields: [
      {
        id: 'parentId',
        name: 'parentId',
        label: 'Parent (optionnel)',
        value: values.parentId || '',
        onChange: handleParentChange,
        options: parentOptions
      }
    ],
    errorMessage: errors.submit
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      formProps={formProps}
    />
  );
}
