import { Categoria } from "../entities/categoria.entity";


export interface ICategoriaRepository {
  save(categoria: Categoria): Promise<Categoria>;
  findAll(): Promise<Categoria[]>;
}
