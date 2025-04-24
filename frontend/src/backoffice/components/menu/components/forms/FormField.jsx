const FormField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  min,
  placeholder,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-whiteAmber mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        required={required}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 
          bg-primary-dark/50 
          border-2 rounded-lg 
          focus:outline-none focus:ring-2
          text-white placeholder-gray-400
          transition-all duration-200
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-accent-light/30 focus:border-accent-light focus:ring-accent-light/20 hover:border-accent-light/50'
          }
        `}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
