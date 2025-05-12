'use client';

import { useRouter } from 'next/navigation';
import Button from './button';
import { IoEyeSharp } from 'react-icons/io5';

/**
 * Bouton de prévisualisation du menu
 * @param {Object} props - Propriétés du composant
 * @param {string} props.href - URL de la page de prévisualisation
 * @param {boolean} [props.isActive] - Si le bouton est actif ou non
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {React.ReactNode} [props.children] - Contenu du bouton
 * @returns {JSX.Element} - Composant bouton de prévisualisation
 */
export default function PreviewButton({
  href,
  isActive = false,
  className = 'hover:!bg-green-600/70',
  children = 'Prévisualiser',
  ...props
}) {
  const router = useRouter();

  const handlePreview = () => {
    router.push(href);
  };

  return (
    <Button
      isActive={isActive}
      onClick={handlePreview}
      className={className}
      {...props}
    >
      <IoEyeSharp className="h-4 w-4" />
      {children}
    </Button>
  );
}
