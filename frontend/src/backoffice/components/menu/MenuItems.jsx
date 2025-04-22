'use client';
import MenuItem from './components/items/MenuItem';

export default function MenuItems({ item, handleUpdate, handleDelete }) {
  return (
    <MenuItem
      item={item}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
