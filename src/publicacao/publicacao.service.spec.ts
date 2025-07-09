import { Test, TestingModule } from '@nestjs/testing';
import { PublicacaoService } from './publicacao.service';

describe('PublicacaoService', () => {
  let service: PublicacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicacaoService],
    }).compile();

    service = module.get<PublicacaoService>(PublicacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
