'use client';

export default function PreviewHeader({ 
  title = 'Prévisualisation du menu',
  actions,
  className = 'flex justify-between items-center mb-4'
}) {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {actions}
    </div>
  );
}
