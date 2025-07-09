import { Controller, Post, Body, Param, Patch, Get , Delete} from '@nestjs/common';
import { ConexaoService } from './conexao.service';

@Controller('conexoes')
export class ConexaoController {
  constructor(private readonly conexaoService: ConexaoService) {}

  @Post()
  criar(@Body() body: { usuario_id: number; conectado_id: number }) {
    return this.conexaoService.criarPedido(body.usuario_id, body.conectado_id);
  }

  @Get('pendentes/:id')
  listarPendentes(@Param('id') id: number) {
    return this.conexaoService.listarPendentes(id);
  }

  @Get('aceitas/:id')
  listarAceitas(@Param('id') id: number) {
    return this.conexaoService.listarAceitas(id);
  }

  @Patch(':id/aceitar')
  aceitar(@Param('id') id: number) {
    return this.conexaoService.aceitar(id);
  }

  @Patch(':id/rejeitar')
  rejeitar(@Param('id') id: number) {
    return this.conexaoService.rejeitar(id);
  }
  @Get(':id')
findByUsuario(@Param('id') id: number) {
  return this.conexaoService.buscarPorUsuario(id);
}
@Delete(':id/')
remover(@Param('id') id: number) {
  return this.conexaoService.remover(id);
}
@Get('relacoes/:usuarioId')
listarRelacoes(@Param('usuarioId') usuarioId: number) {
  return this.conexaoService.listarRelacoesDoUsuario(usuarioId);
}


}