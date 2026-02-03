// material-receipt.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialReceipt } from './entities/material_receipt.entity';
import { MaterialReceiptItem } from 'src/material_receipt_item/entities/material_receipt_item.entity';
import { Material } from 'src/material/entities/material.entity';
import { CreateMaterialReceiptDto } from './dto/create-material_receipt.dto';

@Injectable()
export class MaterialReceiptService {
  constructor(
    @InjectRepository(MaterialReceipt)
    private receiptRepo: Repository<MaterialReceipt>,
    @InjectRepository(MaterialReceiptItem)
    private itemRepo: Repository<MaterialReceiptItem>,
    @InjectRepository(Material)
    private materialRepo: Repository<Material>,
  ) {}

  async create(dto: CreateMaterialReceiptDto) {
    const receipt = this.receiptRepo.create({ number: dto.number });
    receipt.items = [];

    for (const itemDto of dto.items) {
      const material = await this.materialRepo.findOneBy({
        id: itemDto.materialId,
      });
      if (!material)
        throw new Error(`Материал с id ${itemDto.materialId} не найден`);

      const item = this.itemRepo.create({
        material,
        price: itemDto.price,
        quantity: itemDto.quantity,
      });

      receipt.items.push(item);
    }

    return this.receiptRepo.save(receipt);
  }

  findAll() {
    return this.receiptRepo.find({ relations: ['items', 'items.material'] });
  }

  findOne(id: number) {
    return this.receiptRepo.findOne({
      where: { id },
      relations: ['items', 'items.material'],
    });
  }
}
