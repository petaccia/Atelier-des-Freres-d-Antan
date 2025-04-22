'use client';
import SubMenuPreviewItem from './SubMenuPreviewItem';

export default function SubMenuPreviewList({ 
  children,
  className = 'absolute left-0 mt-2 w-48 bg-primary-dark rounded-lg shadow-lg z-10 py-2'
}) {
  if (!children || children.length === 0) return null;
  
  return (
    <div className={className}>
      {children.map(child => (
        <SubMenuPreviewItem key={child.id} item={child} />
      ))}
    </div>
  );
}
