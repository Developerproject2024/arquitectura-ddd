import { Column, HasMany, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'categorias' })
export class CategoriaModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  nombre: string;

//   @HasMany(() => PeliculaModel)
//   peliculas: PeliculaModel[];
}
