'use client';

// Hooks
import usePreviewDevice from '@/backoffice/hooks/usePreviewDevice';
import useMenuInteraction from '@/backoffice/hooks/useMenuInteraction';

// Composants
import PreviewActionBar from './components/preview/PreviewActionBar';
import DevicePreviewContainer from './components/preview/DevicePreviewContainer';
import SiteHeader from './components/preview/SiteHeader';
import SiteContent from './components/preview/SiteContent';
import PreviewNote from './components/preview/PreviewNote';

export default function SiteMenuPreview({ menuItems, onConfirm, onCancel, initialDeviceType = 'desktop' }) {
  // Utiliser les hooks personnalisés
  const {
    deviceType,
    setDeviceType,
    previewWidth,
    previewHeight,
    isMobileView,
    deviceLabels
  } = usePreviewDevice(initialDeviceType);

  const {
    activeMenu,
    rotatedArrows,
    handleMouseEnter,
    handleMouseLeave
  } = useMenuInteraction();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Barre d'actions */}
      <PreviewActionBar
        deviceType={deviceType}
        onDeviceChange={setDeviceType}
        deviceLabels={deviceLabels}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      {/* Prévisualisation du site */}
      <DevicePreviewContainer
        previewWidth={previewWidth}
        previewHeight={previewHeight}
        isMobileView={isMobileView}
      >
        {/* En-tête du site avec menu */}
        <SiteHeader
          menuItems={menuItems}
          isMobileView={isMobileView}
          activeMenu={activeMenu}
          rotatedArrows={rotatedArrows}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Contenu de la page (simulation) */}
        <SiteContent />
      </DevicePreviewContainer>

      {/* Pied de page */}
      <PreviewNote text="Cette prévisualisation montre l'apparence du menu sur différents appareils. Utilisez les boutons en haut pour basculer entre les différentes tailles d'écran." />
    </div>
  );
}
