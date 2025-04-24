import MenuItemRecursive from './components/recursive/MenuItemRecursive';

const MenuDeviceDisplay = ({ selectedDevice, menuItems }) => {

  return (
    <div className="space-y-4">
      {menuItems && menuItems.length > 0 ? (
        menuItems.map(item => (
          <MenuItemRecursive 
            key={item.id} 
            item={item} 
            selectedDevice={selectedDevice}
          />
        ))
      ) : (
        <p className="text-white/60 p-4">Aucun élément de menu trouvé.</p>
      )}
    </div>
  );
};

export default MenuDeviceDisplay;