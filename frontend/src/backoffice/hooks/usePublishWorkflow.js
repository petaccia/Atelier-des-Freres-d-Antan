import { useState } from 'react';

export default function usePublishWorkflow({
  onUpdate,
  onDelete,
  onSaveDraft,
  onPublish,
  onDiscardChanges
}) {
  const [mode, setMode] = useState('edit'); // 'edit' ou 'preview'
  const [hasChanges, setHasChanges] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop'); // 'mobile', 'tablet', 'laptop', 'desktop'

  const handleUpdate = async (id) => {
    await onUpdate(id);
    setHasChanges(true);
  };

  const handleDelete = async (id) => {
    await onDelete(id);
    setHasChanges(true);
  };

  const handleSaveDraft = async () => {
    await onSaveDraft();
    setHasChanges(false);
  };

  const handlePublish = async () => {
    await onPublish();
    setHasChanges(false);
    setMode('edit');
  };

  const handleDiscardChanges = async () => {
    await onDiscardChanges();
    setHasChanges(false);
    setMode('edit');
  };

  const togglePreview = () => {
    if (mode === 'edit') {
      // Sauvegarder automatiquement comme brouillon avant de prévisualiser
      if (hasChanges) {
        handleSaveDraft();
      }
      setMode('preview');
    } else {
      setMode('edit');
    }
  };

  const setDeviceAndPreview = (device) => {
    setDeviceType(device);
    if (mode === 'edit') {
      togglePreview();
    }
  };

  return {
    mode,
    hasChanges,
    deviceType,
    handleUpdate,
    handleDelete,
    handleSaveDraft,
    handlePublish,
    handleDiscardChanges,
    togglePreview,
    setDeviceAndPreview
  };
}
