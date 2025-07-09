import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('conexoes')
export class Conexao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['pendente', 'aceito', 'rejeitado'], default: 'pendente' })
  status: 'pendente' | 'aceito' | 'rejeitado';

  @CreateDateColumn()
  dataSolicitacao: Date;

  @ManyToOne(() => Usuario, usuario => usuario.solicitacoesEnviadas)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Usuario, usuario => usuario.solicitacoesRecebidas)
  @JoinColumn({ name: 'conectado_id' })
  conectado: Usuario;
}
