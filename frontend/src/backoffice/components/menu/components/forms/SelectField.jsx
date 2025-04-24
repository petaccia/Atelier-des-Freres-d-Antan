const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  error,
  required = false,
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
      
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-3
            bg-primary-dark/50 
            border-2 rounded-lg 
            focus:outline-none focus:ring-2
            text-white 
            appearance-none
            transition-all duration-200
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-accent-light/30 focus:border-accent-light focus:ring-accent-light/20 hover:border-accent-light/50'
            }
          `}
        >
          <option value="" disabled>Sélectionnez une option</option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-primary-dark text-white py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Icône de flèche personnalisée */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
