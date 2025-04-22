'use client';
import { MdCheck } from 'react-icons/md';

export default function PreviewActions({ 
  onConfirm, 
  onCancel,
  confirmLabel = 'Confirmer et publier',
  cancelLabel = 'Annuler',
  className = 'flex space-x-3'
}) {
  return (
    <div className={className}>
      <button
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {cancelLabel}
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
      >
        <MdCheck className="mr-1" size={18} />
        {confirmLabel}
      </button>
    </div>
  );
}
