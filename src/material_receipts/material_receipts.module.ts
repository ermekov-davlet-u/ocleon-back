import { MaterialReceipt } from 'src/material_receipts/entities/material_receipt.entity';
import { Module } from '@nestjs/common';
import { MaterialReceiptController } from './material_receipts.controller';
import { MaterialReceiptService } from './material_receipts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialReceiptItem } from 'src/material_receipt_item/entities/material_receipt_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialReceipt, MaterialReceiptItem])],
  controllers: [MaterialReceiptController],
  providers: [MaterialReceiptService],
})
export class MaterialReceiptsModule {}
