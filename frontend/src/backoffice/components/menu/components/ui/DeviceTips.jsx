'use client';
import { deviceOptions } from '../../config/deviceOptions';

export default function DeviceTips({ 
  deviceType,
  className = "bg-primary-dark/20 p-4 rounded-lg"
}) {
  // Trouver l'appareil sélectionné dans la configuration
  const selectedDevice = deviceOptions.find(option => option.value === deviceType);
  
  // Si l'appareil n'est pas trouvé ou n'a pas de conseils, ne rien afficher
  if (!selectedDevice || !selectedDevice.tips || selectedDevice.tips.length === 0) {
    return null;
  }
  
  return (
    <div className={className}>
      <h3 className="text-accent font-medium mb-2">Conseils pour le menu {selectedDevice.label}</h3>
      <ul className="text-white/70 text-sm space-y-2 list-disc pl-5">
        {selectedDevice.tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
