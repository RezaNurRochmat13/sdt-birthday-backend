import express from "express";
import MessageController from "../controller/messages.controller";

const messageRouter = express.Router();
const { index } = MessageController()

messageRouter.get("/", index);

export default messageRouter;
