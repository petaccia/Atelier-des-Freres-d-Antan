export default function MenuItemContent({ title, path }) {
  return (
    <div className="flex-grow">
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-white/60">{path || "#"}</p>
    </div>
  );
}
