import { Module } from '@nestjs/common';
import { MaterialReceiptItemService } from './material_receipt_item.service';
import { MaterialReceiptItemController } from './material_receipt_item.controller';

@Module({
  controllers: [MaterialReceiptItemController],
  providers: [MaterialReceiptItemService],
})
export class MaterialReceiptItemModule {}
