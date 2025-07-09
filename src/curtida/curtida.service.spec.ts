import { Test, TestingModule } from '@nestjs/testing';
import { CurtidaService } from './curtida.service';

describe('CurtidaService', () => {
  let service: CurtidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurtidaService],
    }).compile();

    service = module.get<CurtidaService>(CurtidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
