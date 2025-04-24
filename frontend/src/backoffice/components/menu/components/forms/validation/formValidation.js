export const validateForm = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Le titre est requis';
  }

  if (!values.path) {
    errors.path = 'Le chemin est requis';
  } else if (values.path.includes('/')) {
    errors.path = "N'utilisez pas de / dans le chemin";
  }

  return errors;
};