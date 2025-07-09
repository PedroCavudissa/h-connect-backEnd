import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpException, Put
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CriarComentarioDto } from './dto/create-comentario.dto';


@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async criar(@Body() dto: CriarComentarioDto) {
  
    try {
    
      return await this.comentarioService.criar(dto);
    } catch (e) {
      throw new HttpException('Erro ao criar reunião: ' + e.message, 400);
    }
  }

  @Get('publicacao/:id')
  async listarPorPublicacao(@Param('id') id: number) {
    try {
      const comentarios = await this.comentarioService.listarPorPublicacao(id);
      return comentarios;
    } catch (error) {
      throw new NotFoundException('Não foi possível encontrar comentários para essa publicação.');
    }
  }
  @Put(':id')
async editar(@Param('id', ParseIntPipe) id: number, @Body('conteudo') conteudo: string) {
  return this.comentarioService.editar(id, conteudo);
}


  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    const resultado = await this.comentarioService.remover(id);
    if (!resultado.affected) throw new NotFoundException('Comentário não encontrado');
    return { mensagem: 'Comentário removido com sucesso' };
  }
}
