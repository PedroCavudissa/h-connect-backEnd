import { Test, TestingModule } from '@nestjs/testing';
import { CurtidaController } from './curtida.controller';
import { CurtidaService } from './curtida.service';

describe('CurtidaController', () => {
  let controller: CurtidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurtidaController],
      providers: [CurtidaService],
    }).compile();

    controller = module.get<CurtidaController>(CurtidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
