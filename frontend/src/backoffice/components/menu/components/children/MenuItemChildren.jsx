import MenuItem from '../../MenuItem';

const MenuItemChildren = ({ children, selectedDevice }) => {
  if (!children?.length) return null;

  return (
    <div className="mt-2">
      {children.map(child => (
        <MenuItem 
          key={child.id}
          item={child} 
          isSubmenu={true}
          selectedDevice={selectedDevice}
        />
      ))}
    </div>
  );
};

export default MenuItemChildren;

