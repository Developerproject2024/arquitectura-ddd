
import { CreateCategoriaDto } from '@modules/categorias/application/dto/create-categoria.dto';
import { CreateCategoriaUseCase } from '@modules/categorias/application/use-cases/create-categoria.use-case';
import { Categoria } from '@modules/categorias/domain/entities/categoria.entity';
import { ICategoriaRepository } from '@modules/categorias/domain/repositories/categoria.repository.interface';


describe('CreateCategoriaUseCase', () => {
  let useCase: CreateCategoriaUseCase;
  let categoriaRepo: jest.Mocked<ICategoriaRepository>;

  beforeEach(() => {
    categoriaRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
      // agrega otros métodos si existen en la interfaz
    } as any;
    useCase = new CreateCategoriaUseCase(categoriaRepo);
  });

  it('debe crear una categoría y devolverla', async () => {
    const dto: CreateCategoriaDto = { nombre: 'Acción' };
    const categoriaEsperada = new Categoria(1, dto.nombre);

    categoriaRepo.save.mockResolvedValue(categoriaEsperada);

    const result = await useCase.execute(dto);

    expect(categoriaRepo.save).toHaveBeenCalledWith(expect.any(Categoria));
    expect(result).toEqual(categoriaEsperada);
  });
});