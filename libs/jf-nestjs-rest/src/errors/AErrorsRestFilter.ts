import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { ErrorRestDTO } from './dtos/ErrorRestDTO'

@Catch()
export abstract class AErrorsRestFilter implements ExceptionFilter {

  catch(cause: Error, host: ArgumentsHost): void {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    try {
      return this.onError(cause, response)
    } catch (error) {
      const errorDTO = new ErrorRestDTO(error.message)

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorDTO)
    }
  }

  abstract onError(
    cause: Error,
    response: Response<ErrorRestDTO, Record<string, any>>,
  ): void
}
