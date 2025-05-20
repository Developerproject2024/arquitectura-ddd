import { Module } from '@nestjs/common';
import { CategoriaController } from './controllers/categoria.controller';
import { CreateCategoriaUseCase } from './application/use-cases/create-categoria.use-case';
import { ListCategoriasUseCase } from './application/use-cases/list-categorias.use-case';
import { CategoriaRepository } from './infrastructure/categoria.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriaModel } from './infrastructure/categoria.model';

@Module({
  imports: [SequelizeModule.forFeature([CategoriaModel])],
  controllers: [CategoriaController],
  providers: [
    CategoriaRepository,
    {
      provide: CreateCategoriaUseCase,
      useFactory: (repo: CategoriaRepository) => new CreateCategoriaUseCase(repo),
      inject: [CategoriaRepository],
    },
    {
      provide: ListCategoriasUseCase,
      useFactory: (repo: CategoriaRepository) => new ListCategoriasUseCase(repo),
      inject: [CategoriaRepository],
    },
  ],
})
export class CategoriasModule {}
