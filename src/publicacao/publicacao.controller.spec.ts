import { Test, TestingModule } from '@nestjs/testing';
import { PublicacaoController } from './publicacao.controller';
import { PublicacaoService } from './publicacao.service';

describe('PublicacaoController', () => {
  let controller: PublicacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicacaoController],
      providers: [PublicacaoService],
    }).compile();

    controller = module.get<PublicacaoController>(PublicacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
