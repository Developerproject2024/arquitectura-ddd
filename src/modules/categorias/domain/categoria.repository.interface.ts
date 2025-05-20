import { Categoria } from "./categoria.entity";

export interface ICategoriaRepository {
  save(categoria: Categoria): Promise<Categoria>;
  findAll(): Promise<Categoria[]>;
}
