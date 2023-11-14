export type Class<T> = { new (...args: any[]): T }

export type FunctionType = (...args: any[]) => any
type FunctionReturnType<T> = T extends FunctionType ? ReturnType<T> : never
type FunctionParametersType<T> = T extends FunctionType ? Parameters<T> : never

export type JestMockType<T> = jest.Mock<
  FunctionReturnType<T>,
  FunctionParametersType<T>
>
