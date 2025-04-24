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
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-white mb-2"
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
          w-full px-3 py-2 bg-primary-light 
          border rounded-lg focus:outline-none focus:ring-2
          text-white placeholder-gray-400
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-accent'}
        `}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;