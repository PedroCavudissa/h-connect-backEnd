import { PartialType } from '@nestjs/mapped-types';
import { CriarPublicacaoDto } from './create-publicacao.dto';

export class UpdatePublicacaoDto extends PartialType(CriarPublicacaoDto) {}
