'use client';
import { useState } from 'react';
import { MdVisibility, MdEdit, MdPublish, MdPhoneIphone, MdTablet, MdLaptop, MdDesktopWindows } from 'react-icons/md';
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
  const [deviceType, setDeviceType] = useState('desktop'); // 'mobile', 'tablet', 'laptop', 'desktop'

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
        <div className="flex items-center">
          {/* Boutons de sélection d'appareil - visibles uniquement en mode édition */}
          {mode === 'edit' && (
            <div className="flex bg-primary-dark/50 p-1 rounded-lg mr-3">
              <button
                onClick={() => {
                  setDeviceType('mobile');
                  togglePreview();
                }}
                className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
                title="Prévisualiser sur Mobile"
              >
                <MdPhoneIphone size={20} />
              </button>
              <button
                onClick={() => {
                  setDeviceType('tablet');
                  togglePreview();
                }}
                className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
                title="Prévisualiser sur Tablette"
              >
                <MdTablet size={20} />
              </button>
              <button
                onClick={() => {
                  setDeviceType('laptop');
                  togglePreview();
                }}
                className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
                title="Prévisualiser sur Portable"
              >
                <MdLaptop size={20} />
              </button>
              <button
                onClick={() => {
                  setDeviceType('desktop');
                  togglePreview();
                }}
                className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
                title="Prévisualiser sur Bureau"
              >
                <MdDesktopWindows size={20} />
              </button>
            </div>
          )}

          <div className="text-white/80">
            {hasChanges && (
              <span className="text-amber-400 text-sm">
                * Vous avez des modifications non publiées
              </span>
            )}
          </div>
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
          initialDeviceType={deviceType}
        />
      )}
    </div>
  );
}
