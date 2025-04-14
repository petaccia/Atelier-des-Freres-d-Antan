export default function ProcessTimeline({ children }) {
  return (
    <div className="relative max-w-4xl mx-auto px-4 md:px-8">
      {/* Ligne de connexion verticale */}
      <div className="absolute left-8 sm:left-12 md:left-16 top-10 bottom-10 w-0.5 bg-accent-light/20 transform -translate-x-1/2" />

      {children}
    </div>
  );
}
