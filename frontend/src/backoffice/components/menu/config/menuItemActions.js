import { MdEdit, MdVisibility, MdDelete } from 'react-icons/md';

export const menuItemActions = [
  {
    id: 'visibility',
    icon: MdVisibility,
    size: 18,
    title: 'Basculer la visibilité',
    actionType: 'toggleVisibility',
    className: 'p-2 rounded-md text-white/70 hover:bg-primary-dark/50 transition-colors'
  },
  {
    id: 'edit',
    icon: MdEdit,
    size: 18,
    title: 'Éditer',
    actionType: 'update',
    className: 'p-2 rounded-md text-white/70 hover:bg-accent/20 hover:text-accent transition-colors'
  },
  {
    id: 'delete',
    icon: MdDelete,
    size: 18,
    title: 'Supprimer',
    actionType: 'delete',
    className: 'p-2 rounded-md text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors'
  }
];
