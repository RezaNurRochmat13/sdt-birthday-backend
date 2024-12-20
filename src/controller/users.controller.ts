import { Request, Response } from "express";
import UsersService from "../service/user.service";

const { findAllUsers, findUserById, createUser } = UsersService()
export default function UsersController() {
    async function index(request: Request, response: Response) {
        const users = await findAllUsers()

        response.status(200).json({
            message: 'Users retrieved successfully',
            data: users
        })
    }

    async function show(request: Request, response: Response) {
        const user = await findUserById(request.params.id)

        response.status(200).json({
            message: 'User retrieved successfully',
            data: user
        })
    }

    async function create(request: Request, response: Response) {
        const { firstName, lastName, birthdayDate, location } = request.body
        const user = await createUser({ firstName, lastName, birthdayDate, location })

        response.status(201).json({
            message: 'User created successfully',
            data: user
        })
    }

    async function destroy(request: Request, response: Response) {}

    return {
        index,
        show,
        create,
        destroy
    }
}
