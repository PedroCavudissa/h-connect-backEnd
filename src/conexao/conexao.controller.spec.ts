import { Test, TestingModule } from '@nestjs/testing';
import { ConexaoController } from './conexao.controller';
import { ConexaoService } from './conexao.service';

describe('ConexaoController', () => {
  let controller: ConexaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConexaoController],
      providers: [ConexaoService],
    }).compile();

    controller = module.get<ConexaoController>(ConexaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
