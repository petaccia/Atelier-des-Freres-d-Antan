'use client';
import useFormProps from "@/backoffice/components/common/forms/useFormProps";
import { getFormFields, getSelectFields } from './config/formFields';
import { formatFormValues, getInitialValues } from './utils/formUtils';

export const useAddPageForm = (onSuccess, menuItems = []) => {
  return useFormProps({
    initialValues: getInitialValues(),
    fields: getFormFields(),
    selects: getSelectFields(menuItems),
    onSubmit: async (values) => {
      const formattedValues = formatFormValues(values);
      console.log('Données du formulaire:', formattedValues);
      onSuccess?.();
    },
    submitLabel: 'Ajouter la page'
  });
};

