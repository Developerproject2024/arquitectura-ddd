import { ICategoriaRepository } from '../../domain/categoria.repository.interface';

export class ListCategoriasUseCase {
  constructor(private readonly repo: ICategoriaRepository) {}

  async execute() {
    return await this.repo.findAll();
  }
}
