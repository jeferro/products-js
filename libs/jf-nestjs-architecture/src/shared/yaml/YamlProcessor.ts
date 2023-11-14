import * as yaml from 'js-yaml'
import * as path from 'path'
import * as fs from 'fs'
import { Injectable } from '@nestjs/common'
import { interpolation } from 'interpolate-json'

@Injectable()
export class YamlProcessor {
  static readonly PATH_SEPARATOR = '.'

  private readonly configs: Record<string, any>

  constructor(fileName: string) {
    const filePath = path.join(process.cwd(), fileName)

    const fileContent = fs.readFileSync(filePath, 'utf8')

    this.configs = yaml.load(fileContent) as Record<string, any>
  }

  get<T>(config: string): T {
    const value = this.getRecursive<T>(
      this.configs,
      config.split(YamlProcessor.PATH_SEPARATOR),
    )

    if (value === undefined) {
      throw new Error(`Required configuration ${String(config)} not found`)
    }

    return value
  }

  getOrDefault<T>(config: string, orValue: T): T {
    const value = this.getRecursive<T>(
      this.configs,
      config.split(YamlProcessor.PATH_SEPARATOR),
    )

    return value 
      ? value 
      : orValue
  }

  private getRecursive<T>(
    record: Record<string, any>,
    keys: string[],
  ): T | undefined {
    const key = keys.shift()

    if (!key || !(key in record)) {
      return undefined
    }

    const value = record[key]

    if (keys.length == 0) {
      return interpolation.expand(value, this.configs)
    }

    return this.getRecursive(value, keys)
  }
}
