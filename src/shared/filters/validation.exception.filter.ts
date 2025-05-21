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
      (exceptionResponse as any).message
    ) {
      const msg = (exceptionResponse as any).message;
      if (Array.isArray(msg)) {
        errors = msg.map((m: string) => {
          if (m.includes('should not exist')) {
            const property = m.split(' ')[1];
            return `La propiedad '${property}' no está permitida`;
          }
          return m;
        });
      } else if (typeof msg === 'string') {
        errors = [msg];
      }
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