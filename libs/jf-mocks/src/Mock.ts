import { ClassMockProxyHandler } from './proxy-handlers/ClassMockProxyHandler'
import { InterfaceMockProxyHandler } from './proxy-handlers/InterfaceMockProxyHandler'
import { Class, FunctionType, JestMockType } from './types'

export type Mock<T> = T & {
  // all functions are converted to jest.Mock with corresponding return type
  // (generics passed to jest.Mock)
  [P in keyof T as T[P] extends FunctionType ? P : never]: JestMockType<T[P]>
}

export function mockClass<T extends object>(clazz: Class<T>): Mock<T> {
  const proxyHandler = new ClassMockProxyHandler<T>(clazz)

  return new Proxy({} as any, proxyHandler)
}

export function mockInterface<T extends object>(): Mock<T> {
  const proxyHandler = new InterfaceMockProxyHandler<T>()

  return new Proxy({} as any, proxyHandler)
}
