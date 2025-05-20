import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'Error de validación';
    let errors: string[] = [];

    if (
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).message &&
      Array.isArray((exceptionResponse as any).message)
    ) {
      errors = (exceptionResponse as any).message.map((msg: string) => {
        if (msg.includes('should not exist')) {
          const property = msg.split(' ')[1];
          return `La propiedad '${property}' no está permitida`;
        }
        return msg;
      });
    } else if (typeof exceptionResponse === 'string') {
      errors = [exceptionResponse];
    }

    response.status(status).json({
      statusCode: status,
      message,
      errors,
    });
  }
}