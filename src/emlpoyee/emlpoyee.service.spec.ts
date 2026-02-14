import { Test, TestingModule } from '@nestjs/testing';
import { EmlpoyeeService } from './emlpoyee.service';

describe('EmlpoyeeService', () => {
  let service: EmlpoyeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmlpoyeeService],
    }).compile();

    service = module.get<EmlpoyeeService>(EmlpoyeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
