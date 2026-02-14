import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from 'src/invoice-item/entities/invoice-item.entity';
import { Material } from 'src/material/entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, Material])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
