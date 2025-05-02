"use client";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const menuEndpoint = process.env.NEXT_PUBLIC_MENU_ENDPOINT;

export function useMenu() {
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${apiUrl}${menuEndpoint}`);
        if (!response.ok) throw new Error("Failed to fetch menu");
        const data = await response.json();
        console.log("Menu data:", data);
        setMenuData(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menuData, isLoading, error };
}
