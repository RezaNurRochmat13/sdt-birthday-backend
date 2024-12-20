import express from "express";
import UsersController from "./../controller/users.controller";

const userRouter = express.Router();
const { index, show, create, update, destroy } = UsersController()

userRouter.get("/", index);
userRouter.get("/:id", show);
userRouter.post("/", create);
userRouter.put("/:id", update);
userRouter.delete("/:id", destroy);

export default userRouter;
