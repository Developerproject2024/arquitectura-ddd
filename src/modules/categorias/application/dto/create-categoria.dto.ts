import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  nombre: string;
}