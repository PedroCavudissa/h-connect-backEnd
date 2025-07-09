import { Controller, Get, Patch, Param, Body, Post} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; 
import { OneToMany } from 'typeorm';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller("usuarios")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  @Public()
  @Post()
  async criarUsuario(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }
  @Patch(':id')
async atualizar(@Param('id') id: number, @Body() dto: UpdateUsuarioDto) {
  return this.usuarioService.update(id, dto);
}

@Patch(':id/senha')
async atualizarSenha(@Param('id') id: number, @Body('senha') novaSenha: string) {
  return this.usuarioService.updatePassword(id, novaSenha);
}

@Get(':id')
async buscarPorId(@Param('id') id: number) {
  return this.usuarioService.findById(id);
}
@Get('outros/:id')
async buscarOutros(@Param('id') id: number) {
  return this.usuarioService.buscarOutros(id);
}



}
