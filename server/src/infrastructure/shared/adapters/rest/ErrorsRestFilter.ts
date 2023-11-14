import { HttpStatus, Injectable } from '@nestjs/common'
import { Response } from 'express'
import { ForbiddenException, ElementNotFoundException, ValueException } from 'jf-architecture'
import { AErrorsRestFilter, ErrorRestDTO } from 'jf-nestjs-rest'

@Injectable()
export class ErrorsRestFilter extends AErrorsRestFilter {
  onError(cause: Error, response: Response<ErrorRestDTO, Record<string, any>>) {
    const errorDTO = new ErrorRestDTO(cause.message)
    let status = HttpStatus.INTERNAL_SERVER_ERROR

    if (cause instanceof ElementNotFoundException) {
      status = HttpStatus.NOT_FOUND
    } else if (cause instanceof ForbiddenException) {
      status = HttpStatus.FORBIDDEN
    } else if (cause instanceof ValueException) {
      status = HttpStatus.BAD_REQUEST
    }

    return response.status(status).json(errorDTO)
  }
}
