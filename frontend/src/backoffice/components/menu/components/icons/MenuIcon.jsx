import { getIconByTitle } from "./getIconByTitle";

export default function MenuIcon({ title, showIcon }) {
  if (!showIcon) return null;

  return <div className="mr-3 text-accent">{getIconByTitle(title)}</div>;
}
