import Link from 'next/link';

export default function MenuHeader( { onCreateItem } ) {
  return (
    <>
    <div className="flex items-center gap-2 text-white/60 mb-4">
    <Link href="/backoffice/site" className="hover:text-accent">
      Site Internet
    </Link>
    <span>/</span>
    <span className="text-accent">Menu</span>
  </div>

  <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold text-whiteAmber">Gestion du Menu</h1>
    <button
      className="bg-accent hover:bg-accent-light text-primary px-4 py-2 rounded-lg transition-colors"
      onClick={onCreateItem}
    >
      Ajouter un item
    </button>
  </div>
  </>
  );
}