'use client';
import { MdKeyboardArrowDown } from 'react-icons/md';
import SubMenuPreviewList from './SubMenuPreviewList';

export default function MenuPreviewItem({ 
  item, 
  isActive, 
  rotated,
  onMouseEnter, 
  onMouseLeave,
  className = 'relative'
}) {
  const hasChildren = item.children && item.children.length > 0;
  
  return (
    <div 
      className={className}
      onMouseEnter={() => onMouseEnter(item.id)}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center cursor-pointer hover:text-accent-light transition-colors">
        <span>{item.title}</span>
        {hasChildren && (
          <MdKeyboardArrowDown
            className={`ml-1 transition-transform duration-300 ${
              rotated ? 'rotate-180' : ''
            }`}
          />
        )}
      </div>

      {/* Sous-menu */}
      {isActive && hasChildren && (
        <SubMenuPreviewList children={item.children} />
      )}
    </div>
  );
}
