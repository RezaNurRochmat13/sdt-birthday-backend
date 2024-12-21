import prisma from "../config/database.config"

export function MessageRepository() {
    async function all() {
        return await prisma.message.findMany({
            where: {
                deletedAt: null
            }
        })
    }

    async function save(message: {
        sentUserId: number,
        messageContent: string,
        messageSentAt: Date
    }) {
        await prisma.message.create({ data: message })
    }

    return {
        all,
        save
    }
}