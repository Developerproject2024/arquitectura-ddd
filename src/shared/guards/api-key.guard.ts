import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['api-key'] || request.headers['x-api-key'];
    const apiKeyEnv = this.configService.get<string>('API_KEY');

    if (!apiKeyHeader || apiKeyHeader !== apiKeyEnv) {
      throw new UnauthorizedException('API Key inválida o no proporcionada');
    }
    return true;
  }
}