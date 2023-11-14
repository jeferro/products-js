import { ReviewMongoDTO } from "./ReviewMongoDTO"

export abstract class ReviewMongoDTOMother {

    static one() {
        return new ReviewMongoDTO(
            'user-one',
            'comment of the user one'
        )
    }

    static two() {
        return new ReviewMongoDTO(
            'user-two',
            'comment of the user two'
        )
    }
}