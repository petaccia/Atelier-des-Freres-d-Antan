'use client';
import MenuItemInfo from '../content/MenuItemInfo';
import MenuListActions from '../actions/MenuListActions';
import SubMenuList from './SubMenuList';

export default function MenuItem({ 
  item, 
  onUpdate, 
  onDelete,
  className = 'flex flex-col p-4 bg-primary-dark/30 rounded-lg'
}) {
  return (
    <li key={item.id} className={className}>
      <div className="flex items-center justify-between">
        <MenuItemInfo 
          title={item.title} 
          path={item.path} 
        />
        
        <MenuListActions 
          itemId={item.id} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
        />
      </div>

      {/* Affichage des sous-menus */}
      <SubMenuList 
        children={item.children} 
        onUpdate={onUpdate} 
        onDelete={onDelete} 
      />
    </li>
  );
}
