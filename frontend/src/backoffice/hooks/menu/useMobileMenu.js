import { useState, useEffect } from 'react';
import { apiService } from '@/backoffice/services/apiService';

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

      const url = `${apiUrl}/mobile-menu`;
      console.log('Fetching from URL:', url);

      // Utiliser le service API pour effectuer la requête GET
      // Désactiver la redirection automatique car ce n'est pas une action utilisateur
      const data = await apiService.get(url, {}, false);

      console.log('Mobile menu fetched successfully:', data.mobileMenuItems?.length || 0, 'items');
      setMenuItems(data.mobileMenuItems || []);
      setError(null);
    } catch (err) {
      // Ne pas afficher d'erreur si c'est une erreur d'authentification (déjà gérée par apiService)
      if (err.message !== 'Session expirée') {
        console.error('Error fetching mobile menu:', err);
        setError(err.message);
      }
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
