'use client';
import { useCallback } from 'react';

export default function useFormSubmit({
  onSubmit,
  values,
  initialValues,
  setValues,
  setErrors,
  setIsSubmitting
}) {
  const handleSubmit = useCallback(async (e) => {
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
  }, [onSubmit, values, initialValues, setValues, setErrors, setIsSubmitting]);

  return handleSubmit;
}