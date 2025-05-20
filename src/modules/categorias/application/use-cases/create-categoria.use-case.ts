import { Categoria } from "../../domain/entities/categoria.entity";
import { ICategoriaRepository } from "../../domain/categoria.repository.interface";
import { CreateCategoriaDto } from "../dto/create-categoria.dto";

export class CreateCategoriaUseCase {
  constructor(private readonly categoriaRepo: ICategoriaRepository) {}

  async execute(dto: CreateCategoriaDto) {
    const categoria = new Categoria(0, dto.nombre);
    return await this.categoriaRepo.save(categoria);
  }
}
