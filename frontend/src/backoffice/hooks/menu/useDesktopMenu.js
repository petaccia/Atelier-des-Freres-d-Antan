import { useState, useEffect } from 'react';

export function useDesktopMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [rotatedArrows, setRotatedArrows] = useState({});

  const fetchDesktopMenu = async () => {
    console.log('Fetching desktop menu...');
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
      const url = `${apiUrl}/desktop-menu?_=${timestamp}`;

      console.log('Fetching from URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch desktop menu: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Desktop menu fetched successfully:', data.desktopMenuItems?.length || 0, 'items');
      setMenuItems(data.desktopMenuItems || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching desktop menu:', err);
      setError(err.message);
      // Utiliser des données fictives en cas d'erreur pour le développement
      setMenuItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseEnter = (menuId) => {
    setActiveMenu(menuId);
    setRotatedArrows((prev) => ({ ...prev, [menuId]: true }));
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setRotatedArrows({});
  };

  useEffect(() => {
    fetchDesktopMenu();
  }, []);

  return {
    menuItems,
    isLoading,
    error,
    activeMenu,
    rotatedArrows,
    handleMouseEnter,
    handleMouseLeave,
    refreshMenu: fetchDesktopMenu
  };
}
