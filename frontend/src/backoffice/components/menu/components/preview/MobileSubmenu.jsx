'use client';

export default function MobileSubmenu({ 
  children,
  className = 'pl-4 mt-1 space-y-1 border-l border-accent/30'
}) {
  if (!children || children.length === 0) return null;
  
  return (
    <div className={className}>
      {children.map((child) => (
        <div
          key={child.id}
          className="p-2 hover:bg-primary-dark/70 rounded cursor-pointer"
        >
          {child.title}
        </div>
      ))}
    </div>
  );
}
