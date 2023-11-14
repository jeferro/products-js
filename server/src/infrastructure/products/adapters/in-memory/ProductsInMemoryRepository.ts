import { Product } from "src/domain/products/entities/Product"
import { ProductId } from "src/domain/products/entities/ProductId"
import { Products } from "src/domain/products/entities/Products"
import { ProductsRepository } from "src/domain/products/repositories/ProductsRepository"


export class ProductsInMemoryRepository extends ProductsRepository {
  
  private data = new Map<string, Product>()

  reset(...products: Product[]) {
    this.data.clear()

    if (!products) {
      return
    }

    for (const product of products) {
      this.data.set(product.id.value, product)
    }
  }

  async save(product: Product): Promise<void> {
    this.data.set(product.id.value, product)
  }

  async findById(productId: ProductId): Promise<Product | undefined> {
    return Array.from(this.data.values())
      .find((product) => product.id.equals(productId))
  }

  async deleteById(productId: ProductId): Promise<void> {
    this.data.delete(productId.value)
  }

  async findAll(): Promise<Products> {
    const data = Array.from(this.data.values())

    return Products.ofArray(data)
  }
}
