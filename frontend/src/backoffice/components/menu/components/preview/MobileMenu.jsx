'use client';
import { MdKeyboardArrowDown } from 'react-icons/md';
import MobileSubmenu from './MobileSubmenu';

export default function MobileMenu({ 
  menuItems,
  className = 'w-full'
}) {
  return (
    <div className={className}>
      <button className="w-full flex items-center justify-between p-3 bg-primary-dark/30 text-white rounded-lg">
        <span>Menu</span>
        <MdKeyboardArrowDown size={24} />
      </button>

      {/* Menu mobile déployé */}
      <div className="mt-2 bg-primary-dark/50 rounded-lg p-2 space-y-1">
        {menuItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.id} className="text-white">
              <div className="p-2 hover:bg-primary-dark/70 rounded cursor-pointer">
                {item.title}
              </div>

              {/* Sous-menu mobile */}
              {hasChildren && (
                <MobileSubmenu children={item.children} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
