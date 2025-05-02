export default function ErrorState({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center p-6 bg-red-900/20 rounded-lg border border-red-500/20">
        <p className="text-red-500 font-semibold mb-4">Une erreur est survenue</p>
        <p className="text-white/60">{message || "Erreur de chargement des données"}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-md transition-colors"
        >
          Réessayer
        </button>
        <div className="mt-4 text-xs text-white/40">
          {/* Pour le débogage */}
          <p>Code erreur: {typeof message === "object" ? JSON.stringify(message) : message}</p>
        </div>
      </div>
    </div>
  );
}
