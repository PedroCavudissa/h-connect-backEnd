import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conexao } from './entities/conexao.entity';
import { Usuario } from '../usuario/entities/usuario.entity';


@Injectable()
export class ConexaoService {
  constructor(
    @InjectRepository(Conexao)
    private conexaoRepo: Repository<Conexao>,
  ) {}

  async criarPedido(usuario_id: number, conectado_id: number) {
    const existe = await this.conexaoRepo.findOne({
      where: [
        { usuario_id, conectado_id },
        { usuario_id: conectado_id, conectado_id: usuario_id },
      ],
    });

    if (existe) throw new ConflictException('Já existe pedido ou conexão.');

    const conexao = this.conexaoRepo.create({
      usuario_id,
      conectado_id,
      status: 'pendente',
    });

    return this.conexaoRepo.save(conexao);
  }

  async listarPendentes(userId: number) {
    return this.conexaoRepo.find({
      where: { conectado_id: userId, status: 'pendente' },
    });
  }

  async listarAceitas(userId: number) {
    return this.conexaoRepo.find({
      where: [
        { usuario_id: userId, status: 'aceito' },
        { conectado_id: userId, status: 'aceito' },
      ],
    });
  }

  async aceitar(id: number) {
    const c = await this.conexaoRepo.findOneBy({ id });
    if (!c) throw new NotFoundException();
    c.status = 'aceito';
    return this.conexaoRepo.save(c);
  }

  async rejeitar(id: number) {
    const c = await this.conexaoRepo.findOneBy({ id });
    if (!c) throw new NotFoundException();
    c.status = 'rejeitado';
    return this.conexaoRepo.save(c);
  }

  async buscarPorUsuario(id: number): Promise<Conexao[]> {
    return this.conexaoRepo.find({

      where: [
        { usuario_id: id },
        { conectado_id: id }
      ],
      relations: ['usuario', 'conectado']
    });
  }
  
}