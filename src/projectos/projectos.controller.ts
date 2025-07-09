import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ProjectosService } from './projectos.service';
import { CreateProjectoDto } from './dto/create-projecto.dto';
import { JwtAuthGuard } from 'src/auth/dto/jw.guard';

@UseGuards(JwtAuthGuard)
@Controller('projectos')
export class ProjectosController {
  constructor(private readonly projectosService: ProjectosService) {}

  @Post()
  async criar(@Body() dto: CreateProjectoDto) {
    try {
      return await this.projectosService.criar(dto);
    } catch (e) {
      throw new HttpException('Erro ao criar projecto: ' + e.message, 400);
    }
  }

  @Get(':id')
  async listarPorUsuario(@Param('id') id: number) {
    return this.projectosService.listarPorUsuario(Number(id));
  }
}
