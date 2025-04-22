'use client';
import MenuPreviewItem from './MenuPreviewItem';

export default function MenuPreviewNavigation({ 
  menuItems, 
  activeMenu, 
  rotatedArrows,
  onMouseEnter, 
  onMouseLeave,
  className = 'flex justify-center space-x-6 text-white'
}) {
  return (
    <nav className={className}>
      {menuItems.map(item => (
        <MenuPreviewItem 
          key={item.id}
          item={item}
          isActive={activeMenu === item.id}
          rotated={rotatedArrows[item.id]}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </nav>
  );
}
