import { Test, TestingModule } from '@nestjs/testing';
import { MaterialReceiptItemService } from './material_receipt_item.service';

describe('MaterialReceiptItemService', () => {
  let service: MaterialReceiptItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialReceiptItemService],
    }).compile();

    service = module.get<MaterialReceiptItemService>(MaterialReceiptItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
