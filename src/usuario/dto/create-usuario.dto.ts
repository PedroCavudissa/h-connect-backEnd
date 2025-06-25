import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  areaFormacao: string;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  instituicao: string;

  @IsNotEmpty()
  role_id: number;
}
