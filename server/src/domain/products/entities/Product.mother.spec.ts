import { Product } from './Product'
import { ProductId } from './ProductId'
import { MetadataMother } from 'jf-architecture'

export abstract class ProductMother {

  static oneEnabled(): Product {
    const productId = new ProductId('product-one')
    const metadata = MetadataMother.one()

    return new Product(
      productId,
      'title product-one',
      'description product-one',
      true,
      metadata
    )
  }

  static oneDisabled(): Product {
    const productId = new ProductId('product-one')
    const metadata = MetadataMother.one()

    return new Product(
      productId,
      'title product-one',
      'description product-one',
      false,
      metadata
    )
  }

  static twoEnabled(): Product {
    const productId = new ProductId('product-two')
    const metadata = MetadataMother.one()

    return new Product(
      productId,
      'title product-two',
      'description product-two',
      true,
      metadata
    )
  }

  static twoDisabled(): Product {
    const productId = new ProductId('product-two')
    const metadata = MetadataMother.one()

    return new Product(
      productId,
      'title product-two',
      'description product-two',
      false,
      metadata
    )
  }
}
