import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";
import {  validateTask } from "../middlewares/validateTask.js";
import { validateUpdateTask } from "../middlewares/updateValidateTask.js";
import AppError from "../errors/AppError.js";
import logger from "../utils/logger.js";

const taskRouter = express.Router();

taskRouter.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    logger.error(`Erreur lors de la récupération des tâches : ${error.message}`);
    next(new AppError("Erreur lors de la récupération des tâches", 500));
  }
});

taskRouter.get("/tasks/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("ID invalide", 400));
    }

    const task = await Task.findById(id);

    if (!task) {
      logger.warn(`Tâche non trouvée avec l'ID : ${id}`);
      return next(new AppError(`Aucune tâche trouvée avec l'ID : ${id}`, 404));
    }

    res.status(200).send(task);
  } catch (error) {
    logger.error(`Erreur lors de la récupération de la tâche avec l'ID : ${id} - ${error.message}`);
    next(new AppError("Erreur lors de la récupération de la tâche", 500));
  }
});

taskRouter.post("/tasks", validateTask, async (req, res, next) => {
  try {
    const tasks = req.body;

    // Vérifiez que le corps de la requête est un tableau
    if (!Array.isArray(tasks)) {
      return next(new AppError("Le corps de la requête doit être un tableau d'objets de tâches", 400));
    }

    // Insérer les tâches en une seule opération
    const insertedTasks = await Task.insertMany(tasks);
    logger.info(`${insertedTasks.length} tâches insérées`);
    res.status(201).send(insertedTasks);
  } catch (error) {
    logger.error(`Erreur lors de la création des tâches : ${error.message}`);
    next(new AppError("Erreur lors de la création des tâches", 400));
  }
});



taskRouter.put("/tasks", validateUpdateTask, async (req, res, next) => {
  try {
    const updates = req.body;

    // Vérifiez que le corps de la requête est un tableau d'objets avec des IDs valides et des données de mise à jour
    if (!Array.isArray(updates) || updates.some(update => !update.id || typeof update.updates !== 'object')) {
      return next(new AppError("Requête invalide, chaque élément doit contenir un ID et des données de mise à jour", 400));
    }

    // Mise à jour des tâches en utilisant Promise.all pour exécuter les mises à jour en parallèle
    const updatePromises = updates.map(({ id, updates }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject(new AppError(`ID invalide: ${id}`, 400));
      }
      return Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    });

    const updatedTasks = await Promise.all(updatePromises);
    res.status(200).json(updatedTasks);

  } catch (error) {
    logger.error(`Erreur lors de la mise à jour des tâches : ${error.message}`);
    next(new AppError("Erreur lors de la mise à jour des tâches", 500));
  }
});

taskRouter.delete("/tasks", async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return next(new AppError("IDs invalides", 400));
    }

    const result = await Task.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return next(new AppError("Aucune tâche trouvée avec les IDs fournis", 404));
    }

    logger.info(`Tâches supprimées avec succès, IDs : ${ids.join(", ")}`);
    res.status(200).json({ message: "Tâches supprimées avec succès" });
  } catch (error) {
    logger.error(`Erreur lors de la suppression des tâches - ${error.message}`);
    next(new AppError("Erreur lors de la suppression des tâches", 500));
  }
});

export default taskRouter;
