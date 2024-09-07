import Joi from "joi";
import logger from "../utils/logger.js";

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
  startDate: Joi.date().required().messages({
    "date.base": `"startDate" doit être une date valide`,
    "any.required": `"startDate" est requis`,
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

const taskArraySchema = Joi.array().items(taskSchema).messages({
  "array.base": `"body" doit être un tableau d'objets de tâches`,
  "array.includesRequiredUnknowns": `"body" doit contenir des objets de tâches valides`,
});

export const validateTask = (req, res, next) => {
  const isArray = Array.isArray(req.body);
  const schema = isArray ? taskArraySchema : taskSchema;
  
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const detailedErrors = error.details.map(err => err.message);
    logger.warn(`Validation échouée pour les données de tâche : ${detailedErrors.join(", ")}`);
    return res.status(400).send({ errors: detailedErrors });
  }
  next();
};
