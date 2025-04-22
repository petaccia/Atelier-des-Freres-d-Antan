export default function MenuItems( { item, handleUpdate, handleDelete } ) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <li
        key={item.id}
        className="flex flex-col p-4 bg-primary-dark/30 rounded-lg"
      >
        <div className="flex items-center justify-between">
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
        </div>

        {/* Affichage des sous-menus */}
        {hasChildren && (
          <div className="mt-3 pl-4 border-l-2 border-accent/30">
            <h4 className="text-sm font-medium text-white/70 mb-2">Sous-menus :</h4>
            <ul className="space-y-2">
              {item.children.map((child) => (
                <li
                  key={child.id}
                  className="flex items-center justify-between p-3 bg-primary-dark/50 rounded-lg"
                >
                  <div>
                    <h5 className="text-md font-medium text-accent/80">{child.title}</h5>
                    <p className="text-white/50 text-xs">Path: {child.path || '/'}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-white/70 hover:text-accent text-sm transition-colors"
                      onClick={() => handleUpdate(child.id)}
                    >
                      Éditer
                    </button>
                    <button
                      className="text-white/70 hover:text-red-500 text-sm transition-colors"
                      onClick={() => handleDelete(child.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </>
  )
}
