import { UsernameMother } from "jf-architecture"
import { Review } from "./Review"

export abstract class ReviewMother {

    static one(): Review {
        const ownerId = UsernameMother.one()

        return new Review(
            ownerId,
            'comment of the user one'
        )
    }

    static two(): Review {
        const ownerId = UsernameMother.two()

        return new Review(
            ownerId,
            'comment of the user one'
        )
    }
}