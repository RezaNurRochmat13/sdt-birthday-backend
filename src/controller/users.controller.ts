import { Request, Response } from "express";

export default function UsersController() {
    async function index(request: Request, response: Response) {}

    async function create(request: Request, response: Response) {}

    async function destroy(request: Request, response: Response) {}

    return {
        index,
        create,
        destroy
    }
}
