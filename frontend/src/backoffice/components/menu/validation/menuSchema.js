import Joi from "joi";

export const menuSchema = Joi.object({
  title: Joi.string().required().min(2).max(50).messages({
    "string.empty": "Titre est requis",
    "string.min": "Le titre doit avoir au moins {#limit} caractères",
    "string.max": "Le titre doit avoir au maximum {#limit} caractères",
  }),

  path: Joi.string()
    .required()
    .pattern(/^\/[a-zA-Z0-9\-_\/]*$/)
    .messages({
      "string.empty": "La route est requise",
      "string.pattern.base":
        "La route doit commencer par '/' et ne doit contenir que des lettres, chiffres, tirets, underscores et slashs",
    }),

  menuType: Joi.string().valid("BOTH", "DESKTOP", "MOBILE").required().messages({
    "any.only": "Le type de menu doit être 'BOTH', 'DESKTOP' ou 'MOBILE'",
  }),

  isActive: Joi.boolean().required().messages({
    "boolean.base": "La valeur doit être un booléen",
  }),

  showIcon: Joi.boolean().required().messages({
    "boolean.base": "Show Icon doit être un booléen",
  }),

  parentId: Joi.number().allow(null, "").messages({
    "number.base": "Le parent doit être un nombre",
  }),
});

export const validateMenu = (data) => {
  const { error } = menuSchema.validate(data, {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  });

  if (error) {
    return error.details.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.path[0]]: curr.message,
      }),
      {}
    );
  }

  return null;
};
