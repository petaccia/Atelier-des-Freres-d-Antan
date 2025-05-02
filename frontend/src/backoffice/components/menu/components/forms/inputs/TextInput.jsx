const TextInput = ({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  readOnly = false,
  helpText,
  className = ""
}) => {
  // Déterminer la classe CSS en fonction de l'état du champ
  const inputClassName = `w-full px-3 py-2 border rounded-lg focus:outline-none ${
    disabled
      ? 'bg-primary-dark/50 border-gray-700/50 text-gray-400 cursor-not-allowed'
      : readOnly
        ? 'bg-primary border-accent/20 text-whiteGray cursor-not-allowed'
        : 'bg-primary border-accent/20 text-whiteGray focus:border-accent-light'
  }`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-whiteGray mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClassName}
      />
      {helpText && (
        <p className={`mt-1 text-xs ${readOnly ? 'text-amber-400 font-medium' : 'text-gray-400'}`}>
          {helpText}
        </p>
      )}
    </div>
  );
};

export default TextInput;