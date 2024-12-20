import express from "express";
import UsersController from "./../controller/users.controller";

const userRouter = express.Router();
const { index, create, destroy } = UsersController()

userRouter.get("/users", index);
userRouter.post("/users", create);
userRouter.delete("/users/:id", destroy);

export default userRouter;
