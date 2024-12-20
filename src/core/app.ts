import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "../routes/user.routes";
import messageRouter from "../routes/message.routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors())
// User Router
app.use('/api/users',userRouter);

// Message Router
app.use('/api/messages',messageRouter);

function useApp() {
    app.get("/", (req: Request, res: Response) => {
        res.send("Ping successfully");
    });

    return app
}

export { useApp }