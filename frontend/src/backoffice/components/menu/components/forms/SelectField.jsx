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
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-white mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-3 py-2 bg-primary-light 
          border rounded-lg focus:outline-none focus:ring-2
          text-white 
          appearance-none
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-accent'}
        `}
      >
        <option value="" disabled>Sélectionnez une option</option>
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-primary-dark text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;