import Link from "next/link";

export default function ManagementCard({ title, description, href, linkText = "Gérer" }) {
  return (
    <div className="bg-primary-dark/50 rounded-xl p-6 border border-accent/10">
      <h2 className="text-xl font-semibold text-accent mb-4">{title}</h2>
      <p className="text-white/80 mb-4">
        {description}
      </p>
      <Link
        href={href}
        className="text-accent hover:text-accent-light transition-colors"
      >
        {linkText} →
      </Link>
    </div>
  );
}