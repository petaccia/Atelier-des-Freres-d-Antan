'use client';
import { getIconByTitle } from '../../config/menuIcons';
import { deviceOptions } from '../../config/deviceOptions';

export default function MenuItemContent({ 
  item, 
  deviceType, 
  isSubmenu = false,
  className = "flex-grow"
}) {
  const showIcons = deviceOptions.find(option => option.value === deviceType)?.showIcons;
  
  return (
    <>
      {/* Icône (visible uniquement pour les appareils configurés pour afficher des icônes) */}
      {showIcons && !isSubmenu && (
        <div className="mr-3 text-accent">
          {getIconByTitle(item.title)}
        </div>
      )}
      
      {/* Titre et chemin */}
      <div className={className}>
        <h3 className="font-medium text-white">{item.title}</h3>
        <p className="text-sm text-white/60">{item.path || '#'}</p>
      </div>
    </>
  );
}
