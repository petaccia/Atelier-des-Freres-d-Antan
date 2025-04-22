'use client';

export default function MenuListActions({ 
  itemId, 
  onUpdate, 
  onDelete, 
  size = 'normal',
  className = 'flex space-x-2'
}) {
  // Déterminer les classes en fonction de la taille
  const buttonClasses = size === 'small' 
    ? 'text-white/70 hover:text-accent text-sm transition-colors'
    : 'text-white/80 hover:text-accent transition-colors';
  
  const deleteButtonClasses = size === 'small'
    ? 'text-white/70 hover:text-red-500 text-sm transition-colors'
    : 'text-white/80 hover:text-red-500 transition-colors';

  return (
    <div className={className}>
      <button
        className={buttonClasses}
        onClick={() => onUpdate(itemId)}
      >
        Éditer
      </button>
      <button
        className={deleteButtonClasses}
        onClick={() => onDelete(itemId)}
      >
        Supprimer
      </button>
    </div>
  );
}
