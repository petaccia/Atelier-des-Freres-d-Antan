'use client';
import DeviceButton from '../ui/DeviceButton';

export default function DeviceSelector({ 
  title, 
  options, 
  selectedValue, 
  onValueChange,
  className = "bg-primary-dark/30 p-4 rounded-lg"
}) {
  return (
    <div className={className}>
      {title && <h3 className="text-lg font-medium text-white mb-3">{title}</h3>}
      
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <DeviceButton
            key={option.value}
            icon={option.icon}
            label={option.label}
            isSelected={selectedValue === option.value}
            onClick={() => onValueChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
