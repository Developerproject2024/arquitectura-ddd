
import { ICategoriaRepository } from '@modules/categorias/domain/repositories/categoria.repository.interface';
import { Categoria } from '@modules/categorias/domain/entities/categoria.entity';
import { ListCategoriasUseCase } from '@modules/categorias/application/use-cases/list-categorias.use-case';

describe('ListCategoriasUseCase', () => {
  let useCase: ListCategoriasUseCase;
  let repo: jest.Mocked<ICategoriaRepository>;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      save: jest.fn(),
    } as any;
    useCase = new ListCategoriasUseCase(repo);
  });

  it('debe retornar todas las categorías', async () => {
    const categorias = [
      new Categoria(1, 'Acción'),
      new Categoria(2, 'Comedia'),
    ];
    repo.findAll.mockResolvedValue(categorias);

    const result = await useCase.execute();

    expect(repo.findAll).toHaveBeenCalled();
    expect(result).toEqual(categorias);
  });
});