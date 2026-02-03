import { Injectable } from '@nestjs/common';
import { CreateMaterialReceiptItemDto } from './dto/create-material_receipt_item.dto';
import { UpdateMaterialReceiptItemDto } from './dto/update-material_receipt_item.dto';

@Injectable()
export class MaterialReceiptItemService {
  create(createMaterialReceiptItemDto: CreateMaterialReceiptItemDto) {
    return 'This action adds a new materialReceiptItem';
  }

  findAll() {
    return `This action returns all materialReceiptItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materialReceiptItem`;
  }

  update(id: number, updateMaterialReceiptItemDto: UpdateMaterialReceiptItemDto) {
    return `This action updates a #${id} materialReceiptItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialReceiptItem`;
  }
}
