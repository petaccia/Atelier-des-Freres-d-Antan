import MenuItems from './MenuItems';

export default function MenuList({ items, onUpdate, onDelete }) {
  console.log('MenuList items reçus:', items);

  if (!items || items.length === 0) {
    return <p className="text-white/80">Aucun élément dans le menu</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <MenuItems
          key={item.id}
          item={{
            id: item.id,
            title: item.title,
            path: item.path || '/',
            order: item.order || 0,
            children: item.children || []
          }}
          handleUpdate={onUpdate}
          handleDelete={onDelete}
        />
      ))}
    </ul>
  );
}
