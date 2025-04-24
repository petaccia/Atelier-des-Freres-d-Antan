'use client';

// Composants
import ModalContainer from '../menu/components/forms/ModalContainer';
import GenericForm from './GenericForm';

export default function ModalForm({
  isOpen,
  onClose,
  title,
  formProps
}) {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <GenericForm
        {...formProps}
        onCancel={onClose}
      />
    </ModalContainer>
  );
}
