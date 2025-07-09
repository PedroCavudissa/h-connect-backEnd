import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';

import { Publicacao } from 'src/publicacao/entities/publicacao.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('curtidas')
@Unique(['usuario', 'publicacao'])
export class Curtida {



  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  usuario: Usuario;

  @ManyToOne(() => Publicacao, publicacao => publicacao.curtidas, { onDelete: 'CASCADE' })
  publicacao: Publicacao;

  @CreateDateColumn()
  dataCurtida: Date;
}
