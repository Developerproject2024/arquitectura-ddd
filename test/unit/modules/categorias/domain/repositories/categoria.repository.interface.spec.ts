
import { Categoria } from '@modules/categorias/domain/entities/categoria.entity';
import { ICategoriaRepository } from '@modules/categorias/domain/repositories/categoria.repository.interface';


describe('ICategoriaRepository (mock usage)', () => {
  let repo: jest.Mocked<ICategoriaRepository>;

  beforeEach(() => {
    repo = {
      save: jest.fn(),
      findAll: jest.fn(),
    };
  });

  it('debería guardar una categoría', async () => {
    const categoria = new Categoria(1, 'Acción');
    repo.save.mockResolvedValue(categoria);

    const result = await repo.save(categoria);

    expect(repo.save).toHaveBeenCalledWith(categoria);
    expect(result).toEqual(categoria);
  });

  it('debería retornar todas las categorías', async () => {
    const categorias = [new Categoria(1, 'Acción')];
    repo.findAll.mockResolvedValue(categorias);

    const result = await repo.findAll();

    expect(repo.findAll).toHaveBeenCalled();
    expect(result).toEqual(categorias);
  });
});
