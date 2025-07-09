import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Repository } from 'typeorm';
import { CriarComentarioDto } from './dto/create-comentario.dto';
import { Publicacao } from 'src/publicacao/entities/publicacao.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepo: Repository<Comentario>,
    @InjectRepository(Publicacao)
    private publicacaoRepository: Repository<Publicacao>
  
  ) {}

  async criar(dto: CriarComentarioDto) {
    const publicacao = await this.publicacaoRepository.findOneBy({ id: dto.publicacaoId });
    if (!publicacao) throw new Error('Publicação não encontrada');
  
    const comentario = this.comentarioRepo.create({
      conteudo: dto.conteudo,
      dataCriacao: new Date(),
      imagem: dto.imagem,
      publicacao: publicacao,
      usuario: { id: dto.usuarioId } as Usuario 
    });
  
    return this.comentarioRepo.save(comentario);
  }
  

  async listarPorPublicacao(publicacaoId: number) {
    return this.comentarioRepo.find({
      where: { publicacao: { id: publicacaoId } },
      relations: ['usuario'], 
      order: { dataCriacao: 'DESC' },
    });
  }
  
  async editar(id: number, conteudo: string) {
    const comentario = await this.comentarioRepo.findOneBy({ id });
    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado');
    }
    comentario.conteudo = conteudo;
    return this.comentarioRepo.save(comentario);
  }
  

  async remover(id: number) {
    return this.comentarioRepo.delete(id);
  }
}
