"use client";
import { useState, useEffect } from 'react';

export function useAdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/main`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du menu');
      }

      const data = await response.json();
      // La structure correcte est data.menuItems d'après le backend
      setMenuItems(data.menuItems || []);
      setMenuId(data.id); // Stocker l'ID du menu principal
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour créer un nouvel élément de menu
  const createMenuItem = async (itemData) => {
    try {
      // Simuler la création d'un élément de menu (à remplacer par un appel API réel)
      console.log('Création d\'un nouvel élément de menu:', itemData);

      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 500));

      // Ajouter l'élément au state local (temporaire, à remplacer par un rafraîchissement des données)
      const newItem = {
        id: Date.now(), // ID temporaire
        ...itemData,
        menuId: menuId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        children: []
      };

      // Mettre à jour le state local
      if (itemData.parentId) {
        // C'est un sous-menu, l'ajouter aux enfants du parent
        setMenuItems(prevItems => {
          return prevItems.map(item => {
            if (item.id === itemData.parentId) {
              return {
                ...item,
                children: [...(item.children || []), newItem]
              };
            }
            return item;
          });
        });
      } else {
        // C'est un élément principal, l'ajouter à la liste principale
        setMenuItems(prevItems => [...prevItems, newItem]);
      }

      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fonction pour mettre à jour un élément de menu
  const updateMenuItem = async (id, itemData) => {
    try {
      // Simuler la mise à jour d'un élément de menu (à remplacer par un appel API réel)
      console.log(`Mise à jour de l'élément de menu ${id}:`, itemData);

      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mettre à jour le state local
      setMenuItems(prevItems => {
        // Vérifier si c'est un élément principal
        const isMainItem = prevItems.some(item => item.id === id);

        if (isMainItem) {
          return prevItems.map(item => {
            if (item.id === id) {
              return { ...item, ...itemData, updatedAt: new Date() };
            }
            return item;
          });
        } else {
          // C'est un sous-menu, parcourir les enfants de chaque élément principal
          return prevItems.map(item => {
            if (item.children && item.children.some(child => child.id === id)) {
              return {
                ...item,
                children: item.children.map(child => {
                  if (child.id === id) {
                    return { ...child, ...itemData, updatedAt: new Date() };
                  }
                  return child;
                })
              };
            }
            return item;
          });
        }
      });

      return { id, ...itemData };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fonction pour supprimer un élément de menu
  const deleteMenuItem = async (id) => {
    try {
      // Simuler la suppression d'un élément de menu (à remplacer par un appel API réel)
      console.log(`Suppression de l'élément de menu ${id}`);

      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mettre à jour le state local
      setMenuItems(prevItems => {
        // Vérifier si c'est un élément principal
        const isMainItem = prevItems.some(item => item.id === id);

        if (isMainItem) {
          return prevItems.filter(item => item.id !== id);
        } else {
          // C'est un sous-menu, parcourir les enfants de chaque élément principal
          return prevItems.map(item => {
            if (item.children && item.children.some(child => child.id === id)) {
              return {
                ...item,
                children: item.children.filter(child => child.id !== id)
              };
            }
            return item;
          });
        }
      });

      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    isLoading,
    error,
    refreshMenu: fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
  };
}
