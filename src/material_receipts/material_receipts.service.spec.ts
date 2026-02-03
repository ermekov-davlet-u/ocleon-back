import { Test, TestingModule } from '@nestjs/testing';
import { MaterialReceiptsService } from './material_receipts.service';

describe('MaterialReceiptsService', () => {
  let service: MaterialReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialReceiptsService],
    }).compile();

    service = module.get<MaterialReceiptsService>(MaterialReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
