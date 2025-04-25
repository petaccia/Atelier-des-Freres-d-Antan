const ToggleInput = ({ 
  label, 
  id, 
  name, 
  checked, 
  onChange,
  className = "" 
}) => {
  return (
    <label className={`relative flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-primary/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-accent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
      <span className="ml-3 text-sm font-medium text-whiteGray">{label}</span>
    </label>
  );
};

export default ToggleInput;