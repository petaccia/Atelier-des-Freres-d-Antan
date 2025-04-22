import { useState, useEffect } from 'react';

// URL de l'API
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const menuEndpoint = '/menu/main';

export default function useMenuManager() {
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

  // Filtrer les éléments de menu en fonction de l'appareil sélectionné
  const menuItems = menuData?.menuItems || [];

  return {
    selectedDevice,
    setSelectedDevice,
    expandedItems,
    toggleExpand,
    menuItems,
    isLoading,
    error
  };
}
