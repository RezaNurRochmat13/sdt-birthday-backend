import express from "express";
import MessageController from "../controller/messages.controller";

const messageRouter = express.Router();
const { index, sendingMessages } = MessageController()

messageRouter.get("/", index);
messageRouter.post("/user", sendingMessages);

export default messageRouter;
