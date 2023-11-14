import { ThreadUtils } from "jf-architecture"


export class BlockResult<T> {

    private data: T | undefined

    push(data: T) {
        this.data = data
    }

    async waitForResult(): Promise<T> {
        return new Promise(async (resolve) => {
            while (!this.data) {
                await ThreadUtils.delay(1000)
            }
            
            resolve(this.data)

            this.data = undefined
        })
    }
}