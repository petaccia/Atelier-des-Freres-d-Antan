import { toast } from 'react-toastify';

export default function ConfirmationToast({ 
  message, 
  onConfirm, 
  confirmText = 'Confirmer', 
  cancelText = 'Annuler',
  confirmClass = 'bg-accent hover:bg-accent-light',
  cancelClass = 'bg-gray-600 hover:bg-gray-700' 
}) {
  return (
    <div>
      <p>{message}</p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          className={`px-3 py-1 text-white rounded-md transition-colors ${confirmClass}`}
        >
          {confirmText}
        </button>
        <button
          onClick={() => toast.dismiss()}
          className={`px-3 py-1 text-white rounded-md transition-colors ${cancelClass}`}
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}

