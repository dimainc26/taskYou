import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";

import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre de 15 minutes
  message: "Trop de requêtes, veuillez réessayer plus tard."
});

app.use(limiter);
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Welcome Billionaire" });
});

app.use("/api/v1", taskRouter);
app.use("/api/v1", userRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.listen(PORT, () => {
  console.log("Server running at : localhost:" + PORT);
});
