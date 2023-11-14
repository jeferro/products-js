import { CollectionValue } from "jf-architecture"
import { Review } from "./Review"

export class Reviews extends CollectionValue<Review> {

    static empty(): Reviews {
        return new Reviews([])
    }
}