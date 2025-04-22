'use client';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export default function SiteHeader({ 
  menuItems, 
  isMobileView,
  activeMenu,
  rotatedArrows,
  onMouseEnter,
  onMouseLeave,
  className = 'bg-primary p-6'
}) {
  return (
    <div className={className}>
      <div className={`${isMobileView ? 'flex flex-col items-center space-y-4' : 'flex justify-between items-center'}`}>
        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent">
          LOGO
        </div>

        {/* Menu principal - version desktop ou mobile */}
        {!isMobileView ? (
          <DesktopMenu 
            menuItems={menuItems}
            activeMenu={activeMenu}
            rotatedArrows={rotatedArrows}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ) : (
          <MobileMenu menuItems={menuItems} />
        )}
      </div>
    </div>
  );
}
