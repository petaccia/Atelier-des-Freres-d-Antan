export default function SubmitButton({ isSubmitting, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      className={`mt-6 bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 self-center ${
        disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
    </button>
  );
}