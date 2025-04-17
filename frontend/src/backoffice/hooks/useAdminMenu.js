"use client";
import { useState, useEffect } from 'react';

export function useAdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuItems = async () => {
    try {
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
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return { menuItems, isLoading, error, refreshMenu: fetchMenuItems };
}
