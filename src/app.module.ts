import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core'; // <-- aqui

import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { ConexaoModule } from './conexao/conexao.module';
import { Conexao } from './conexao/entities/conexao.entity';
import { ProjectosModule } from './projectos/projectos.module';
import { Projecto } from './projectos/entities/projecto.entity';
import { ReunioesModule } from './reunioes/reunioes.module';
import { PublicacaoModule } from './publicacao/publicacao.module';
import { CurtidaModule } from './curtida/curtida.module';
import { ComentarioModule } from './comentario/comentario.module';
import { JwtAuthGuard } from './auth/guards/jw.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'h_connect',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuarioModule,
    RoleModule,
    AuthModule,
    ConexaoModule,
    ProjectosModule,
    ReunioesModule,
    PublicacaoModule,
    CurtidaModule,
    ComentarioModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
