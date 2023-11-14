// eslint-disable-next-line @typescript-eslint/ban-types
export interface Class<T = any> extends Function {
  new (...args: any[]): T
}
