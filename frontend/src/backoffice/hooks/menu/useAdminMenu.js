"use client";
import { useState, useEffect, useCallback } from 'react';

export function useAdminMenu() {
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);

  const fetchMenu = useCallback(async (deviceType) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      const endpoint = deviceType === 'desktop' ? '/desktop-menu' : '/mobile-menu';
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${deviceType} menu`);
      }

      const data = await response.json();
      setMenuItems(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshMenu = useCallback(async () => {
    return fetchMenu(activeDevice);
  }, [activeDevice, fetchMenu]);

  const saveDraft = async () => {
    try {
      const draftData = {
        menuItems,
        deviceType: activeDevice,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('menuDraft', JSON.stringify(draftData));
      setHasDraft(true);
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const publishChanges = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      const endpoint = activeDevice === 'desktop' ? '/desktop-menu' : '/mobile-menu';
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ menuItems })
      });

      if (!response.ok) {
        throw new Error('Failed to publish changes');
      }

      localStorage.removeItem('menuDraft');
      setHasDraft(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const discardChanges = async () => {
    try {
      localStorage.removeItem('menuDraft');
      setHasDraft(false);
      await refreshMenu();
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loadDraft = useCallback(() => {
    try {
      const savedDraft = localStorage.getItem('menuDraft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.deviceType === activeDevice) {
          setMenuItems(draft.menuItems);
          setHasDraft(true);
        }
      }
    } catch (err) {
      console.error('Error loading draft:', err);
    }
  }, [activeDevice]);

  // Charger le menu initial et vérifier les brouillons
  useEffect(() => {
    fetchMenu(activeDevice);
    loadDraft();
  }, [activeDevice, fetchMenu, loadDraft]);

  return {
    activeDevice,
    setActiveDevice,
    menuItems,
    isLoading,
    error,
    hasDraft,
    refreshMenu,
    saveDraft,
    publishChanges,
    discardChanges
  };
}
