import UsersRepository from "../repository/user.repository"
import useTimezone from "../utils/timezone.util"

export default function UsersService() {
    const { getTimezone } = useTimezone()
    const { all, findById, save, update, destroy } = UsersRepository()

    async function findAllUsers() {
        return all()
    }

    async function findUserById(id: string) {
        return await findById(id)
    }

    async function createUser(
        user: {
            email: string,
            firstName: string,
            lastName: string,
            birthdayDate: Date,
            location: string,
            timezone: string 
        }) {
        user.birthdayDate = new Date(user.birthdayDate)
        const timezone = await getTimezone(user.location)
        user.timezone = timezone
        await save(user)
    }

    async function updateUser(id: string,
        user: {
            email: string,
            firstName: string,
            lastName: string,
            birthdayDate: Date,
            location: string,
            timezone: string 
        }) {
        user.birthdayDate = new Date(user.birthdayDate)
        const timezone = await getTimezone(user.location)
        user.timezone = timezone
        await update(id, user)
    }


    async function deleteUser(id: string) {
        await destroy(id)
    }

    return {
        findAllUsers,
        findUserById,
        createUser,
        updateUser,
        deleteUser
    }
}