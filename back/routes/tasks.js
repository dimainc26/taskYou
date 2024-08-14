import express from "express";
import Task from "../models/Task.js";
import { validateTask } from "../middlewares/validateTask.js";

const taskRouter = express.Router();

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.post("/tasks", validateTask, async (req, res) => {
  try {
    const tasks = req.body;

    if (Array.isArray(tasks)) {
      console.log("status: true")
      const insertedTasks = await Task.insertMany(tasks);
      res.status(201).send(insertedTasks);
    } else {
      const task = new Task(tasks);
      await task.save();
      res.status(201).send(task);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default taskRouter;
