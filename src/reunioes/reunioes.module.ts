import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReunioesService } from './reunioes.service';
import { ReunioesController } from './reunioes.controller';
import { Reuniao } from './entities/reunioes.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reuniao, Usuario]) 
  ],
  controllers: [ReunioesController],
  providers: [ReunioesService],
})
export class ReunioesModule {}
