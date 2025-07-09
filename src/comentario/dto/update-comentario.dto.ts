import { PartialType } from '@nestjs/mapped-types';
import {  CriarComentarioDto } from './create-comentario.dto';

export class UpdateComentarioDto extends PartialType(CriarComentarioDto) {}
