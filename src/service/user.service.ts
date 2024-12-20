import UsersRepository from "../repository/user.repository"

const { all, findById, save } = UsersRepository()
export default function UsersService() {

    async function findAllUsers() {
        return all()
    }

    async function findUserById(id: string) {
        return await findById(id)
    }

    async function createUser(user: { firstName: string, lastName: string, birthdayDate: Date, location: string }) {
        user.birthdayDate = new Date(user.birthdayDate)
        
        await save(user)
    }


    async function deleteUser() {}

    return {
        findAllUsers,
        findUserById,
        createUser,
        deleteUser
    }
}