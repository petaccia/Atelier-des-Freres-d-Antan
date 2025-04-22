'use client';
import { useState, useEffect } from 'react';
import {
  MdRefresh,
  MdInfo,
  MdPhoneIphone,
  MdTablet,
  MdLaptop,
  MdDesktopWindows,
  MdPublish,
  MdEdit
} from 'react-icons/md';

// Importation des composants
import DeviceButton from './components/DeviceButton';
import MenuItemComponent from './components/MenuItemComponent';
import DeviceTips from './components/DeviceTips';

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

  // Fonction pour rendre un élément de menu avec ses sous-menus
  const renderMenuItemWithSubmenu = (item) => {
    const isExpanded = expandedItems[item.id];

    return (
      <div key={item.id}>
        <MenuItemComponent
          item={item}
          isSubmenu={false}
          deviceType={selectedDevice}
          isExpanded={isExpanded}
          onToggleExpand={toggleExpand}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleVisibility={onToggleVisibility}
        >
          {item.children && item.children.length > 0 && isExpanded && (
            <div className="mb-4">
              {item.children.map(child => (
                <MenuItemComponent
                  key={child.id}
                  item={child}
                  isSubmenu={true}
                  deviceType={selectedDevice}
                  isExpanded={expandedItems[child.id]}
                  onToggleExpand={toggleExpand}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onToggleVisibility={onToggleVisibility}
                >
                  {child.children && child.children.length > 0 && expandedItems[child.id] && (
                    <div className="mb-4">
                      {child.children.map(grandChild => (
                        <MenuItemComponent
                          key={grandChild.id}
                          item={grandChild}
                          isSubmenu={true}
                          deviceType={selectedDevice}
                          isExpanded={expandedItems[grandChild.id]}
                          onToggleExpand={toggleExpand}
                          onUpdate={onUpdate}
                          onDelete={onDelete}
                          onToggleVisibility={onToggleVisibility}
                        />
                      ))}
                    </div>
                  )}
                </MenuItemComponent>
              ))}
            </div>
          )}
        </MenuItemComponent>
      </div>
    );
  };

  // État de chargement
  if (isLoading || externalLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-primary-dark/30 rounded-lg">
        <div className="animate-spin text-accent mb-4">
          <MdRefresh size={40} />
        </div>
        <p className="text-white">Chargement du menu...</p>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg">
        <div className="text-red-500 mb-4">
          <MdInfo size={40} />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Erreur de chargement</h3>
        <p className="text-white/80 text-center mb-4">{error}</p>
      </div>
    );
  }

  // Filtrer les éléments de menu en fonction de l'appareil sélectionné
  // Pour l'instant, nous affichons tous les éléments pour tous les appareils
  const menuItems = menuData?.menuItems || [];

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="bg-primary-dark/50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-xl font-semibold text-accent">Gestion du Menu</h2>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSaveDraft}
              className="px-4 py-2 bg-primary-dark hover:bg-primary-dark/80 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <MdEdit size={18} />
              <span>Enregistrer brouillon</span>
            </button>

            <button
              onClick={onPublish}
              className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <MdPublish size={18} />
              <span>Publier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sélection d'appareil */}
      <div className="bg-primary-dark/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-3">Sélectionner un appareil</h3>

        <div className="flex flex-wrap gap-2">
          <DeviceButton
            icon={<MdPhoneIphone size={20} />}
            label="Mobile"
            isSelected={selectedDevice === 'mobile'}
            onClick={() => setSelectedDevice('mobile')}
          />

          <DeviceButton
            icon={<MdTablet size={20} />}
            label="Tablette"
            isSelected={selectedDevice === 'tablet'}
            onClick={() => setSelectedDevice('tablet')}
          />

          <DeviceButton
            icon={<MdLaptop size={20} />}
            label="Portable"
            isSelected={selectedDevice === 'laptop'}
            onClick={() => setSelectedDevice('laptop')}
          />

          <DeviceButton
            icon={<MdDesktopWindows size={20} />}
            label="Bureau"
            isSelected={selectedDevice === 'desktop'}
            onClick={() => setSelectedDevice('desktop')}
          />
        </div>
      </div>

      {/* Contenu du menu */}
      <div className="bg-primary-dark/20 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-accent">
            Menu {
              selectedDevice === 'mobile'
                ? 'Mobile'
                : selectedDevice === 'tablet'
                  ? 'Tablette'
                  : selectedDevice === 'laptop'
                    ? 'Portable'
                    : 'Bureau'
            }
          </h3>

          <div className="text-white/60 text-sm">
            {selectedDevice === 'mobile' || selectedDevice === 'tablet'
              ? 'Avec icônes'
              : 'Sans icônes'
            }
          </div>
        </div>

        {/* Liste des éléments de menu */}
        <div className="space-y-2">
          {menuItems.length > 0 ? (
            menuItems.map(item => renderMenuItemWithSubmenu(item))
          ) : (
            <p className="text-white/60 text-center py-8">
              Aucun élément de menu n'est configuré pour cet appareil.
            </p>
          )}
        </div>
      </div>

      {/* Notes spécifiques pour les menus mobile et tablette */}
      <DeviceTips deviceType={selectedDevice} />
    </div>
  );
}
