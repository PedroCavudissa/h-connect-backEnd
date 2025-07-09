import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  NotFoundException, Get
} from '@nestjs/common';
import { CurtidaService } from './curtida.service';
import { CriarCurtidaDto } from './dto/create-curtida.dto';


@Controller('curtidas')
export class CurtidaController {
  constructor(private readonly curtidaService: CurtidaService) {}

  @Post()
  async curtir(@Body() dto: CriarCurtidaDto) {
    return this.curtidaService.curtir(dto);
  }

  @Delete(':usuarioId/:publicacaoId')
  async descurtir(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('publicacaoId', ParseIntPipe) publicacaoId: number,
  ) {
    const result = await this.curtidaService.descurtir(usuarioId, publicacaoId);
    if (!result.affected) throw new NotFoundException('Curtida não encontrada');
    return { mensagem: 'Curtida removida com sucesso' };
  }

  
  @Get('status/:publicacaoId/:usuarioId')
async statusCurtida(
  @Param('publicacaoId', ParseIntPipe) publicacaoId: number,
  @Param('usuarioId', ParseIntPipe) usuarioId: number
) {
  const curtidas = await this.curtidaService.listarPorPublicacao(publicacaoId);
  const total = curtidas.length;
  const curtiu = curtidas.some(c => c.usuario?.id === usuarioId); 
  return { total, curtiu };
}

  
}
