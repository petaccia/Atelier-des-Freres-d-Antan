'use client';

export default function FormActions({ 
  onCancel, 
  isSubmitting, 
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  className = 'flex justify-end space-x-3 pt-4'
}) {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-accent/30 text-white/80 rounded-lg hover:bg-accent/10 transition-colors"
        disabled={isSubmitting}
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-accent hover:bg-accent-light text-primary rounded-lg transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enregistrement...' : submitLabel}
      </button>
    </div>
  );
}
