import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import messageRouter from "../routes/message.routes";
import userRouter from "../routes/user.routes";
import { MessageService } from "../service/message.service";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors())
// User Router
app.use('/api/users',userRouter);

// Message Router
app.use('/api/messages',messageRouter);

function useApp() {
    const { setupCronJobsSendingMessages } = MessageService()

    app.get("/", (req: Request, res: Response) => {
        res.send("Ping successfully");
    });

    setupCronJobsSendingMessages()

    return app
}

export { useApp }