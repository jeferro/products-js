import { ProductId } from "src/domain/products/entities/ProductId"
import { Projection, Metadata, Auth, BooleanUtil } from "jf-architecture"
import { Reviews } from "./Reviews"

export class ProductDetail extends Projection<ProductId> {

    constructor(
        id: ProductId,
        private _title: string,
        private _description: string,
        private _enabled: boolean,
        private _infoOccurredOn: Date,
        private _activationOccurredOn: Date,
        readonly reviews: Reviews,
        metadata: Metadata
    ) {
        super(
            id,
            metadata
        )
    }

    static new(
        auth: Auth,
        productId: ProductId,
        title: string,
        description: string,
        enabled: boolean,
        occurredOn: Date
    ): ProductDetail {
        const metadata = Metadata.new(auth)

        return new ProductDetail(
            productId,
            title,
            description,
            enabled,
            occurredOn,
            occurredOn,
            Reviews.empty(),
            metadata
        )
    }

    get title(): string {
        return this._title
    }

    get description(): string {
        return this._description
    }

    get isEnabled(): boolean {
        return this._enabled
    }

    get isDisabled(): boolean {
        return !this.isEnabled
    }

    get infoOccurredOn(): Date {
        return this._infoOccurredOn
    }

    get activationOccurredOn(): Date {
        return this._activationOccurredOn
    }

    updateInfo(
        auth: Auth,
        title: string,
        description: string,
        occurredOn: Date
    ) {
        this._title = title
        this._description = description
        this._infoOccurredOn = occurredOn

        this.metadata.markAsModifiedBy(auth)
    }

    changeActivation(
        auth: Auth,
        enabled: boolean,
        occurredOn: Date
    ) {
        this._enabled = enabled
        this._activationOccurredOn = occurredOn

        this.metadata.markAsModifiedBy(auth)
    }

    copyOf(partial: Partial<ProductDetail>): ProductDetail {
        return new ProductDetail(
            this.id,
            partial.title || this.title,
            partial.description || this.description,
            BooleanUtil.getBoolean(partial.isEnabled, this.isEnabled),
            partial.infoOccurredOn || this.infoOccurredOn,
            partial.activationOccurredOn || this.activationOccurredOn,
            partial.reviews || this.reviews,
            partial.metadata || this.metadata
        )
    }
}