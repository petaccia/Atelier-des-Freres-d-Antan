'use client';

// Hooks
import usePublishWorkflow from '@/backoffice/hooks/usePublishWorkflow';

// Composants
import ActionBar from './components/workflow/ActionBar';
import WorkflowContent from './components/workflow/WorkflowContent';

export default function MenuPublishWorkflow({
  menuItems,
  draftItems,
  isLoading,
  onUpdate,
  onDelete,
  onPublish,
  onSaveDraft,
  onDiscardChanges
}) {
  // Utiliser le hook personnalisé pour gérer la logique du workflow
  const {
    mode,
    hasChanges,
    deviceType,
    handleUpdate,
    handleDelete,
    handlePublish,
    handleDiscardChanges,
    togglePreview,
    setDeviceAndPreview
  } = usePublishWorkflow({
    onUpdate,
    onDelete,
    onSaveDraft,
    onPublish,
    onDiscardChanges
  });

  // Utiliser les brouillons s'ils existent et ne sont pas vides, sinon utiliser les éléments publiés
  const itemsToDisplay = draftItems && draftItems.length > 0 ? draftItems : menuItems;

  return (
    <div className="space-y-6">
      {/* Barre d'actions */}
      <ActionBar
        mode={mode}
        hasChanges={hasChanges}
        isLoading={isLoading}
        onSelectDevice={setDeviceAndPreview}
        onTogglePreview={togglePreview}
        onPublish={handlePublish}
        onDiscardChanges={handleDiscardChanges}
      />

      {/* Contenu principal */}
      <WorkflowContent
        mode={mode}
        menuItems={itemsToDisplay}
        deviceType={deviceType}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onPublish={handlePublish}
        onCancel={() => togglePreview()}
      />
    </div>
  );
}
