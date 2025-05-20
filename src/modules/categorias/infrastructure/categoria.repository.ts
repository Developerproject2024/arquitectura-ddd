import { Injectable } from "@nestjs/common";
import { ICategoriaRepository } from "../domain/categoria.repository.interface";
import { Categoria } from "../domain/categoria.entity";
import { CategoriaModel } from "./categoria.model";

@Injectable()
export class CategoriaRepository implements ICategoriaRepository {
  async save(categoria: Categoria): Promise<Categoria> {
    const model = await CategoriaModel.create({ nombre: categoria.nombre });
    return new Categoria(model.id, model.nombre);
  }

  async findAll(): Promise<Categoria[]> {
    const models = await CategoriaModel.findAll();
    return models.map((m) => new Categoria(m.id, m.nombre));
  }
}
