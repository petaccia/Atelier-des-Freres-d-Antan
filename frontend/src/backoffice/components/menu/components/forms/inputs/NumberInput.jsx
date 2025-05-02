"use client";

const NumberInput = ({
  label,
  id,
  name,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  required = false,
  disabled = false,
  className = "",
  placeholder = "",
  helpText = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-whiteGray mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-primary-dark/50 border border-accent/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent text-whiteGray ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      {helpText && <p className="mt-1 text-xs text-whiteGray/70">{helpText}</p>}
    </div>
  );
};

export default NumberInput;
