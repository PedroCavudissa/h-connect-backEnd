import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curtida } from 'src/curtida/entities/curtida.entity';
import { Comentario } from 'src/comentario/entities/comentario.entity';

@Entity('publicacao')
export class Publicacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  conteudo: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @Column({ nullable: true, length: 45 })
  imagem: string;

  @ManyToOne(() => Usuario, usuario => usuario.publicacao, { eager: true })
  usuario: Usuario;

  @OneToMany(() => Curtida, curtida => curtida.publicacao)
  curtidas: Curtida[];

  @OneToMany(() => Comentario, comentario => comentario.publicacao)
  comentarios: Comentario[];
}
