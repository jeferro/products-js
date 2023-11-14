import { ReviewMother } from "./Review.mother.spec"
import { Reviews } from "./Reviews"

export abstract class ReviewsMother {

    static one(): Reviews {
        return new Reviews([
            ReviewMother.one(),
            ReviewMother.two()
        ])
    }
}