"use client";
import { useState } from "react";

export const useMenuManager = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuTimeOut, menuSetTimeOut] = useState(null);
  const [rotatedArrows, setRotatedArrows] = useState({});

  const handleMouseEnter = (menu) => {
    clearTimeout(menuTimeOut);
    setActiveMenu(menu);
    setRotatedArrows((prev) => ({ ...prev, [menu]: true }));
  };

  const hideMenu = () => {
    const timeOut = setTimeout(() => {
      setActiveMenu(null);
      setRotatedArrows({});
    }, 200);
    menuSetTimeOut(timeOut);
  };

  return {
    activeMenu,
    rotatedArrows,
    handleMouseEnter,
    hideMenu,
  };
};
