import { CategoriaController } from '@modules/categorias/infrastructure/controllers/categoria.controller';
import { CreateCategoriaUseCase } from '@modules/categorias/application/use-cases/create-categoria.use-case';
import { ListCategoriasUseCase } from '@modules/categorias/application/use-cases/list-categorias.use-case';
import { CreateCategoriaDto } from '@modules/categorias/application/dto/create-categoria.dto';
import { Categoria } from '@modules/categorias/domain/entities/categoria.entity';

describe('CategoriaController', () => {
  let controller: CategoriaController;
  let createCategoriaUseCase: jest.Mocked<CreateCategoriaUseCase>;
  let listCategoriasUseCase: jest.Mocked<ListCategoriasUseCase>;

  beforeEach(() => {
    createCategoriaUseCase = { execute: jest.fn() } as any;
    listCategoriasUseCase = { execute: jest.fn() } as any;
    controller = new CategoriaController(createCategoriaUseCase, listCategoriasUseCase);
  });

  it('debe crear una categoría', async () => {
    const dto: CreateCategoriaDto = { nombre: 'Acción' };
    const categoriaCreada = new Categoria(1, 'Acción');
    createCategoriaUseCase.execute.mockResolvedValue(categoriaCreada);

    const result = await controller.create(dto);

    expect(createCategoriaUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(categoriaCreada);
  });

  it('debe retornar todas las categorías', async () => {
    const categorias = [new Categoria(1, 'Acción')];
    listCategoriasUseCase.execute.mockResolvedValue(categorias);

    const result = await controller.findAll();

    expect(listCategoriasUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(categorias);
  });
});