'use client';
import { useCallback } from 'react';

export default function useFormChange({ setValues, errors, setErrors }) {
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setValues(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors, setErrors, setValues]);

  return handleChange;
}