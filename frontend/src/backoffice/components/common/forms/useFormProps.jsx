'use client';
import { useState } from 'react';
import useFormChange from './hooks/useFormChange';
import useFormSubmit from './hooks/useFormSubmit';
import useFormFields from './hooks/useFormFields';

/**
 * Hook pour préparer la logique du formulaire
 * @param {import('./formTypes').FormConfigPropTypes} config
 */
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

  const handleChange = useFormChange({ setValues, errors, setErrors });
  const handleSubmit = useFormSubmit({
    onSubmit,
    values,
    setValues,
    setErrors,
    setIsSubmitting,
    initialValues
  });

  // Prépare les props pour GenericForm
  return {
    formFields: useFormFields({ fields, values, errors }),
    selectFields: useFormFields({ fields: selects, values, errors }),
    handleChange,
    handleSubmit,
    isSubmitting,
    onCancel,
    submitLabel,
    cancelLabel
  };
}
