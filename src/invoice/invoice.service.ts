import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from 'src/invoice-item/entities/invoice-item.entity';
import { Material } from 'src/material/entities/material.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,

    @InjectRepository(InvoiceItem)
    private readonly itemRepo: Repository<InvoiceItem>,

    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
  ) {}

  async create(dto: CreateInvoiceDto): Promise<Invoice> {
    const items: InvoiceItem[] = [];

    for (const item of dto.items) {
      const material = await this.materialRepo.findOne({
        where: { id: item.materialId },
      });

      if (!material) {
        throw new NotFoundException(
          `Material with id ${item.materialId} not found`,
        );
      }

      const invoiceItem = this.itemRepo.create({
        material,
        quantity: item.quantity,
        price: item.price,
      });

      items.push(invoiceItem);
    }

    const invoice = this.invoiceRepo.create({
      type: dto.type,
      comment: dto.comment,
      items,
    });

    return this.invoiceRepo.save(invoice);
  }

  findAll() {
    return this.invoiceRepo.find({
      
    });
  }

  findOne(id: number) {
    return this.invoiceRepo.findOne({ where: { id } });
  }
}
