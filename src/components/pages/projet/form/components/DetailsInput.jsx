export default function DetailsInput({ value, onChange, isSubmitting }) {
  return (
    <div className="flex flex-col gap-4">
    <h3 className="text-xl font-semibold text-whiteAmber">Détails supplémentaires</h3>
    <textarea
      value={value}
      onChange={onChange}
      disabled={isSubmitting}
      placeholder="Décrivez vos besoins spécifiques..."
      className="w-full h-32 p-4 rounded-lg bg-transparent border-2 border-whiteAmber text-whiteAmber placeholder-whiteAmber/50 focus:outline-none focus:ring-2 focus:ring-accent"
    />
  </div>
  )
}