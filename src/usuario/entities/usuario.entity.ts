import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany ,JoinTable} from "typeorm";
import { Conexao } from '../../conexao/entities/conexao.entity';
import { Projecto } from "../../projectos/entities/projecto.entity";
import { Reuniao } from "../../reunioes/entities/reunioes.entity";
import { Publicacao } from "src/publicacao/entities/publicacao.entity";
import { Comentario } from "src/comentario/entities/comentario.entity";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  areaFormacao: string;

  @Column()
  senha: string;

  @Column()
  instituicao: string;

  @Column({ type: "datetime" })
  dataCadastro: Date;

  @Column()
  role_id: number;

  @OneToMany(() => Conexao, conexao => conexao.usuario)
  solicitacoesEnviadas: Conexao[];
  
  @OneToMany(() => Conexao, conexao => conexao.conectado)
  solicitacoesRecebidas: Conexao[];

 
  @OneToMany(() => Reuniao, reuniao => reuniao.criador)
  reunioesCriadas: Reuniao[];
  
  @ManyToMany(() => Reuniao, reuniao => reuniao.participantes)
  reunioesParticipadas: Reuniao[];

  @OneToMany(() => Publicacao, publicacao => publicacao.usuario)
publicacao: Publicacao[];

@OneToMany(() => Comentario, comentario => comentario.usuario)
comentarios: Comentario[];


@ManyToMany(() => Projecto, projeto => projeto.participantes)
  projectosParticipa: Projecto[];

  @OneToMany(() => Projecto, projeto => projeto.criador)
  projectosCriados: Projecto[];
}
