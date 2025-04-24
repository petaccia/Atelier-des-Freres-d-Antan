import MenuItem from "../../MenuItem";

const MenuItemRecursive = ({ item, isSubmenu = false, selectedDevice }) => {

  console.log('MenuItemRecursive item:', item); // Ajout du console.log

  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
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
    </>
  );
};

export default MenuItemRecursive;
