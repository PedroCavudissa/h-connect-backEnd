import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacao } from './entities/publicacao.entity';
import { CriarPublicacaoDto, EditarPublicacaoDto } from './dto/create-publicacao.dto';
import { Conexao } from 'src/conexao/entities/conexao.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class PublicacaoService {
  constructor(
    @InjectRepository(Publicacao)
    private readonly publicacaoRepo: Repository<Publicacao>,

    @InjectRepository(Conexao) // ✅ aqui está o certo
    private readonly conexaoRepo: Repository<Conexao>,
  ) {}

  async criar(dto: CriarPublicacaoDto) {
    const novaPublicacao = this.publicacaoRepo.create({
      conteudo: dto.conteudo,
      imagem: dto.imagem,
      usuario: { id: dto.usuarioId } as Usuario ,
    });

    return this.publicacaoRepo.save(novaPublicacao);
  }

  listarTodas() {
    return this.publicacaoRepo.find({
      relations: ['usuario'],
      order: { dataCriacao: 'DESC' },
    });
  }

  async listarRecentesPorUsuario(usuarioId: number) {
    // Isso é só um exemplo. Aqui você pode usar a lógica de conexões para filtrar autores se quiser.
    const conexoes = await this.conexaoRepo.find({
      where: [
        { usuario: { id: usuarioId } },
        { conectado: { id: usuarioId } }
      ],
      relations: ['usuario', 'conectado'],
    });

    return this.publicacaoRepo.find({
      relations: ['usuario'],
      order: { dataCriacao: 'DESC' },
      take: 5,
    });
  }

  buscarPorId(id: number) {
    return this.publicacaoRepo.findOne({
      where: { id },
      relations: ['usuario', 'comentarios', 'curtidas'],
    });
  }

  editar(id: number, dto: EditarPublicacaoDto) {
    return this.publicacaoRepo.update(id, dto);
  }

  remover(id: number) {
    return this.publicacaoRepo.delete(id);
  }
}
