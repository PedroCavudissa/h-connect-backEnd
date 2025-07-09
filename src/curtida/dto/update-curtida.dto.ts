import { PartialType } from '@nestjs/mapped-types';
import { CriarCurtidaDto } from './create-curtida.dto';

export class UpdateCurtidaDto extends PartialType(CriarCurtidaDto) {}
