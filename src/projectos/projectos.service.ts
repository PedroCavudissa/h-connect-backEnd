import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projecto } from './entities/projecto.entity';
import { Repository } from 'typeorm';
import { CreateProjectoDto } from './dto/create-projecto.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ProjectosService {
  constructor(
    @InjectRepository(Projecto)
    private projectoRepo: Repository<Projecto>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async criar(dto: CreateProjectoDto): Promise<Projecto> {
    const criador = await this.usuarioRepo.findOneBy({ id: dto.id_criador });

    if (!criador) throw new Error('Criador não encontrado');

    const participantes = dto.participantes?.length
      ? await this.usuarioRepo.findByIds(dto.participantes)
      : [];

    const novo = this.projectoRepo.create({
      nome: dto.nome,
      descricao: dto.descricao,
      status: dto.status || 'ativo',
      criador,
      participantes,
    });

    return await this.projectoRepo.save(novo);
  }

  async listarPorUsuario(usuarioId: number): Promise<Projecto[]> {
    return this.projectoRepo
      .createQueryBuilder('projecto')
      .leftJoinAndSelect('projecto.criador', 'criador')
      .leftJoinAndSelect('projecto.participantes', 'participante')
      .where('criador.id = :usuarioId', { usuarioId })
      .orWhere('participante.id = :usuarioId', { usuarioId })
      .orderBy('projecto.dataCriacao', 'DESC')
      .getMany();
  }
}
