'use client';

// Hooks
import useMenuPreview from '@/backoffice/hooks/useMenuPreview';

// Composants
import PreviewHeader from './components/preview/PreviewHeader';
import PreviewActions from './components/preview/PreviewActions';
import PreviewDescription from './components/preview/PreviewDescription';
import PreviewContainer from './components/preview/PreviewContainer';
import MenuPreviewNavigation from './components/preview/MenuPreviewNavigation';
import PreviewNote from './components/preview/PreviewNote';

export default function MenuPreview({ menuItems, onConfirm, onCancel }) {
  // Utiliser le hook personnalisé pour gérer l'état du menu
  const {
    activeMenu,
    rotatedArrows,
    handleMouseEnter,
    handleMouseLeave
  } = useMenuPreview();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* En-tête avec actions */}
      <PreviewHeader
        title="Prévisualisation du menu"
        actions={
          <PreviewActions
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        }
      />

      <div className="border-t border-b border-gray-200 py-4">
        {/* Description */}
        <PreviewDescription text="Voici un aperçu de votre menu. Vérifiez que tout est correct avant de confirmer les changements." />

        {/* Prévisualisation du menu */}
        <PreviewContainer>
          <MenuPreviewNavigation
            menuItems={menuItems}
            activeMenu={activeMenu}
            rotatedArrows={rotatedArrows}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </PreviewContainer>
      </div>

      {/* Note */}
      <PreviewNote />
    </div>
  );
}
