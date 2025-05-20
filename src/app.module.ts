import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { CategoriasModule } from '@modules/categorias/categorias.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { ValidationExceptionFilter } from '@shared/filters/validation.exception.filter';
import { ApiKeyGuard } from '@shared/guards/api-key.guard';
import settings from './settings';
import { envValidationSchema } from '@shared/schema/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig,settings],
      validationSchema: envValidationSchema, 
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('database');
        return {
          dialect: db?.dialect ?? 'postgres',
          host: db?.host ?? process.env.DB_HOST,
          port: db?.port ?? Number(process.env.DB_PORT),
          username: db?.username ?? process.env.DB_USERNAME,
          password: db?.password ?? process.env.DB_PASSWORD,
          database: db?.name ?? process.env.DB_NAME,
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
    CategoriasModule,
  ],
   providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    }
  ],
})
export class AppModule {}