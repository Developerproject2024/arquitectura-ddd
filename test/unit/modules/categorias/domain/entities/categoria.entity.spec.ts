import { Categoria } from "@modules/categorias/domain/entities/categoria.entity";

describe('Categoria Entity', () => {
  it('debería crear una categoría válida', () => {
    const categoria = new Categoria(1, 'Acción');
    expect(categoria.id).toBe(1);
    expect(categoria.nombre).toBe('Acción');
  });

  it('debería lanzar error si el nombre está vacío', () => {
    expect(() => new Categoria(1, '')).toThrow('El nombre es obligatorio');
    expect(() => new Categoria(1, undefined as any)).toThrow('El nombre es obligatorio');
  });

  it('debería renombrar la categoría si el nombre es válido', () => {
    const categoria = new Categoria(1, 'Acción');
    categoria.rename('Comedia');
    expect(categoria.nombre).toBe('Comedia');
  });

  it('debería lanzar error si el nuevo nombre es muy corto', () => {
    const categoria = new Categoria(1, 'Acción');
    expect(() => categoria.rename('AB')).toThrow('Nombre muy corto');
  });
});