import express from "express";

const userRouter = express.Router();

userRouter.get("/users", (req, res) => {
    res.json({"dima": "The dream is real"});
})

export default userRouter;