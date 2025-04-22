'use client';
import { MdVisibility, MdEdit, MdPublish } from 'react-icons/md';

export default function WorkflowActions({ 
  mode,
  hasChanges,
  isLoading,
  onTogglePreview,
  onPublish,
  onDiscardChanges,
  className = 'flex space-x-3'
}) {
  return (
    <div className={className}>
      <button
        onClick={onTogglePreview}
        className="flex items-center px-4 py-2 bg-primary-dark hover:bg-primary-dark/70 text-white rounded-lg transition-colors"
      >
        {mode === 'edit' ? (
          <>
            <MdVisibility className="mr-2" />
            Prévisualiser le site
          </>
        ) : (
          <>
            <MdEdit className="mr-2" />
            Retour à l'édition
          </>
        )}
      </button>
      
      {hasChanges && (
        <>
          <button
            onClick={onPublish}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            disabled={isLoading}
          >
            <MdPublish className="mr-2" />
            Publier les changements
          </button>
          
          <button
            onClick={onDiscardChanges}
            className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            disabled={isLoading}
          >
            Annuler les changements
          </button>
        </>
      )}
    </div>
  );
}
