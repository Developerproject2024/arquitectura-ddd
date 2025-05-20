import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriasModule } from './modules/categorias/categorias.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'cine',
      autoLoadModels: true,
      synchronize: true,
    }),
    CategoriasModule,
  ],
})
export class AppModule {}
