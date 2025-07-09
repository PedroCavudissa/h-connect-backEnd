import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curtida } from './entities/curtida.entity';
import { CurtidaService } from './curtida.service';
import { CurtidaController } from './curtida.controller';
import { Publicacao } from 'src/publicacao/entities/publicacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curtida,Publicacao])], 
  controllers: [CurtidaController],
  providers: [CurtidaService],
  exports: [CurtidaService],
})
export class CurtidaModule {}
