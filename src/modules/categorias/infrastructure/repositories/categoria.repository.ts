import { Categoria } from "@modules/categorias/domain/entities/categoria.entity";
import { ICategoriaRepository } from "@modules/categorias/domain/repositories/categoria.repository.interface";
import { Injectable } from "@nestjs/common";
import { CategoriaModel } from "../model/categoria.model";

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
