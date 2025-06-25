import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { ConexaoModule } from './conexao/conexao.module';
import {Conexao} from './conexao/entities/conexao.entity'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'h_connect',
      entities: [Usuario, Role,Conexao],
      synchronize: true, // usar apenas em desenvolvimento!
    }),
    UsuarioModule,
    RoleModule,AuthModule, ConexaoModule
  ],
})
export class AppModule {}
