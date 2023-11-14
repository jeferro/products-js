import { Auth } from "../../auth/entities/Auth"
import { Username } from "../../auth/entities/Username"
import { ValueException } from "../exceptions/ValueException"
import { TimeService } from "../services/TimeService"
import { Value } from "./Value"

export class Metadata extends Value {

    private _updatedBy: Username

    private _updatedAt: Date

    constructor(
        readonly createdBy: Username,
        readonly createdAt: Date,
        updatedBy: Username,
        updatedAt: Date
    ) {
        super()

        if (updatedAt < createdAt) {
            throw ValueException.of(
                'Updated at should be equals or after created at',
            )
        }

        this._updatedBy = updatedBy
        this._updatedAt = updatedAt
    }

    static new(auth: Auth): Metadata {
        const now = TimeService.now()

        return new Metadata(
            auth.who,
            now,
            auth.who,
            now
        )
    }

    get updatedBy(): Username {
        return this._updatedBy
    }

    get updatedAt(): Date {
        return this._updatedAt
    }

    markAsModifiedBy(auth: Auth) {
        this._updatedBy = auth.who
        this._updatedAt = TimeService.now()
    }

    copyOf(partial: Partial<Metadata>): Metadata {
        return new Metadata(
            partial.createdBy || this.createdBy,
            partial.createdAt || this.createdAt,
            partial.updatedBy || this.updatedBy,
            partial.updatedAt || this.updatedAt
        )
    }
}