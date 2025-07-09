import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('reunioes')
export class Reuniao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'datetime' })
  dataHora: Date;

  @Column()
  linkMeet: string;

  @ManyToOne(() => Usuario, usuario => usuario.reunioesCriadas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'criador_id' })
  criador: Usuario;

  @ManyToMany(() => Usuario, usuario => usuario.reunioesParticipadas)
  @JoinTable({
    name: 'usuarios_paticipa_reunioes',
    joinColumn: { name: 'reuniao_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
  })
  participantes: Usuario[];
  
}
