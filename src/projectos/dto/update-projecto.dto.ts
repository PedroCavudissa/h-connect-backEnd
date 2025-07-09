import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectoDto } from './create-projecto.dto';

export class UpdateProjectoDto extends PartialType(CreateProjectoDto) {}
