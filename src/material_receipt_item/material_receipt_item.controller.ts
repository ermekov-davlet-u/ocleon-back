import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialReceiptItemService } from './material_receipt_item.service';
import { CreateMaterialReceiptItemDto } from './dto/create-material_receipt_item.dto';
import { UpdateMaterialReceiptItemDto } from './dto/update-material_receipt_item.dto';

@Controller('material-receipt-item')
export class MaterialReceiptItemController {
  constructor(private readonly materialReceiptItemService: MaterialReceiptItemService) {}

  @Post()
  create(@Body() createMaterialReceiptItemDto: CreateMaterialReceiptItemDto) {
    return this.materialReceiptItemService.create(createMaterialReceiptItemDto);
  }

  @Get()
  findAll() {
    return this.materialReceiptItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialReceiptItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialReceiptItemDto: UpdateMaterialReceiptItemDto) {
    return this.materialReceiptItemService.update(+id, updateMaterialReceiptItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialReceiptItemService.remove(+id);
  }
}
