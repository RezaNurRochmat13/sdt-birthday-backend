import cron from "node-cron";
import UsersRepository from "../repository/user.repository";
import moment from "moment-timezone";
import { MessageRepository } from "../repository/message.repository";

export function MessageService(targetTime?: string) {
    const { all: allUsers } = UsersRepository()
    const { all: allMessages, save: saveMessage } = MessageRepository()

    async function findAllMessages() {
        const messages = await allMessages()

        return messages
    }

    async function setupCronJobsSendingMessages() {
        const users = await allUsers()

        for (const user of users) {
            // Set up the target time for sending messages
            // const targetTime = '11:10'

            cron.schedule('* * * * *', () => {
                console.log(`Running cron job on ${new Date().toISOString()}`)
                const currentTimeInUserTimezone = moment().tz(user.timezone as string).format('HH:mm')

                if (currentTimeInUserTimezone === targetTime) {
                    sendingMessages(user, `Happy birthday ${user.firstName}!`)
                }
            })
        }
    }

    async function sendingMessages(user: { id: number, firstName: string, lastName: string, email?: string | null }, message: string) {
        await sendMessageToEmailService(user.email as string, message)
        await sendMessageToDatabase({ sentUserId: user.id, messageContent: message, messageSentAt: new Date() })
    }

    async function sendMessageToEmailService(email: string, message: string) {
        const response = await fetch('https://email-service.digitalenvision.com.au/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, message })
        })

        const data = await response.json()

        console.log(`Response from email service: ${JSON.stringify(data)}`)
        console.log(`Message "${message}" sent to ${email} at ${new Date().toISOString()}`);

        return data
    }

    async function sendMessageToDatabase(message: {
        sentUserId: number, messageContent: string, messageSentAt: Date
    }) {
        await saveMessage(message)
    }

    return {
        findAllMessages,
        setupCronJobsSendingMessages
    }
}