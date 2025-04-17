export default function MenuItems( { item, handleUpdate, handleDelete } ) {
  return (
    <>
      <li
        key={item.id}
        className="flex items-center justify-between p-4 bg-primary-dark/30 rounded-lg"
      >
        <div>
          <h3 className="text-lg font-semibold text-accent">{item.title}</h3>
          <p className="text-white/60 text-sm">Path: {item.path}</p>
        </div>
        <div className="flex space-x-2">
          <button
            className="text-white/80 hover:text-accent transition-colors"
            onClick={() => handleUpdate(item.id)}
          >
            Éditer
          </button>
          <button
            className="text-white/80 hover:text-red-500 transition-colors"
            onClick={() => handleDelete(item.id)}
          >
            Supprimer
          </button>
        </div>
      </li>
    </>
  )
}
