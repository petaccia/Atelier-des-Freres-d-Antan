'use client';

export default function PreviewNote({ 
  title = 'Note :',
  text = 'Cette prévisualisation montre uniquement la structure du menu. L\'apparence exacte peut varier légèrement sur le site public.',
  className = 'mt-4 text-sm text-gray-500'
}) {
  return (
    <div className={className}>
      <p>
        <strong>{title}</strong> {text}
      </p>
    </div>
  );
}
