import { Test, TestingModule } from '@nestjs/testing';
import { CuttingJobController } from './cutting-job.controller';
import { CuttingJobService } from './cutting-job.service';

describe('CuttingJobController', () => {
  let controller: CuttingJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuttingJobController],
      providers: [CuttingJobService],
    }).compile();

    controller = module.get<CuttingJobController>(CuttingJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
