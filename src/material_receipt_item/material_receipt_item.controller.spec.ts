import { Test, TestingModule } from '@nestjs/testing';
import { MaterialReceiptItemController } from './material_receipt_item.controller';
import { MaterialReceiptItemService } from './material_receipt_item.service';

describe('MaterialReceiptItemController', () => {
  let controller: MaterialReceiptItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialReceiptItemController],
      providers: [MaterialReceiptItemService],
    }).compile();

    controller = module.get<MaterialReceiptItemController>(MaterialReceiptItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
