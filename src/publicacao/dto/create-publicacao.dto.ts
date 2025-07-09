export class CriarPublicacaoDto {
    conteudo: string;
    imagem?: string;
    usuarioId: number;
  }
  
  export class EditarPublicacaoDto {
    conteudo?: string;
    imagem?: string;
  }