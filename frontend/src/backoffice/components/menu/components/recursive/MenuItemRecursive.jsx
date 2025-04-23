import MenuItem from '../../MenuItem';

const MenuItemRecursive = ({ item, isSubmenu = false, selectedDevice }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div key={item.id} className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''} mb-4`}>
      <MenuItem item={item} isSubmenu={isSubmenu} selectedDevice={selectedDevice} />

      {hasChildren && (
        <div className="mt-2">
          {item.children.map(child => (
            <MenuItemRecursive 
              key={child.id} 
              item={child} 
              isSubmenu={true} 
              selectedDevice={selectedDevice} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemRecursive;