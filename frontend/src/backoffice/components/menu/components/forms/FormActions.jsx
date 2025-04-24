const FormActions = ({
  onCancel,
  isSubmitting = false,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  className = ''
}) => {
  return (
    <div className={`flex justify-end gap-4 mt-6 ${className}`}>
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className={`
          px-4 py-2 rounded-lg
          text-white bg-gray-600 hover:bg-gray-700
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {cancelLabel}
      </button>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          px-4 py-2 rounded-lg
          text-white bg-accent hover:bg-accent-dark
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2
        `}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            <span>Chargement...</span>
          </>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  );
};

export default FormActions;