export class CreateReunioesDto {
    titulo: string;
    descricao?: string;
    dataHora: string; // ou Date
    linkMeet: string;
    criador_id: number;
    participantesIds: number[]; 
  }
  
  export class AtualizarReuniaoDto {
    titulo?: string;
    descricao?: string;
    dataHora?: string; 
    link?: string; 
    participantesIds?: number[];
  }
  