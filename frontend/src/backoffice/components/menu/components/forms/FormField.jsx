'use client';

export default function FormField({ 
  id, 
  name, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  min,
  className = '',
  placeholder = '',
  required = false
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-white/80 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white ${
          error ? 'border-red-500' : 'border-accent/30'
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
