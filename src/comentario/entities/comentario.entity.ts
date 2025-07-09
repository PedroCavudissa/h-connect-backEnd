import { Publicacao } from 'src/publicacao/entities/publicacao.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  conteudo: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @Column({ nullable: true, length: 45 })
  imagem: string;
  @ManyToOne(() => Publicacao, publicacao => publicacao.comentarios, { onDelete: 'CASCADE' })
  publicacao: Publicacao;

  
// comentario.entity.ts
@ManyToOne(() => Usuario, usuario => usuario.comentarios)
@JoinColumn({ name: 'usuarioId' })
usuario: Usuario;

}
