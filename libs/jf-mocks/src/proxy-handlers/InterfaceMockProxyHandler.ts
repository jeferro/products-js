export class InterfaceMockProxyHandler<T extends object>
  implements ProxyHandler<T>
{
  get(target: T, property: string | symbol) {
    if (property in target) {
      return target[property]
    }

    target[property] = jest.fn()

    return target[property]
  }
}
