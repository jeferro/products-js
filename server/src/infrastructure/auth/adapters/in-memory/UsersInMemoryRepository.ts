import { User } from "src/domain/auth/entities/User"
import { UsersRepository } from "src/domain/auth/repository/UsersRepository"
import { Username } from "jf-architecture"

export class UsersInMemoryRepository extends UsersRepository {
    private data = new Map<string, User>()

    reset(...users: User[]) {
        this.data.clear()

        if (!users) {
            return
        }

        for (const user of users) {
            this.data.set(user.username.value, user)
        }
    }

    async findByUsername(username: Username): Promise<User | undefined> {
        const user = Array.from(this.data.values()).find((user) =>
            user.username.equals(username),
        )

        return Promise.resolve(user)
    }

}