import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curtida } from './entities/curtida.entity';
import { Repository } from 'typeorm';
import { CriarCurtidaDto } from './dto/create-curtida.dto';

@Injectable()
export class CurtidaService {
  constructor(
    @InjectRepository(Curtida)
    private readonly curtidaRepo: Repository<Curtida>,
  ) {}

  async contarPorPublicacao(publicacaoId: number): Promise<number> {
    return this.curtidaRepo.count({ where: { publicacao: { id: publicacaoId } } });
  }
  
  async verificarSeUsuarioCurtiu(usuarioId: number, publicacaoId: number): Promise<boolean> {
    const curtida = await this.curtidaRepo.findOne({
      where: { usuario: { id: usuarioId }, publicacao: { id: publicacaoId } },
    });
    return !!curtida;
  }
  

  async curtir(dto: CriarCurtidaDto) {
    const existe = await this.curtidaRepo.findOne({
      where: {
        usuario: { id: dto.usuarioId },
        publicacao: { id: dto.publicacaoId },
      },
    });

    if (existe) return existe;

    const nova = this.curtidaRepo.create({
      usuario: { id: dto.usuarioId },
      publicacao: { id: dto.publicacaoId },
    });

    return this.curtidaRepo.save(nova);
  }

  async descurtir(usuarioId: number, publicacaoId: number) {
    return this.curtidaRepo.delete({
      usuario: { id: usuarioId },
      publicacao: { id: publicacaoId },
    });
  }


async listarPorPublicacao(publicacaoId: number): Promise<Curtida[]> {
  return this.curtidaRepo.find({
    where: { publicacao: { id: publicacaoId } },
    relations: ['usuario'], 
  });
}

}
