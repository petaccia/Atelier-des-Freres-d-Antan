import { useState, useEffect, useRef } from 'react';

export default function useForm({
  initialValues = {},
  onSubmit,
  validate,
  resetOnSubmit = true
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Mettre à jour les valeurs lorsque initialValues change
  // Note: We're using a ref to avoid infinite loops
  const initialValuesRef = useRef(initialValues);

  useEffect(() => {
    // Only update if initialValues has actually changed
    if (JSON.stringify(initialValuesRef.current) !== JSON.stringify(initialValues)) {
      initialValuesRef.current = initialValues;
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Marquer le champ comme touché
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    // Marquer le champ comme touché
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Valider le champ
    if (validate) {
      const fieldErrors = validate(values);
      setErrors(fieldErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marquer tous les champs comme touchés
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Valider le formulaire
    if (validate) {
      const formErrors = validate(values);
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        return;
      }
    }

    setIsSubmitting(true);

    try {
      await onSubmit(values);

      if (resetOnSubmit) {
        setValues(initialValues);
        setTouched({});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({ ...prev, submit: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues
  };
}
