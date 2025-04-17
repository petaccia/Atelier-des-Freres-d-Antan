export default function MenuList({ items, onUpdate, onDelete }) {
  return (
    <>
      {!items || items.length === 0 ? (
        <p className="text-white/80">Aucun élément dans le menu</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <MenuItems
              key={item.id}
              item={item}
              handleUpdate={onUpdate}
              handleDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </>
  )
}