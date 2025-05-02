import { iconLibraries } from "../icons/iconLibraries";

export const renderIcon = (iconName, props = {}) => {
  if (!iconName) return null;

  // Détermine la bibliothèque en fonction du préfixe
  const library = Object.values(iconLibraries).find((lib) => iconName.startsWith(lib.prefix));

  if (!library) return null;

  const Icon = library.icons[iconName];
  return Icon ? <Icon {...props} /> : null;
};
