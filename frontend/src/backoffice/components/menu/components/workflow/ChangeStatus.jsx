'use client';

export default function ChangeStatus({ 
  hasChanges,
  className = 'text-white/80'
}) {
  if (!hasChanges) return null;
  
  return (
    <div className={className}>
      <span className="text-amber-400 text-sm">
        * Vous avez des modifications non publiées
      </span>
    </div>
  );
}
