'use client';
import { useState } from 'react';

export default function useFormProps({
  initialValues = {},
  fields = [],
  selects = [],
  onSubmit,
  onCancel,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler'
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      // Réinitialiser le formulaire après succès
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      // Gérer les erreurs de validation ou de soumission
      if (error.errors) {
        setErrors(error.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formProps = {
    formFields: fields.map(field => ({
      id: field.name,
      name: field.name,
      label: field.label,
      type: field.type || 'text',
      required: field.required || false,
      placeholder: field.placeholder,
      min: field.min,
      value: values[field.name] || ''
    })),
    selectFields: selects.map(select => ({
      id: select.name,
      name: select.name,
      label: select.label,
      value: values[select.name] || '',
      options: select.options,
      required: select.required || false
    })),
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    onCancel,
    submitLabel,
    cancelLabel
  };

  return formProps;
}