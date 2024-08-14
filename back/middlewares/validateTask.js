import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": `"title" doit être un texte`,
    "string.empty": `"title" ne peut pas être vide`,
    "any.required": `"title" est requis`,
  }),
  description: Joi.string().allow('').messages({
    "string.base": `"description" doit être un texte`,
  }),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium")
    .messages({
      "any.only": `"priority" doit être l'une des valeurs suivantes: low, medium, high`,
    }),
  dueDate: Joi.date().required().messages({
    "date.base": `"dueDate" doit être une date valide`,
    "any.required": `"dueDate" est requis`,
  }),
  reminder: Joi.date().optional().messages({
    "date.base": `"reminder" doit être une date valide`,
  }),
  completed: Joi.boolean().default(false).messages({
    "boolean.base": `"completed" doit être un booléen`,
  }),
});

export const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const detailedErrors = error.details.map(err => err.message);
    return res.status(400).send({ errors: detailedErrors });
  }
  next();
};
