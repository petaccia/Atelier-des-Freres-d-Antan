'use client';
import MenuItemInfo from '../content/MenuItemInfo';
import MenuListActions from '../actions/MenuListActions';

export default function SubMenuItem({ 
  item, 
  onUpdate, 
  onDelete,
  className = 'flex items-center justify-between p-3 bg-primary-dark/50 rounded-lg'
}) {
  return (
    <li key={item.id} className={className}>
      <MenuItemInfo 
        title={item.title} 
        path={item.path} 
        size="small" 
      />
      
      <MenuListActions 
        itemId={item.id} 
        onUpdate={onUpdate} 
        onDelete={onDelete} 
        size="small" 
      />
    </li>
  );
}
