import { ProductId } from './ProductId'
import { ProductDeleted } from '../events/ProductDeleted'
import { Aggregate, Metadata, Auth } from 'jf-architecture'
import { ProductCreated } from '../events/ProductCreated'
import { ProductUpdated } from '../events/ProductUpdated'
import { ProductActivationChanged } from '../events/ProductActivationChanged'
import { DisabledProductException } from '../exceptions/DisabledProductException'

export class Product extends Aggregate<ProductId> {

  constructor(
    id: ProductId,
    protected _title: string,
    protected _description: string,
    protected _enabled: boolean,
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
    description: string
  ): Product {
    const metadata = Metadata.new(auth)

    const product = new Product(
      productId,
      title,
      description,
      true,
      metadata
    )

    product.domainEvents.record(
      ProductCreated.of(product)
    )

    return product
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
    return !this._enabled
  }

  update(
    auth: Auth,
    title: string,
    description: string
  ) {
    if (this.isDisabled) {
      throw DisabledProductException.ofProductId(this.id)
    }

    this.markAsModifiedBy(auth)

    this._title = title
    this._description = description

    this.domainEvents.record(
      ProductUpdated.of(this)
    )
  }

  changeActivation(
    auth: Auth,
    enabled: boolean
  ) {
    this.markAsModifiedBy(auth)

    this._enabled = enabled

    this.domainEvents.record(
      ProductActivationChanged.of(this)
    )
  }

  delete(auth: Auth) {
    this.markAsModifiedBy(auth)

    this.domainEvents.record(
      ProductDeleted.of(this)
    )
  }
}
