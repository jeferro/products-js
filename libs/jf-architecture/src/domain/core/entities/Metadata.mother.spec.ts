import { UsernameMother } from "../../auth/entities/Username.mother.spec"
import { Metadata } from "./Metadata"

export class MetadataMother {

    static one(): Metadata {
        const now = new Date()
        const username = UsernameMother.one()
        
        return new Metadata(
            username,
            now,
            username,
            now
        )
    }
}