'use client';
import MenuItemComponent from './MenuItemComponent';

export default function MenuList({ 
  menuItems, 
  deviceType, 
  expandedItems, 
  toggleExpand, 
  onUpdate, 
  onDelete, 
  onToggleVisibility 
}) {
  // Fonction pour rendre un élément de menu avec ses sous-menus
  const renderMenuItemWithSubmenu = (item) => {
    const isExpanded = expandedItems[item.id];
    
    return (
      <div key={item.id}>
        <MenuItemComponent
          item={item}
          isSubmenu={false}
          deviceType={deviceType}
          isExpanded={isExpanded}
          onToggleExpand={toggleExpand}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleVisibility={onToggleVisibility}
        >
          {item.children && item.children.length > 0 && isExpanded && (
            <div className="mb-4">
              {item.children.map(child => (
                <MenuItemComponent
                  key={child.id}
                  item={child}
                  isSubmenu={true}
                  deviceType={deviceType}
                  isExpanded={expandedItems[child.id]}
                  onToggleExpand={toggleExpand}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onToggleVisibility={onToggleVisibility}
                >
                  {child.children && child.children.length > 0 && expandedItems[child.id] && (
                    <div className="mb-4">
                      {child.children.map(grandChild => (
                        <MenuItemComponent
                          key={grandChild.id}
                          item={grandChild}
                          isSubmenu={true}
                          deviceType={deviceType}
                          isExpanded={expandedItems[grandChild.id]}
                          onToggleExpand={toggleExpand}
                          onUpdate={onUpdate}
                          onDelete={onDelete}
                          onToggleVisibility={onToggleVisibility}
                        />
                      ))}
                    </div>
                  )}
                </MenuItemComponent>
              ))}
            </div>
          )}
        </MenuItemComponent>
      </div>
    );
  };

  return (
    <div className="bg-primary-dark/20 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-accent">
          Menu {
            deviceType === 'mobile' 
              ? 'Mobile' 
              : deviceType === 'tablet' 
                ? 'Tablette' 
                : deviceType === 'laptop' 
                  ? 'Portable' 
                  : 'Bureau'
          }
        </h3>
        
        <div className="text-white/60 text-sm">
          {deviceType === 'mobile' || deviceType === 'tablet' 
            ? 'Avec icônes' 
            : 'Sans icônes'
          }
        </div>
      </div>
      
      {/* Liste des éléments de menu */}
      <div className="space-y-2">
        {menuItems.length > 0 ? (
          menuItems.map(item => renderMenuItemWithSubmenu(item))
        ) : (
          <p className="text-white/60 text-center py-8">
            Aucun élément de menu n'est configuré pour cet appareil.
          </p>
        )}
      </div>
    </div>
  );
}
