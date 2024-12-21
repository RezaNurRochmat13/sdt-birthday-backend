import { Request, Response } from "express";
import UsersService from "../service/user.service";

export default function UsersController() {
    const { findAllUsers, findUserById, createUser, updateUser, deleteUser } = UsersService()

    async function index(request: Request, response: Response) {
        const users = await findAllUsers()

        response.status(200).json({
            message: 'Users retrieved successfully',
            data: users
        })
    }

    async function show(request: Request, response: Response) {
        const user = await findUserById(request.params.id)

        if (!user) {
            response.status(404).json({
                message: 'User not found'
            })
        }

        response.status(200).json({
            message: 'User retrieved successfully',
            data: user
        })
    }

    async function create(request: Request, response: Response) {
        const { email, firstName, lastName, birthdayDate, location, timezone } = request.body
        const user = await createUser({ email, firstName, lastName, birthdayDate, location, timezone })

        response.status(201).json({
            message: 'User created successfully',
            data: user
        })
    }

    async function update(request: Request, response: Response) {
        const { email, firstName, lastName, birthdayDate, location, timezone } = request.body
        
        const user = await findUserById(request.params.id)

        if (!user) {
            response.status(404).json({
                message: 'User not found'
            })
        }
        
        await updateUser(request.params.id, { email, firstName, lastName, birthdayDate, location, timezone })

        response.status(200).json({
            message: 'User updated successfully',
            data: user
        })
    }

    async function destroy(request: Request, response: Response) {

        const user = await findUserById(request.params.id)

        if (!user) {
            response.status(404).json({
                message: 'User not found'
            })
        }
        
        await deleteUser(request.params.id)

        response.status(200).json({
            message: 'User deleted successfully'
        })
    }

    return {
        index,
        show,
        create,
        update,
        destroy
    }
}
