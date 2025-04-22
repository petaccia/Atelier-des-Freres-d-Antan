'use client';
import DeviceSelector from './DeviceSelector';
import ChangeStatus from './ChangeStatus';
import WorkflowActions from './WorkflowActions';

export default function ActionBar({ 
  mode,
  hasChanges,
  isLoading,
  onSelectDevice,
  onTogglePreview,
  onPublish,
  onDiscardChanges,
  className = 'flex justify-between items-center bg-primary-dark/30 p-4 rounded-lg'
}) {
  return (
    <div className={className}>
      <div className="flex items-center">
        {/* Boutons de sélection d'appareil - visibles uniquement en mode édition */}
        {mode === 'edit' && (
          <DeviceSelector onSelectDevice={onSelectDevice} />
        )}

        <ChangeStatus hasChanges={hasChanges} />
      </div>

      <WorkflowActions 
        mode={mode}
        hasChanges={hasChanges}
        isLoading={isLoading}
        onTogglePreview={onTogglePreview}
        onPublish={onPublish}
        onDiscardChanges={onDiscardChanges}
      />
    </div>
  );
}
