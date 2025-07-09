import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Publicacao } from 'src/publicacao/entities/publicacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario,Publicacao])],
  controllers: [ComentarioController],
  providers: [ComentarioService],
})
export class ComentarioModule {}
