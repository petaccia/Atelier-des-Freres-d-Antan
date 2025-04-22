'use client';
import { useState } from 'react';
import { MdVisibility, MdEdit, MdPublish } from 'react-icons/md';
import MenuList from './MenuList';
import SiteMenuPreview from './SiteMenuPreview';

export default function MenuPublishWorkflow({
  menuItems,
  draftItems,
  isLoading,
  onUpdate,
  onDelete,
  onPublish,
  onSaveDraft,
  onDiscardChanges
}) {
  const [mode, setMode] = useState('edit'); // 'edit' ou 'preview'
  const [hasChanges, setHasChanges] = useState(false);

  // Utiliser les brouillons s'ils existent et ne sont pas vides, sinon utiliser les éléments publiés
  const itemsToDisplay = draftItems && draftItems.length > 0 ? draftItems : menuItems;

  const handleUpdate = async (id) => {
    await onUpdate(id);
    setHasChanges(true);
  };

  const handleDelete = async (id) => {
    await onDelete(id);
    setHasChanges(true);
  };

  const handleSaveDraft = async () => {
    await onSaveDraft();
    setHasChanges(false);
  };

  const handlePublish = async () => {
    await onPublish();
    setHasChanges(false);
    setMode('edit');
  };

  const handleDiscardChanges = async () => {
    await onDiscardChanges();
    setHasChanges(false);
    setMode('edit');
  };

  const togglePreview = () => {
    if (mode === 'edit') {
      // Sauvegarder automatiquement comme brouillon avant de prévisualiser
      if (hasChanges) {
        handleSaveDraft();
      }
      setMode('preview');
    } else {
      setMode('edit');
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre d'actions */}
      <div className="flex justify-between items-center bg-primary-dark/30 p-4 rounded-lg">
        <div className="text-white/80">
          {hasChanges && (
            <span className="text-amber-400 text-sm">
              * Vous avez des modifications non publiées
            </span>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={togglePreview}
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
            <button
              onClick={handlePublish}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              disabled={isLoading}
            >
              <MdPublish className="mr-2" />
              Publier les changements
            </button>
          )}
          {hasChanges && (
            <button
              onClick={handleDiscardChanges}
              className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Annuler les changements
            </button>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      {mode === 'edit' ? (
        <MenuList
          items={itemsToDisplay}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <SiteMenuPreview
          menuItems={itemsToDisplay}
          onConfirm={handlePublish}
          onCancel={() => setMode('edit')}
        />
      )}
    </div>
  );
}
