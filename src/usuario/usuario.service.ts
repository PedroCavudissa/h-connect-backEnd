import { Injectable } from '@nestjs/common'; 
import { Not } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
  async findById(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }
  
  
  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, dto);
    return this.findById(id);
  }
  
  async updatePassword(id: number, senha: string) {
    await this.usuarioRepository.update(id, { senha });
    return { message: 'Senha atualizada com sucesso' };
  }
  
 
  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const novoUsuario = this.usuarioRepository.create({
      ...dto,
      senha: dto.senha, 
      dataCadastro: new Date(),
    });
  
    return this.usuarioRepository.save(novoUsuario);
  }

  async buscarOutros(idAtual: number): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { id: Not(idAtual) },
      select: ['id', 'nome'],
    });
  }
  
  
  

 
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }
 
  }

