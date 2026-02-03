// material-receipt.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateMaterialReceiptDto } from './dto/create-material_receipt.dto';
import { MaterialReceiptService } from './material_receipts.service';

@Controller('material-receipts')
export class MaterialReceiptController {
  constructor(private readonly service: MaterialReceiptService) {}

  @Post()
  create(@Body() dto: CreateMaterialReceiptDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }
}
