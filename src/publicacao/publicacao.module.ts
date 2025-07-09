import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacao } from './entities/publicacao.entity';
import { PublicacaoService } from './publicacao.service';
import { PublicacaoController } from './publicacao.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curtida } from 'src/curtida/entities/curtida.entity';
import { CurtidaModule } from '../curtida/curtida.module';
import { ConexaoModule } from 'src/conexao/conexao.module';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacao,Usuario,Curtida]), CurtidaModule,ConexaoModule], 
  
  controllers: [PublicacaoController],
  providers: [PublicacaoService],
})
export class PublicacaoModule {}
