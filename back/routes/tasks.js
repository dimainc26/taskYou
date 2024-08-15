import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";
import { validateTask } from "../middlewares/validateTask.js";
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

    if (Array.isArray(tasks)) {
      const insertedTasks = await Task.insertMany(tasks);
      logger.info(`${insertedTasks.length} tâches insérées`);
      res.status(201).send(insertedTasks);
    } else {
      const task = new Task(tasks);
      await task.save();
      logger.info(`Nouvelle tâche créée : ${task.title}`);
      res.status(201).send(task);
    }
  } catch (error) {
    logger.error(`Erreur lors de la création des tâches : ${error.message}`);
    next(new AppError("Erreur lors de la création des tâches", 400));
  }
});

export default taskRouter;
