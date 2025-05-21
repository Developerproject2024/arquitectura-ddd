import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { ValidationExceptionFilter } from '@shared/filters/validation.exception.filter';

describe('ValidationExceptionFilter', () => {
  let filter: ValidationExceptionFilter;

  beforeEach(() => {
    filter = new ValidationExceptionFilter();
  });

  function mockHost() {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const getResponse = jest.fn(() => ({ status }));
    const switchToHttp = jest.fn(() => ({ getResponse }));
    const host = { switchToHttp } as unknown as ArgumentsHost;
    return { host, status, json };
  }

  // it('debe devolver errores de validación como array', () => {
  //   const { host, status, json } = mockHost();
  //   const exception = new BadRequestException({
  //     message: ['name should not exist', 'email must be an email'],
  //   });

  //   filter.catch(exception, host);

  //   expect(status).toHaveBeenCalledWith(400);
  //   expect(json).toHaveBeenCalledWith({
  //     statusCode: 400,
  //     message: 'Error de validación',
  //     errors: [
  //       "La propiedad 'name' no está permitida",
  //       'email must be an email',
  //     ],
  //   });
  // });

  it('debe devolver error de validación como string', () => {
    const { host, status, json } = mockHost();
    const exception = new BadRequestException('Solo un string');

    filter.catch(exception, host);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      statusCode: 400,
      message: 'Error de validación',
      errors: ['Solo un string'],
    });
  });

  it('debe devolver error de validación como string en objeto', () => {
    const { host, status, json } = mockHost();
    const exception = new BadRequestException({ message: 'Un error simple' });

    filter.catch(exception, host);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      statusCode: 400,
      message: 'Error de validación',
      errors: ['Un error simple'],
    });
  });
});