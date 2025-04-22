import { useState } from 'react';

export default function useMenuInteraction() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [rotatedArrows, setRotatedArrows] = useState({});

  const handleMouseEnter = (menuId) => {
    setActiveMenu(menuId);
    setRotatedArrows((prev) => ({ ...prev, [menuId]: true }));
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setRotatedArrows({});
  };

  return {
    activeMenu,
    rotatedArrows,
    handleMouseEnter,
    handleMouseLeave
  };
}
