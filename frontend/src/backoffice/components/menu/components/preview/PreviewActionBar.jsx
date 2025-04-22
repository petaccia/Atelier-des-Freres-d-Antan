'use client';
import DeviceTypeSelector from './DeviceTypeSelector';

export default function PreviewActionBar({ 
  deviceType, 
  onDeviceChange, 
  deviceLabels,
  onConfirm, 
  onCancel,
  className = 'bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200'
}) {
  return (
    <div className={className}>
      {/* Contrôles de taille d'écran */}
      <DeviceTypeSelector 
        deviceType={deviceType} 
        onDeviceChange={onDeviceChange} 
      />

      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Prévisualisation <span className="text-accent text-base">
            ({deviceLabels[deviceType] || 'Bureau'})
          </span>
        </h2>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
        >
          <span className="mr-1">✕</span>
          Retour à l'édition
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
        >
          <span className="mr-1">✓</span>
          Confirmer et publier
        </button>
      </div>
    </div>
  );
}
