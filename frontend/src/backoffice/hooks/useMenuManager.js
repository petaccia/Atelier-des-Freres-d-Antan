import { useState, useEffect } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function useMenuManager() {
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [expandedItems, setExpandedItems] = useState({});
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données du menu en fonction du device sélectionné
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const endpoint = selectedDevice === 'desktop' ? '/desktop-menu' : '/mobile-menu';
        const response = await fetch(`${apiUrl}${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`${selectedDevice} menu data from API:`, data);
        setMenuData(data);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
    console.log('Fetching menu data...');
  }, [selectedDevice]);

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const closeAllMenus = () => {
    setExpandedItems({});
  };

  return {
    selectedDevice,
    setSelectedDevice,
    expandedItems,
    toggleExpand,
    closeAllMenus,
    menuData,
    isLoading,
    error
  };
};