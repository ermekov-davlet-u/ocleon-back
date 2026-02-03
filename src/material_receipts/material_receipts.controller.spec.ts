import { Test, TestingModule } from '@nestjs/testing';
import { MaterialReceiptsController } from './material_receipts.controller';
import { MaterialReceiptsService } from './material_receipts.service';

describe('MaterialReceiptsController', () => {
  let controller: MaterialReceiptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialReceiptsController],
      providers: [MaterialReceiptsService],
    }).compile();

    controller = module.get<MaterialReceiptsController>(MaterialReceiptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
