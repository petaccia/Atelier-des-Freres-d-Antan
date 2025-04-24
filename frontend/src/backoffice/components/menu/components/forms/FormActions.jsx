const FormActions = ({
  onCancel,
  isSubmitting = false,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  className = ''
}) => {
  return (
    <div className={`flex justify-end gap-4 mt-8 ${className}`}>
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className={`
          px-6 py-2.5 rounded-lg
          text-white bg-gray-600 
          hover:bg-gray-700
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          font-medium text-sm
        `}
      >
        {cancelLabel}
      </button>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          px-6 py-2.5 rounded-lg
          text-white bg-accent
          hover:bg-accent-light
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          font-medium text-sm
          flex items-center gap-2
        `}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/>
            Chargement...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  );
};

export default FormActions;
