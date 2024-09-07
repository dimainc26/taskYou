import Joi from "joi";
import logger from "../utils/logger.js";

const updateTaskSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required().messages({
      "string.base": `"id" doit être un texte`,
      "string.empty": `"id" ne peut pas être vide`,
      "any.required": `"id" est requis`,
    }),
    updates: Joi.object({
      title: Joi.string().messages({
        "string.base": `"title" doit être un texte`,
      }),
      description: Joi.string().allow("").messages({
        "string.base": `"description" doit être un texte`,
      }),
      priority: Joi.string().valid("low", "medium", "high").messages({
        "any.only": `"priority" doit être l'une des valeurs suivantes: low, medium, high`,
      }),
      dueDate: Joi.date().messages({
        "date.base": `"dueDate" doit être une date valide`,
      }),
      startDate: Joi.date().messages({
        "date.base": `"startDate" doit être une date valide`,
      }),
      reminder: Joi.date().optional().messages({
        "date.base": `"reminder" doit être une date valide`,
      }),
      completed: Joi.boolean().messages({
        "boolean.base": `"completed" doit être un booléen`,
      }),
    })
      .min(1)
      .required()
      .messages({
        "object.base": `"updates" doit être un objet`,
        "object.min": `"updates" doit contenir au moins un champ à mettre à jour`,
        "any.required": `"updates" est requis`,
      }),
  })
);

export const validateUpdateTask = (req, res, next) => {
  const { error } = updateTaskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const detailedErrors = error.details.map((err) => err.message);
    logger.warn(
      `Validation échouée pour les mises à jour des tâches : ${detailedErrors.join(
        ", "
      )}`
    );
    return res.status(400).send({ errors: detailedErrors });
  }
  next();
};
