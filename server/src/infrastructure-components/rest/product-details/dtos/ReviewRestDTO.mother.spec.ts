import { ReviewRestDTO } from "./ReviewRestDTO"

export abstract class ReviewRestDTOMother {

    static one(): ReviewRestDTO {
        return new ReviewRestDTO(
            'user-one',
            'comment of user one'
        )
    }

    static two(): ReviewRestDTO {
        return new ReviewRestDTO(
            'user-two',
            'comment of user two'
        )
    }
}