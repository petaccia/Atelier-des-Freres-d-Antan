export default function ErrorState({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <p className="text-red-500 font-semibold mb-2">Une erreur est survenue</p>
        <p className="text-white/60">{message}</p>
      </div>
    </div>
  );
}