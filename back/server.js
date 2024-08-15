import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";

import logger from './utils/logger.js';
import { globalErrorHandler } from './middlewares/errorHandler.js'; // Importez correctement
import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: "Trop de requêtes, veuillez réessayer plus tard."
});

app.use(limiter);
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());

// Routes
app.use("/api/v1", taskRouter);
app.use("/api/v1", userRouter);

// Gestion des erreurs globales
app.use(globalErrorHandler); // Assurez-vous que ceci est placé après toutes les routes

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Error connecting to MongoDB:", error));

app.listen(PORT, () => {
  logger.info(`Server running at: http://localhost:${PORT}`);
});
