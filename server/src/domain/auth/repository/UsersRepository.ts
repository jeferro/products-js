import { Repository, Username } from "jf-architecture"
import { User } from "../entities/User"

export abstract class UsersRepository extends Repository<User> {
    
    abstract findByUsername(username: Username): Promise<User | undefined> 
}