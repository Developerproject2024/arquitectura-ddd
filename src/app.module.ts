import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { CategoriasModule } from '@modules/categorias/categorias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('database');
        return {
          dialect: db?.dialect || 'postgres',
          host: db?.host || process.env.DB_HOST,
          port: db?.port || Number(process.env.DB_PORT),
          username: db?.username || process.env.DB_USERNAME,
          password: db?.password || process.env.DB_PASSWORD,
          database: db?.name || process.env.DB_NAME,
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
    CategoriasModule,
  ],
})
export class AppModule {}