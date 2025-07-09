import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException, Get,
  UseGuards,
  Req, Patch,
  ParseIntPipe,
  Request
} from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { CreateReunioesDto } from './dto/create-reunioes.dto';
import { UpdateReunioesDto } from './dto/update-reunioes.dto';
import { Reuniao } from './entities/reunioes.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/dto/jw.guard';

@Controller('reunioes')
export class ReunioesController {
  constructor(private readonly reunioesService: ReunioesService) {}

  @Post()
  async criar(@Body() dto: CreateReunioesDto) {
    try {
      return await this.reunioesService.criar(dto);
    } catch (e) {
      throw new HttpException('Erro ao criar reunião: ' + e.message, 400);
    }
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editar(@Param('id') id: number, @Body() dados, @Req() req) {
    const usuarioId = req.user.userId; 
    return this.reunioesService.editar(id, dados);
  }
  
@Delete(':id')
@UseGuards(JwtAuthGuard)
async excluir(@Param('id') id: number, @Req() req) {
  const usuarioId = req.user.userId;
  return this.reunioesService.excluir(id, usuarioId);
}

  
  
  @Get(':id')
  async listarPorUsuario(@Param('id') id: number) {
    return this.reunioesService.listarReunioesDoUsuario(Number(id));
  }
  
  
}
