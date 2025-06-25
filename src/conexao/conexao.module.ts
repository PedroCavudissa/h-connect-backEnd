import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conexao } from './entities/conexao.entity';
import { Usuario } from '../usuario/entities/usuario.entity'; 

import { ConexaoService } from './conexao.service';
import { ConexaoController } from './conexao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conexao, Usuario])],
  controllers: [ConexaoController],
  providers: [ConexaoService],
})
export class ConexaoModule {}
