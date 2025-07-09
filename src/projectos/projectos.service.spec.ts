import { Test, TestingModule } from '@nestjs/testing';
import { ProjectosService } from './projectos.service';

describe('ProjectosService', () => {
  let service: ProjectosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectosService],
    }).compile();

    service = module.get<ProjectosService>(ProjectosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
