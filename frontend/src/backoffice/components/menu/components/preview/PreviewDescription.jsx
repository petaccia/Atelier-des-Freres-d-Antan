'use client';

export default function PreviewDescription({ 
  text = 'Voici un aperçu de votre menu. Vérifiez que tout est correct avant de confirmer les changements.',
  className = 'text-sm text-gray-500 mb-4'
}) {
  return (
    <p className={className}>
      {text}
    </p>
  );
}
