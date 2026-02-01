import { Test, TestingModule } from '@nestjs/testing';
import { CuttingJobService } from './cutting-job.service';

describe('CuttingJobService', () => {
  let service: CuttingJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuttingJobService],
    }).compile();

    service = module.get<CuttingJobService>(CuttingJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
