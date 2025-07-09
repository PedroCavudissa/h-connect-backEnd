import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PublicacaoService } from './publicacao.service';
import { CriarPublicacaoDto, EditarPublicacaoDto } from './dto/create-publicacao.dto';
import { CurtidaService } from 'src/curtida/curtida.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('publicacao')
export class PublicacaoController {
  constructor(private readonly publicacaoService: PublicacaoService,private readonly  curtidaService:CurtidaService ) {}

  

  @Get()
 findAll() {
    return this.publicacaoService.listarTodas();  
  }

@Get('recentes')
findRecentes(@Req() req) {
  const usuarioId = req.user?.sub;
  return this.publicacaoService.listarRecentesPorUsuario(usuarioId);
}

  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    const pub = await this.publicacaoService.buscarPorId(id);
    if (!pub) throw new NotFoundException('Publicação não encontrada');
    return pub;
  }

  @Patch(':id')
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarPublicacaoDto,
  ) {
    return this.publicacaoService.editar(id, dto);
  }

  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    return this.publicacaoService.remover(id);
  }

  @Get('status/:publicacaoId/:usuarioId')
async statusCurtida(
  @Param('publicacaoId', ParseIntPipe) publicacaoId: number,
  @Param('usuarioId', ParseIntPipe) usuarioId: number,
) {
  const total = await this.curtidaService.contarPorPublicacao(publicacaoId);
  const curtiu = await this.curtidaService.verificarSeUsuarioCurtiu(usuarioId, publicacaoId);
  return { total, curtiu };
}


@Post()
criar(@Body() dto: CriarPublicacaoDto) {
  console.log('Recebido:', dto);
  return this.publicacaoService.criar(dto);
}


}
