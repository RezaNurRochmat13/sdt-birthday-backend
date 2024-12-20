import prisma from "../config/database.config"

export default function UsersRepository() {
    async function all() {
        return await prisma.user.findMany()
    }

    async function save(user: {
        firstName: string
        lastName: string
        birthdayDate: Date
        location: string
    }) {
        return await prisma.user.create({ data: user })
    }

    async function findById(id: string) {}

    async function destroy(id: string) {}

    return {
        all,
        save,
        findById,
        destroy
    }
}
