import { useState, useEffect } from 'react';

export function useDesktopMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [rotatedArrows, setRotatedArrows] = useState({});

  const fetchDesktopMenu = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/desktop-menu`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch desktop menu');
      }

      const data = await response.json();
      setMenuItems(data.desktopMenuItems || []);
      setError(null);
    } catch (err) {
      setError(err.message);
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