import MenuDeviceDisplay from "./MenuDeviceDisplay";

const MenuSection = ({ selectedDevice, menuItems }) => {
  return (
    <div className="bg-primary-dark/30 p-4 rounded-lg">
      <h2 className="text-center text-xl p-4 text-white">Menu {selectedDevice}</h2>
      <MenuDeviceDisplay
        selectedDevice={selectedDevice}
        menuItems={menuItems}
      />
    </div>
  );
};

export default MenuSection;