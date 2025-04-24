'use client';
import FormField from '../menu/components/forms/FormField';
import SelectField from '../menu/components/forms/SelectField';
import FormActions from '../menu/components/forms/FormActions';

/**
 * Composant de formulaire générique
 * @param {import('./forms/types').FormProps & { className?: string, customFields?: React.ReactNode, errorMessage?: string }} props
 */
export default function GenericForm({
  formFields = [],
  selectFields = [],
  values = {},
  errors = {},
  isSubmitting = false,
  handleChange,
  handleSubmit,
  onCancel,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  className = 'space-y-4',
  customFields = null,
  errorMessage = null
}) {
  return (
    <form onSubmit={handleSubmit} className={className}>
      {formFields.map(field => (
        <FormField
          key={field.id}
          {...field}
          value={values[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}

      {selectFields.map(field => (
        <SelectField
          key={field.id}
          {...field}
          value={values[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}

      {customFields}

      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
      />
    </form>
  );
}
