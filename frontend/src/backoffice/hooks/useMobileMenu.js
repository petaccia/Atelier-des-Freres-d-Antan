import { useState, useEffect } from 'react';

export function useMobileMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const fetchMobileMenu = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mobile-menu`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch mobile menu');
      }

      const data = await response.json();
      setMenuItems(data.mobileMenuItems || []);
      setError(null);
    } catch (err) {
      setError(err.message);
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