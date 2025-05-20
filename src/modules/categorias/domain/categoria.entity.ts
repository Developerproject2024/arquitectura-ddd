export class Categoria {
  constructor(
    public readonly id: number,
    public nombre: string,
  ) {
    if (!nombre || nombre.length === 0) {
      throw new Error('El nombre es obligatorio');
    }
  }

  rename(nombre: string) {
    if (nombre.length < 3) throw new Error('Nombre muy corto');
    this.nombre = nombre;
  }
}
