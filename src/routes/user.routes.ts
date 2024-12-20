import express from "express";
import UsersController from "./../controller/users.controller";

const userRouter = express.Router();
const { index, show, create, destroy } = UsersController()

userRouter.get("/", index);
userRouter.get("/:id", show);
userRouter.post("/", create);
userRouter.delete("/:id", destroy);

export default userRouter;
