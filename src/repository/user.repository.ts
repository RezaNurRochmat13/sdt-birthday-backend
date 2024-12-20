import prisma from "../config/database.config"

export default function UsersRepository() {
    async function all() {
        return await prisma.user.findMany({
            where: {
                deletedAt: null
            }
        })
    }

    async function findById(id: string) {
        return await prisma.user.findUnique({
            where: {
                id: parseInt(id),
                deletedAt: null
            }
        })
    }

    async function save(user: {
        firstName: string
        lastName: string
        birthdayDate: Date
        location: string
    }) {
        return await prisma.user.create({ data: user })
    }

    async function update(id: string, user: { firstName: string, lastName: string, birthdayDate: Date, location: string }) {
        return await prisma.user.update({
            where: {
                id: parseInt(id),
                deletedAt: null
            },
            data: user
        })
    }

    async function destroy(id: string) {
        return await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    return {
        all,
        findById,
        save,
        update,
        destroy
    }
}
