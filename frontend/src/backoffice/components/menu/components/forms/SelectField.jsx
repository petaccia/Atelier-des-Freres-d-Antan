'use client';

export default function SelectField({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  options = [],
  className = '',
  required = false
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-white/80 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
