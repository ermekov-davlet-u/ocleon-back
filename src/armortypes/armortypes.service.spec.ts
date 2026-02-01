import { Test, TestingModule } from '@nestjs/testing';
import { ArmortypesService } from './armortypes.service';

describe('ArmortypesService', () => {
  let service: ArmortypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmortypesService],
    }).compile();

    service = module.get<ArmortypesService>(ArmortypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
