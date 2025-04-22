'use client';
import MenuList from '../../MenuList';
import SiteMenuPreview from '../../SiteMenuPreview';

export default function WorkflowContent({ 
  mode,
  menuItems,
  deviceType,
  onUpdate,
  onDelete,
  onPublish,
  onCancel
}) {
  return (
    <>
      {mode === 'edit' ? (
        <MenuList
          items={menuItems}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ) : (
        <SiteMenuPreview
          menuItems={menuItems}
          onConfirm={onPublish}
          onCancel={onCancel}
          initialDeviceType={deviceType}
        />
      )}
    </>
  );
}
