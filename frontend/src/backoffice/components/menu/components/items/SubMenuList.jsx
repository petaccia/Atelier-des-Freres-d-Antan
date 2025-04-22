'use client';
import SubMenuItem from './SubMenuItem';

export default function SubMenuList({ 
  children, 
  onUpdate, 
  onDelete,
  className = 'mt-3 pl-4 border-l-2 border-accent/30'
}) {
  const hasChildren = children && children.length > 0;
  
  if (!hasChildren) return null;
  
  return (
    <div className={className}>
      <h4 className="text-sm font-medium text-white/70 mb-2">Sous-menus :</h4>
      <ul className="space-y-2">
        {children.map(child => (
          <SubMenuItem 
            key={child.id} 
            item={child} 
            onUpdate={onUpdate} 
            onDelete={onDelete} 
          />
        ))}
      </ul>
    </div>
  );
}
