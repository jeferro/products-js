import { User } from "src/domain/auth/entities/User"
import { UsersRepository } from "src/domain/auth/repository/UsersRepository"
import { UserMongoMapper } from "./mappers/UserMongoMapper"
import { Injectable } from "@nestjs/common"
import { UsersMongoClient } from "src/infrastructure-components/mongo/auth/UsersMongoClient"
import { UsernameMongoMapper } from "../../../shared/adapters/mongo/mappers/UsernameMongoMapper"
import { Username } from "jf-architecture"

@Injectable()
export class UsersMongoRepository extends UsersRepository {

    private readonly usernameMongoMapper = new UsernameMongoMapper()

    private readonly userMongoMapper = new UserMongoMapper()

    constructor(
        private readonly userMongoClient: UsersMongoClient,
    ) {
        super()
    }

    async findByUsername(username: Username): Promise<User | undefined> {
        const usernameDTO = this.usernameMongoMapper.toDTO(username)

        const user = await this.userMongoClient.findByUsername(usernameDTO)

        return this.userMongoMapper.toEntityOrUndefined(user)
    }

}