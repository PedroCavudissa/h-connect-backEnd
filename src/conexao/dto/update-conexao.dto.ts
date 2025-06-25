import { PartialType } from '@nestjs/mapped-types';
import { CreateConexaoDto } from './create-conexao.dto';

export class UpdateConexaoDto extends PartialType(CreateConexaoDto) {}
