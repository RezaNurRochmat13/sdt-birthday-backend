import { Request, Response } from "express";
import { MessageService } from "../service/message.service";

export default function MessageController() {
    const { findAllMessages } = MessageService()

    async function index(request: Request, response: Response) {
        const messages = await findAllMessages()

        response.status(200).json({
            message: 'Messages retrieved successfully',
            data: messages
        })
    }

    return {
        index
    }
}