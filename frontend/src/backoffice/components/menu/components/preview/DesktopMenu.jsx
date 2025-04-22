'use client';
import { MdKeyboardArrowDown } from 'react-icons/md';
import DesktopSubmenu from './DesktopSubmenu';

export default function DesktopMenu({ 
  menuItems, 
  activeMenu, 
  rotatedArrows,
  onMouseEnter, 
  onMouseLeave,
  className = 'flex space-x-6 text-white'
}) {
  return (
    <nav className={className}>
      {menuItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => onMouseEnter(item.id)}
            onMouseLeave={onMouseLeave}
          >
            {hasChildren ? (
              <button className="flex items-center hover:text-accent-light transition-colors">
                {item.title}
                <MdKeyboardArrowDown
                  className={`ml-1 transition-transform duration-200 ${
                    rotatedArrows[item.id] ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <span className="hover:text-accent-light transition-colors cursor-pointer">
                {item.title}
              </span>
            )}

            {/* Sous-menu */}
            <DesktopSubmenu 
              children={item.children} 
              isVisible={activeMenu === item.id && hasChildren} 
            />
          </div>
        );
      })}
    </nav>
  );
}
