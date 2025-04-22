'use client';
import { MdDragIndicator } from 'react-icons/md';

// Importation des composants
import MenuItemContent from './MenuItemContent';
import MenuItemActions from './MenuItemActions';
import ExpandButton from './ExpandButton';

export default function MenuItemComponent({
  item,
  isSubmenu = false,
  deviceType,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onDelete,
  onToggleVisibility,
  children // Pour les sous-menus
}) {

  return (
    <div className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''}`}>
      <div className={`flex items-center p-3 ${isSubmenu ? 'bg-primary-dark/50' : 'bg-primary-dark/30'} rounded-lg mb-2 group`}>
        {/* Poignée de glisser-déposer */}
        <div className="cursor-move text-white/40 hover:text-white/60 mr-3">
          <MdDragIndicator size={20} />
        </div>

        {/* Contenu de l'élément de menu (icône, titre, chemin) */}
        <MenuItemContent
          item={item}
          deviceType={deviceType}
          isSubmenu={isSubmenu}
        />

        {/* Bouton d'expansion pour les éléments avec sous-menu */}
        {item.children && item.children.length > 0 && (
          <ExpandButton
            isExpanded={isExpanded}
            onClick={() => onToggleExpand(item.id)}
          />
        )}

        {/* Actions */}
        <MenuItemActions
          itemId={item.id}
          deviceType={deviceType}
          actions={{
            toggleVisibility: onToggleVisibility,
            update: onUpdate,
            delete: onDelete
          }}
        />
      </div>

      {/* Sous-menu */}
      {children}
    </div>
  );
}
