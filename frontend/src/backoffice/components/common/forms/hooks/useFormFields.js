'use client';
import { useMemo } from 'react';

export default function useFormFields({ fields, values }) {
  const formFields = useMemo(() => {
    return fields.map(field => ({
      id: field.name,
      name: field.name,
      label: field.label,
      type: field.type || 'text',
      required: field.required || false,
      placeholder: field.placeholder,
      min: field.min,
      value: values[field.name] || ''
    }));
  }, [fields, values]);

  return formFields;
}