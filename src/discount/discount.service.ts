import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepo: Repository<Discount>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  // ✅ Создание скидки (общая или клиентская)
  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    let client: Client | null = null;

    if (createDiscountDto.clientId) {
      client = await this.clientRepo.findOneBy({
        id: createDiscountDto.clientId,
      });

      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }

    const discount = this.discountRepo.create({
      name: createDiscountDto.name,
      type: createDiscountDto.type,
      value: createDiscountDto.value,
      description: createDiscountDto.description,
      startDate: createDiscountDto.startDate,
      endDate: createDiscountDto.endDate,
      isActive: createDiscountDto.isActive ?? true,
      client: client ?? undefined,
    });

    return this.discountRepo.save(discount);
  }

  // ✅ Получить все скидки
  async findAll(): Promise<Discount[]> {
    return this.discountRepo.find({
      relations: {
        client: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // ✅ Получить одну
  async findOne(id: number): Promise<Discount> {
    const discount = await this.discountRepo.findOne({
      where: { id },
      relations: {
        client: true,
      },
    });

    if (!discount) {
      throw new NotFoundException('Discount not found');
    }

    return discount;
  }

  // ✅ Обновить
  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const discount = await this.findOne(id);

    if (updateDiscountDto.clientId) {
      const client = await this.clientRepo.findOneBy({
        id: updateDiscountDto.clientId,
      });

      if (!client) {
        throw new NotFoundException('Client not found');
      }

      discount.client = client;
    }

    Object.assign(discount, updateDiscountDto);

    return this.discountRepo.save(discount);
  }

  // ✅ Удалить
  async remove(id: number) {
    const discount = await this.findOne(id);
    return this.discountRepo.remove(discount);
  }
}
