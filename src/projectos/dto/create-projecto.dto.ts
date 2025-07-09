export class CreateProjectoDto {
  nome: string;
  descricao: string;
  id_criador: number;
  participantes: number[];
  status: string;
}
