import UsersRepository from "../repository/user.repository"

const { all, save } = UsersRepository()
export default function UsersService() {

    async function findAllUsers() {
        return all()
    }

    async function createUser(user: { firstName: string, lastName: string, birthdayDate: Date, location: string }) {
        user.birthdayDate = new Date(user.birthdayDate)
        
        await save(user)
    }


    async function deleteUser() {}

    return {
        findAllUsers,
        createUser,
        deleteUser
    }
}