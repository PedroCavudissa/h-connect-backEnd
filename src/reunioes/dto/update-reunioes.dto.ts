import { PartialType } from '@nestjs/mapped-types';
import { AtualizarReuniaoDto } from './create-reunioes.dto';

export class UpdateReunioesDto extends PartialType(AtualizarReuniaoDto) {}
