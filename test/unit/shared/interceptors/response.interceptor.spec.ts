import { ExecutionContext, CallHandler } from '@nestjs/common';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { of } from 'rxjs';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor;
  let context: Partial<ExecutionContext>;
  let callHandler: Partial<CallHandler>;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({ statusCode: 201 }),
      }),
    };
    callHandler = {
      handle: jest.fn().mockReturnValue(of({ foo: 'bar' })),
    };
  });

  it('debe envolver la respuesta con statusCode, message y data', (done) => {
    interceptor.intercept(context as ExecutionContext, callHandler as CallHandler).subscribe((result) => {
      expect(result).toEqual({
        statusCode: 201,
        message: 'Operación exitosa',
        data: { foo: 'bar' },
      });
      done();
    });
  });

  it('debe usar statusCode 200 si no está definido', (done) => {
    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({}),
      }),
    };
    interceptor.intercept(context as ExecutionContext, callHandler as CallHandler).subscribe((result) => {
      expect(result.statusCode).toBe(200);
      done();
    });
  });
});