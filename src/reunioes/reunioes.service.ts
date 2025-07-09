import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reuniao } from './entities/reunioes.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { AtualizarReuniaoDto, CreateReunioesDto } from './dto/create-reunioes.dto';
import { UpdateReunioesDto } from './dto/update-reunioes.dto';

@Injectable()
export class ReunioesService {
  constructor(
    @InjectRepository(Reuniao)
    private reuniaoRepo: Repository<Reuniao>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  

async criar(dto: CreateReunioesDto): Promise<Reuniao> {

  const criador = await this.usuarioRepository.findOneBy({ id: dto.criador_id });
  if (!criador) throw new Error('Criador não encontrado');

  const participantes = await this.usuarioRepository.findByIds(dto.participantesIds ?? []);

const novaReuniao = this.reuniaoRepo.create({
  titulo: dto.titulo,
  descricao: dto.descricao,
  dataHora: dto.dataHora,
  linkMeet: dto.linkMeet,
  criador: criador,
  participantes: participantes
});


  return await this.reuniaoRepo.save(novaReuniao);
}

// Editar Reunião
async editar(id: number, dados: AtualizarReuniaoDto) {
  const reuniao = await this.reuniaoRepo.findOne({
    where: { id },
    relations: ['participantes'],
  });

  if (!reuniao) {
    throw new NotFoundException('Reunião não encontrada');
  }

  // Atualiza os campos simples, se existirem
  if (dados.titulo !== undefined) reuniao.titulo = dados.titulo;
  if (dados.descricao !== undefined) reuniao.descricao = dados.descricao;
  if (dados.dataHora !== undefined) reuniao.dataHora = new Date(dados.dataHora);
  if (dados.link !== undefined) reuniao.linkMeet = dados.link;

  // Atualiza os participantes se enviados
  if (dados.participantesIds && dados.participantesIds.length > 0) {
    reuniao.participantes = await this.usuarioRepository.findByIds(dados.participantesIds);
  }

  return this.reuniaoRepo.save(reuniao);
}






 //Apagar Reunião
 async excluir(id: number, usuarioId: number) {
  const reuniao = await this.reuniaoRepo.findOne({
    where: { id },
    relations: ['criador'], 
  });

  if (!reuniao) {
    throw new NotFoundException('Reunião não encontrada.');
  }

  if (reuniao.criador.id !== usuarioId) {
    throw new ForbiddenException('Você não tem permissão para excluir esta reunião.');
  }

  await this.reuniaoRepo.remove(reuniao);
  return { mensagem: 'Reunião excluída com sucesso.' };
}



  //Listar
  async listarReunioesDoUsuario(usuarioId: number): Promise<Reuniao[]> {
    return this.reuniaoRepo
      .createQueryBuilder('reuniao')
      .leftJoinAndSelect('reuniao.criador', 'criador')
      .leftJoinAndSelect('reuniao.participantes', 'participante')
      .where('criador.id = :usuarioId', { usuarioId })
      .orWhere('participante.id = :usuarioId', { usuarioId })
      .orderBy('reuniao.dataHora', 'DESC')
      .getMany();
  }
  
  

}
