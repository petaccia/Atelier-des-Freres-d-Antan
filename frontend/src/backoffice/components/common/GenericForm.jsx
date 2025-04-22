'use client';

// Composants
import FormField from '../menu/components/forms/FormField';
import SelectField from '../menu/components/forms/SelectField';
import FormActions from '../menu/components/forms/FormActions';

export default function GenericForm({
  formFields = [],
  values = {},
  errors = {},
  isSubmitting = false,
  handleChange,
  handleSubmit,
  onCancel,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  className = 'space-y-4',
  selectFields = [],
  customFields = null,
  errorMessage = null
}) {
  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Champs du formulaire basés sur la configuration */}
      {formFields.map(field => (
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
          placeholder={field.placeholder}
        />
      ))}

      {/* Champs de sélection */}
      {selectFields.map(field => (
        <SelectField
          key={field.id}
          id={field.id}
          name={field.name}
          label={field.label}
          value={field.value}
          onChange={field.onChange}
          options={field.options}
          required={field.required}
        />
      ))}

      {/* Champs personnalisés */}
      {customFields}

      {/* Message d'erreur global */}
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      {/* Boutons d'action */}
      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
      />
    </form>
  );
}
