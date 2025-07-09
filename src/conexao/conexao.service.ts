import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conexao } from './entities/conexao.entity';

@Injectable()
export class ConexaoService {
  constructor(
    @InjectRepository(Conexao)
    private conexaoRepo: Repository<Conexao>,
  ) {}

  async criarPedido(usuario_id: number, conectado_id: number) {
    const existe = await this.conexaoRepo.findOne({
      where: [
        { usuario: { id: usuario_id }, conectado: { id: conectado_id } },
        { usuario: { id: conectado_id }, conectado: { id: usuario_id } },
      ],
    });

    if (existe) throw new ConflictException('Já existe pedido ou conexão.');

    const conexao = this.conexaoRepo.create({
      usuario: { id: usuario_id },
      conectado: { id: conectado_id },
      status: 'pendente',
    });

    return this.conexaoRepo.save(conexao);
  }

  async listarPendentes(userId: number) {
    return this.conexaoRepo.find({
      where: {
        conectado: { id: userId },
        status: 'pendente',
      },
      relations: ['usuario'],
    });
  }

  async listarAceitas(userId: number) {
    return this.conexaoRepo.find({
      where: [
        {
          usuario: { id: userId },
          status: 'aceito',
        },
        {
          conectado: { id: userId },
          status: 'aceito',
        },
      ],
      relations: ['usuario', 'conectado'],
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

  async buscarPorUsuario(id: number) {
    return this.conexaoRepo.find({
      where: [
        { usuario: { id } },
        { conectado: { id } },
      ],
      relations: ['usuario', 'conectado'],
    });
  }

  async remover(id: number) {
    const result = await this.conexaoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Conexão não encontrada ou já removida');
    }
    return { message: 'Conexão removida com sucesso' };
  }

  async listarRelacoesDoUsuario(usuarioId: number) {
    const conexoes = await this.conexaoRepo.find({
      where: [
        { usuario: { id: usuarioId } },
        { conectado: { id: usuarioId } },
      ],
      relations: ['usuario', 'conectado'],
    });
  
    return conexoes.map(c => {
      const outro = c.usuario.id === usuarioId ? c.conectado : c.usuario;
      return {
        id: outro.id,
        nome: outro.nome, 
        status: c.status,
      };
    });
  }
  
}
