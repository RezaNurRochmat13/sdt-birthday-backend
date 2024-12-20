import { Request, Response } from "express";

export default function MessageController() {
    async function index(request: Request, response: Response) {
        response.status(200).json({
            message: 'Messages retrieved successfully'
        })
    }

    async function sendingMessages(request: Request, response: Response) {
        response.status(200).json({
            message: 'Messages sent successfully'
        })
    }

    return {
        index,
        sendingMessages
    }
}