import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
