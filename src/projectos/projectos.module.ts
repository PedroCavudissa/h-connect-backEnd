import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectosController } from './projectos.controller';
import { ProjectosService } from './projectos.service';
import { Projecto } from './entities/projecto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projecto, Usuario])],
  controllers: [ProjectosController],
  providers: [ProjectosService],
})
export class ProjectosModule{}
