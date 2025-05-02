import { devices } from "./data/devicesData";

export default function DeviceSelector({ selectedDevice, onDeviceChange }) {
  return (
    <div className="flex space-x-6">
      {devices.map((device) => (
        <button
          key={device.id}
          onClick={() => onDeviceChange(device.id)}
          className={`
              flex 
              items-center  
              gap-2
              px-4 
              py-2 
              rounded-lg 
              transition-colors 
              duration-300 
              font-extralight
              ${
                selectedDevice === device.id
                  ? "bg-accent text-white"
                  : "bg-primary-dark/50 text-white/70 hover:bg-primary-dark/70"
              }`}
        >
          {device.icon}
          {device.label}
        </button>
      ))}
    </div>
  );
}
