'use client';

export default function DesktopSubmenu({ 
  children, 
  isVisible,
  className = 'absolute left-0 mt-2 w-60 bg-white text-gray-800 shadow-md p-4 space-y-2 rounded-lg z-10'
}) {
  if (!isVisible || !children || children.length === 0) return null;
  
  return (
    <div className={className}>
      {children.map((child) => (
        <div
          key={child.id}
          className="px-2 py-1 hover:bg-accent/20 hover:text-accent rounded-md transition-colors cursor-pointer"
        >
          {child.title}
        </div>
      ))}
    </div>
  );
}
