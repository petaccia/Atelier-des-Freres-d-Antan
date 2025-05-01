import MenuItem from "../../MenuItem";

const MenuItemRecursive = ({ item, isSubmenu = false, selectedDevice, onMenuUpdated, menuItems }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <MenuItem
        item={item}
        isSubmenu={isSubmenu}
        selectedDevice={selectedDevice}
        onMenuUpdated={onMenuUpdated}
        menuItems={menuItems}
      />

      {hasChildren && (
        <div className="mt-2">
          {item.children.map(child => (
            <MenuItemRecursive
              key={child.id}
              item={child}
              isSubmenu={true}
              selectedDevice={selectedDevice}
              onMenuUpdated={onMenuUpdated}
              menuItems={menuItems}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MenuItemRecursive;
