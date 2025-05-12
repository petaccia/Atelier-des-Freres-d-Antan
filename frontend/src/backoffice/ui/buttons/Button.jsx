/**
 * Composant Button réutilisable avec le style du DeviceSelector
 * @param {Object} props - Propriétés du composant
 * @param {boolean} [props.isActive] - Si le bouton est actif ou non
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @returns {JSX.Element} - Composant bouton
 */
const Button = ({
  isActive = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-lg
        transition-colors
        duration-300
        font-extralight
        ${
          isActive
            ? "bg-accent text-white"
            : "bg-primary-dark/50 text-white/70 hover:bg-primary-dark/70"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
