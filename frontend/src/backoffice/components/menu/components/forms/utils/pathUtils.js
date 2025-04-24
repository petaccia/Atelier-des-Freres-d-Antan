export const formatPath = (path) => {
  // Supprime les / au début et à la fin
  path = path.replace(/^\/+|\/+$/g, '');
  // Remplace les multiples / par un seul
  path = path.replace(/\/+/g, '/');
  return path;
};

export const addLeadingSlash = (path) => {
  const formattedPath = formatPath(path);
  return `/${formattedPath}`;
};