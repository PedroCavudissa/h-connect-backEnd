import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';


@Entity('projectos')
export class Projecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ default: 'ativo' })
  status: string;

  @Column({ type: 'datetime' })
dataCriacao: Date = new Date();


  @ManyToOne(() => Usuario, usuario => usuario.projectosCriados, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_criador' })
  criador: Usuario;

  @ManyToMany(() => Usuario)
  @JoinTable({
    name: 'usuarios_participa_projectos',
    joinColumn: { name: 'projecto_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
  })
  participantes: Usuario[];
}
