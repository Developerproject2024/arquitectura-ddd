import { Categoria } from "../../domain/categoria.entity";
import { ICategoriaRepository } from "../../domain/categoria.repository.interface";

export class CreateCategoriaUseCase {
  constructor(private readonly categoriaRepo: ICategoriaRepository) {}

  async execute(dto: { nombre: string }) {
    const categoria = new Categoria(0, dto.nombre);
    return await this.categoriaRepo.save(categoria);
  }
}
