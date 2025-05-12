import { devices } from "./data/devicesData";
import Button from "@/backoffice/ui/buttons/button";

export default function DeviceSelector({ selectedDevice, onDeviceChange }) {
  return (
    <div className="flex space-x-6">
      {devices.map((device) => (
        <Button
          key={device.id}
          isActive={selectedDevice === device.id}
          onClick={() => onDeviceChange(device.id)}
        >
          {device.icon}
          {device.label}
        </Button>
      ))}
    </div>
  );
}
