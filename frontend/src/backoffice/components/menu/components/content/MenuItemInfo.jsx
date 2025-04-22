'use client';

export default function MenuItemInfo({ 
  title, 
  path, 
  size = 'normal',
  className = ''
}) {
  // Déterminer les classes en fonction de la taille
  const titleClasses = size === 'small' 
    ? 'text-md font-medium text-accent/80'
    : 'text-lg font-semibold text-accent';
  
  const pathClasses = size === 'small'
    ? 'text-white/50 text-xs'
    : 'text-white/60 text-sm';

  return (
    <div className={className}>
      <h3 className={titleClasses}>{title}</h3>
      <p className={pathClasses}>Path: {path || '/'}</p>
    </div>
  );
}
