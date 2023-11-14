import { Class } from '../types'

export class ClassMockProxyHandler<T extends object>
  implements ProxyHandler<T>
{
  private readonly excludedFunctionNames = ['constructor']

  private readonly functionNames: Set<string>

  constructor(clazz: Class<T>) {
    const allFunctionNames =
      ClassMockProxyHandler.getFunctionNamesOfClass(clazz)

    const filteredFunctionNames = allFunctionNames
      .filter((fuctionName) => !this.excludedFunctionNames.includes(fuctionName))

    this.functionNames = new Set(filteredFunctionNames)
  }

  get(target: T, property: string | symbol) {
    if (property in target) {
      return target[property]
    }

    if (this.functionNames.has(property as string)) {
      target[property] = jest.fn()
    }

    return target[property]
  }

  private static getFunctionNamesOfClass(clazz: any): string[] {
    if (!clazz || !clazz.prototype) {
      return []
    }

    const properties = Object.getOwnPropertyNames(clazz.prototype)
    const prototype = Object.getPrototypeOf(clazz)

    if (!prototype) {
      return properties
    }

    return [
      ...properties,
      ...ClassMockProxyHandler.getFunctionNamesOfClass(prototype),
    ]
  }
}
