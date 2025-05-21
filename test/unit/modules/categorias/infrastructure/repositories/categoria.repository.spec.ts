import { Categoria } from '@modules/categorias/domain/entities/categoria.entity';
import { CategoriaModel } from '@modules/categorias/infrastructure/model/categoria.model';
import { CategoriaRepository } from '@modules/categorias/infrastructure/repositories/categoria.repository';

jest.mock('@modules/categorias/infrastructure/model/categoria.model');

describe('CategoriaRepository', () => {
  let repository: CategoriaRepository;

  beforeEach(() => {
    repository = new CategoriaRepository();
    jest.clearAllMocks();
  });

  it('debe guardar una categoría y devolver la entidad', async () => {
    const categoria = new Categoria(0, 'Acción');
    const createdModel = { id: 1, nombre: 'Acción' };
    (CategoriaModel.create as jest.Mock).mockResolvedValue(createdModel);

    const result = await repository.save(categoria);

    expect(CategoriaModel.create).toHaveBeenCalledWith({ nombre: 'Acción' });
    expect(result).toEqual(new Categoria(1, 'Acción'));
  });

  it('debe retornar todas las categorías', async () => {
    const models = [
      { id: 1, nombre: 'Acción' },
      { id: 2, nombre: 'Comedia' },
    ];
    (CategoriaModel.findAll as jest.Mock).mockResolvedValue(models);

    const result = await repository.findAll();

    expect(CategoriaModel.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      new Categoria(1, 'Acción'),
      new Categoria(2, 'Comedia'),
    ]);
  });
});
