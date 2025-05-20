
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoriaUseCase } from '../application/use-cases/create-categoria.use-case';
import { ListCategoriasUseCase } from '../application/use-cases/list-categorias.use-case';

@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly createCategoriaUseCase: CreateCategoriaUseCase,
    private readonly listCategoriasUseCase: ListCategoriasUseCase,
  ) {}

  @Post()
  async create(@Body() dto: { nombre: string }) {
    return await this.createCategoriaUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return await this.listCategoriasUseCase.execute();
  }
}
