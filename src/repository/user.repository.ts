export default function UsersRepository() {
    async function all() {}

    async function save(user: {}) {}

    async function findById(id: string) {}

    async function destroy(id: string) {}

    return {
        all,
        save,
        findById,
        destroy
    }
}
