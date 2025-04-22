'use client';

// Importation des composants
import MenuHeader from './components/MenuHeader';
import DeviceSelector from './components/DeviceSelector';
import MenuList from './components/MenuList';
import DeviceTips from './components/DeviceTips';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

// Importation du hook personnalisé
import useMenuManager from '@/backoffice/hooks/useMenuManager';

// Importation de la configuration
import { deviceOptions } from './config/deviceOptions';

export default function SimpleMenuManager({
  onUpdate,
  onDelete,
  onToggleVisibility,
  onPublish,
  onSaveDraft,
  isLoading: externalLoading
}) {
  // Utiliser le hook personnalisé pour gérer la logique
  const {
    selectedDevice,
    setSelectedDevice,
    expandedItems,
    toggleExpand,
    menuItems,
    isLoading,
    error
  } = useMenuManager();

  // État de chargement
  if (isLoading || externalLoading) {
    return <LoadingState />;
  }

  // Gestion des erreurs
  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <MenuHeader
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
      />

      {/* Sélection d'appareil */}
      <DeviceSelector
        title="Sélectionner un appareil"
        options={deviceOptions}
        selectedValue={selectedDevice}
        onValueChange={setSelectedDevice}
      />

      {/* Liste des menus */}
      <MenuList
        menuItems={menuItems}
        deviceType={selectedDevice}
        expandedItems={expandedItems}
        toggleExpand={toggleExpand}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onToggleVisibility={onToggleVisibility}
      />

      {/* Conseils spécifiques pour les menus mobile et tablette */}
      <DeviceTips deviceType={selectedDevice} />
    </div>
  );
}
