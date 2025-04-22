"use client";
import { useState, useEffect } from 'react';

export function useAdminMenu() {
  const [menuItems, setMenuItems] = useState([]); // Éléments publiés
  const [draftItems, setDraftItems] = useState([]); // Brouillon des éléments
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);

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

      // Trouver l'élément à mettre à jour et son parent actuel
      let currentItem = null;
      let currentParentId = null;
      let isMainItem = false;

      // Rechercher dans les éléments principaux
      for (const item of menuItems) {
        if (item.id === id) {
          currentItem = item;
          isMainItem = true;
          break;
        }
        // Rechercher dans les sous-menus
        if (item.children && item.children.length > 0) {
          const childItem = item.children.find(child => child.id === id);
          if (childItem) {
            currentItem = childItem;
            currentParentId = item.id;
            break;
          }
        }
      }

      if (!currentItem) {
        throw new Error(`Élément avec l'ID ${id} non trouvé`);
      }

      // Vérifier si le parent a changé
      const parentChanged = currentParentId !== itemData.parentId;

      // Si le parent a changé, nous devons réorganiser la structure
      if (parentChanged) {
        setMenuItems(prevItems => {
          // 1. Supprimer l'élément de sa position actuelle
          let newItems = [...prevItems];

          if (isMainItem) {
            // Supprimer de la liste principale
            newItems = newItems.filter(item => item.id !== id);
          } else {
            // Supprimer du sous-menu
            newItems = newItems.map(item => {
              if (item.id === currentParentId) {
                return {
                  ...item,
                  children: item.children.filter(child => child.id !== id)
                };
              }
              return item;
            });
          }

          // 2. Ajouter l'élément à sa nouvelle position
          const updatedItem = {
            ...currentItem,
            ...itemData,
            updatedAt: new Date()
          };

          if (itemData.parentId) {
            // Ajouter comme sous-menu
            return newItems.map(item => {
              if (item.id === itemData.parentId) {
                return {
                  ...item,
                  children: [...(item.children || []), updatedItem]
                };
              }
              return item;
            });
          } else {
            // Ajouter comme élément principal
            return [...newItems, updatedItem];
          }
        });
      } else {
        // Mise à jour simple sans changement de parent
        setMenuItems(prevItems => {
          if (isMainItem) {
            return prevItems.map(item => {
              if (item.id === id) {
                return { ...item, ...itemData, updatedAt: new Date() };
              }
              return item;
            });
          } else {
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
      }

      return { id, ...itemData };
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError(err.message);
      throw err;
    }
  };

  // Fonction pour supprimer un élément de menu
  const deleteMenuItem = async (id) => {
    try {
      // Trouver l'élément à supprimer pour vérifier s'il a des sous-menus
      let itemToDelete = null;
      let isMainItem = false;
      let hasChildren = false;

      // Rechercher dans les éléments principaux
      for (const item of menuItems) {
        if (item.id === id) {
          itemToDelete = item;
          isMainItem = true;
          hasChildren = item.children && item.children.length > 0;
          break;
        }
        // Rechercher dans les sous-menus
        if (item.children && item.children.length > 0) {
          const childItem = item.children.find(child => child.id === id);
          if (childItem) {
            itemToDelete = childItem;
            break;
          }
        }
      }

      if (!itemToDelete) {
        throw new Error(`Élément avec l'ID ${id} non trouvé`);
      }

      // Vérifier si l'élément a des sous-menus et demander confirmation si nécessaire
      if (hasChildren) {
        console.warn(`L'élément ${itemToDelete.title} a des sous-menus qui seront également supprimés`);
      }

      // Simuler la suppression d'un élément de menu (à remplacer par un appel API réel)
      console.log(`Suppression de l'élément de menu ${id}:`, itemToDelete.title);

      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mettre à jour le state local
      setMenuItems(prevItems => {
        if (isMainItem) {
          // Supprimer l'élément principal et tous ses sous-menus
          return prevItems.filter(item => item.id !== id);
        } else {
          // C'est un sous-menu, le supprimer du parent
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

      // Mettre à jour également les brouillons si nécessaire
      if (hasDraft) {
        setDraftItems(prevItems => {
          if (isMainItem) {
            // Supprimer l'élément principal et tous ses sous-menus
            return prevItems.filter(item => item.id !== id);
          } else {
            // C'est un sous-menu, le supprimer du parent
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

        // Mettre à jour le brouillon dans le stockage local
        try {
          const updatedDraft = draftItems.filter(item => item.id !== id);
          localStorage.setItem('menuDraft', JSON.stringify(updatedDraft));
        } catch (e) {
          console.error('Erreur lors de la mise à jour du brouillon:', e);
        }
      }

      // Rafraîchir les données depuis le serveur pour s'assurer que tout est synchronisé
      // Dans une implémentation réelle, nous ferions cela après l'appel API
      // fetchMenuItems();

      return {
        success: true,
        deletedItem: itemToDelete,
        hasDeletedChildren: hasChildren
      };
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err.message);
      throw err;
    }
  };

  // Charger le brouillon depuis le stockage local
  const loadDraft = () => {
    try {
      const savedDraft = localStorage.getItem('menuDraft');
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        setDraftItems(parsedDraft);
        setHasDraft(true);
        return parsedDraft;
      }
    } catch (err) {
      console.error('Erreur lors du chargement du brouillon:', err);
    }
    return null;
  };

  // Sauvegarder le brouillon dans le stockage local
  const saveDraft = async () => {
    try {
      // Utiliser les éléments actuels comme brouillon
      const draft = [...menuItems];
      localStorage.setItem('menuDraft', JSON.stringify(draft));
      setDraftItems(draft);
      setHasDraft(true);
      return draft;
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du brouillon:', err);
      throw err;
    }
  };

  // Publier les changements (remplacer les éléments publiés par le brouillon)
  const publishChanges = async () => {
    try {
      // Dans une implémentation réelle, nous enverrions les changements au backend ici
      // Pour l'instant, nous simulons simplement la publication
      await new Promise(resolve => setTimeout(resolve, 500));

      // Supprimer le brouillon après publication
      localStorage.removeItem('menuDraft');
      setHasDraft(false);

      return { success: true, message: 'Menu publié avec succès' };
    } catch (err) {
      console.error('Erreur lors de la publication:', err);
      throw err;
    }
  };

  // Annuler les changements (supprimer le brouillon et revenir aux éléments publiés)
  const discardChanges = async () => {
    try {
      localStorage.removeItem('menuDraft');
      setDraftItems([]);
      setHasDraft(false);
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de l\'annulation des changements:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMenuItems();
    loadDraft(); // Charger le brouillon au démarrage
  }, []);

  return {
    menuItems,
    draftItems,
    isLoading,
    error,
    hasDraft,
    refreshMenu: fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    saveDraft,
    publishChanges,
    discardChanges
  };
}
