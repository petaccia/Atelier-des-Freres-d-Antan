import { useState, useEffect } from 'react';

export function useMobileMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const fetchMobileMenu = async () => {
    console.log('Fetching mobile menu...');
    try {
      setIsLoading(true);

      // Vérifier si l'URL de l'API est définie
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error('NEXT_PUBLIC_API_URL is not defined');
        throw new Error('API URL is not configured. Please check your environment variables.');
      }

      // Ajouter un paramètre timestamp pour éviter la mise en cache
      const timestamp = new Date().getTime();
      const url = `${apiUrl}/mobile-menu?_=${timestamp}`;

      console.log('Fetching from URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch mobile menu: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Mobile menu fetched successfully:', data.mobileMenuItems?.length || 0, 'items');
      setMenuItems(data.mobileMenuItems || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching mobile menu:', err);
      setError(err.message);
      // Utiliser des données fictives en cas d'erreur pour le développement
      setMenuItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const closeAllMenus = () => {
    setExpandedItems({});
  };

  useEffect(() => {
    fetchMobileMenu();
  }, []);

  return {
    menuItems,
    isLoading,
    error,
    expandedItems,
    toggleExpand,
    closeAllMenus,
    refreshMenu: fetchMobileMenu
  };
}
