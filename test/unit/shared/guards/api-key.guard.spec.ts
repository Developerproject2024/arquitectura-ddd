
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyGuard } from '@shared/guards/api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let configService: jest.Mocked<ConfigService>;
  let context: jest.Mocked<ExecutionContext>;

  beforeEach(() => {
    configService = { get: jest.fn() } as any;
    guard = new ApiKeyGuard(configService);

    context = {
      switchToHttp: jest.fn(),
    } as any;
  });

  function mockRequest(headers: Record<string, string>) {
    return {
      getRequest: jest.fn(() => ({ headers })),
    };
  }

  it('permite el acceso si la API Key es válida', () => {
    configService.get.mockReturnValue('12345');
    const req = mockRequest({ 'api-key': '12345' });
    (context.switchToHttp as jest.Mock).mockReturnValue(req);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('lanza UnauthorizedException si la API Key es inválida', () => {
    configService.get.mockReturnValue('12345');
    const req = mockRequest({ 'api-key': 'wrong' });
    (context.switchToHttp as jest.Mock).mockReturnValue(req);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('lanza UnauthorizedException si no hay API Key', () => {
    configService.get.mockReturnValue('12345');
    const req = mockRequest({});
    (context.switchToHttp as jest.Mock).mockReturnValue(req);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('acepta x-api-key como header alternativo', () => {
    configService.get.mockReturnValue('abcde');
    const req = mockRequest({ 'x-api-key': 'abcde' });
    (context.switchToHttp as jest.Mock).mockReturnValue(req);

    expect(guard.canActivate(context)).toBe(true);
  });
});