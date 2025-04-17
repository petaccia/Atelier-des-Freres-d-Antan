"use client";
import { useState, useEffect } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const menuEndpoint = process.env.NEXT_PUBLIC_MENU_ENDPOINT;

export function useAdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}${menuEndpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch menu');
      const data = await response.json();
      setMenuItems(data?.menuItems || []);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createMenuItem = async (newItem) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}${menuEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
      });
      
      if (!response.ok) throw new Error('Failed to create menu item');
      await fetchMenuItems();
      return true;
    } catch (err) {
      console.error('Error creating menu item:', err);
      setError(err.message);
      return false;
    }
  };

  const updateMenuItem = async (id, updatedItem) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}${menuEndpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedItem)
      });
      
      if (!response.ok) throw new Error('Failed to update menu item');
      await fetchMenuItems();
      return true;
    } catch (err) {
      console.error('Error updating menu item:', err);
      setError(err.message);
      return false;
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}${menuEndpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete menu item');
      await fetchMenuItems();
      return true;
    } catch (err) {
      console.error('Error deleting menu item:', err);
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    isLoading,
    error,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshMenu: fetchMenuItems
  };
}