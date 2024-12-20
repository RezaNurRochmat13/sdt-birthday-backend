import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "../routes/user.routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors())
// User Router
app.use(userRouter);

function useApp() {
    app.get("/", (req: Request, res: Response) => {
        res.send("Ping successfully");
    });

    return app
}

export { useApp }