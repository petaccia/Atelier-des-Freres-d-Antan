import { MdEdit, MdPublish, MdSave, MdDelete, MdRefresh } from 'react-icons/md';

export const menuActions = [
  {
    id: 'save-draft',
    label: 'Enregistrer brouillon',
    icon: <MdEdit size={18} />,
    actionType: 'saveDraft',
    className: 'bg-primary-dark hover:bg-primary-dark/80 text-white'
  },
  {
    id: 'publish',
    label: 'Publier',
    icon: <MdPublish size={18} />,
    actionType: 'publish',
    className: 'bg-accent hover:bg-accent/80 text-white'
  },
  {
    id: 'discard',
    label: 'Annuler les modifications',
    icon: <MdRefresh size={18} />,
    actionType: 'discardChanges',
    className: 'bg-gray-600 hover:bg-gray-700 text-white',
    showCondition: 'hasDraft'
  }
];
