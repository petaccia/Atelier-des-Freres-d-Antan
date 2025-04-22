'use client';
import { useState, useEffect } from 'react';

// Importation des composants
import MenuHeader from './components/MenuHeader';
import DeviceSelector from './components/DeviceSelector';
import MenuList from './components/MenuList';
import DeviceTips from './components/DeviceTips';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

// URL de l'API
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const menuEndpoint = '/menu/main';

export default function SimpleMenuManager({
  onUpdate,
  onDelete,
  onToggleVisibility,
  onPublish,
  onSaveDraft,
  isLoading: externalLoading
}) {
  // États
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [expandedItems, setExpandedItems] = useState({});
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données du menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}${menuEndpoint}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Menu data from API:', data);
        setMenuData(data);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Fonction pour basculer l'expansion d'un élément
  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Pas besoin de fonction de rendu ici, elle est déplacée dans le composant MenuList

  // État de chargement
  if (isLoading || externalLoading) {
    return <LoadingState />;
  }

  // Gestion des erreurs
  if (error) {
    return <ErrorState error={error} />;
  }

  // Filtrer les éléments de menu en fonction de l'appareil sélectionné
  // Pour l'instant, nous affichons tous les éléments pour tous les appareils
  const menuItems = menuData?.menuItems || [];

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <MenuHeader
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
      />

      {/* Sélection d'appareil */}
      <DeviceSelector
        selectedDevice={selectedDevice}
        onDeviceChange={setSelectedDevice}
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
