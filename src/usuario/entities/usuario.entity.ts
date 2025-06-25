import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from "typeorm";
import { Conexao } from '../../conexao/entities/conexao.entity';


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
  
  
  
}
