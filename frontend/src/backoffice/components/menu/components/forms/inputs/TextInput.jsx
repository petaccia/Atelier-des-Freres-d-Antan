const TextInput = ({ 
  label, 
  id, 
  name, 
  value, 
  onChange, 
  required = false,
  className = "" 
}) => {
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
        className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-lg text-whiteGray focus:outline-none focus:border-accent-light"
      />
    </div>
  );
};

export default TextInput;