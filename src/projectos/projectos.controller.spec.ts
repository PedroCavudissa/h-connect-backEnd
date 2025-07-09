import { Test, TestingModule } from '@nestjs/testing';
import { ProjectosController } from './projectos.controller';
import { ProjectosService } from './projectos.service';

describe('ProjectosController', () => {
  let controller: ProjectosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectosController],
      providers: [ProjectosService],
    }).compile();

    controller = module.get<ProjectosController>(ProjectosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
