import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { Client } from 'src/client/entities/client.entity';
import { CuttingOrder, CuttingOrderStatus } from './entities/order.entity';
import { CreateCuttingOrderDto, UpdateCuttingOrderDto } from './dto/create-order.dto';

@Injectable()
export class CuttingOrderService {
  constructor(
    @InjectRepository(CuttingOrder)
    private readonly orderRepo: Repository<CuttingOrder>,

    @InjectRepository(CuttingJob)
    private readonly jobRepo: Repository<CuttingJob>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateCuttingOrderDto): Promise<CuttingOrder> {
    // Найти или создать клиента
    let client = await this.clientRepo.findOne({
      where: { phone: dto.clientPhone },
    });

    if (!client) {
      client = this.clientRepo.create({
        phone: dto.clientPhone,
        name: dto.clientName || 'Не указано',
        email: dto.clientEmail,
      });
      await this.clientRepo.save(client);
    }

    // Найти резку
    const job = await this.jobRepo.findOne({ where: { id: dto.cuttingJobId } });
    if (!job) throw new NotFoundException('CuttingJob не найден');

    // Создать заказ резки
    const order = this.orderRepo.create({
      cuttingJob: job,
      client,
      quantity: dto.quantity,
      status: CuttingOrderStatus.NEW,
    });

    return this.orderRepo.save(order);
  }

   findAll() {
    return this.orderRepo.find({ order: { createdAt: 'DESC' }, relations: { client: true, cuttingJob: {
      deviceType: true,
      material: true,
      armorType: true
    } } });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({ where: { id }, relations: { client: true }});
    if (!order) throw new NotFoundException('CuttingOrder не найден');
    return order;
  }

  async update(id: number, dto: UpdateCuttingOrderDto) {
    const order = await this.findOne(id);

    if (dto.cuttingJobId) {
      const job = await this.jobRepo.findOne({ where: { id: dto.cuttingJobId } });
      if (!job) throw new NotFoundException('CuttingJob не найден');
      order.cuttingJob = job;
    }

    if (dto.clientPhone) {
      let client = await this.clientRepo.findOne({ where: { phone: dto.clientPhone } });
      if (!client) {
        client = this.clientRepo.create({
          phone: dto.clientPhone,
          name: dto.clientName || 'Не указано',
          email: dto.clientEmail,
        });
        await this.clientRepo.save(client);
      }
      order.client = client;
    }

    if (dto.quantity !== undefined) order.quantity = dto.quantity;
    if (dto.status) order.status = dto.status;

    return this.orderRepo.save(order);
  }

  async updateStatus(id: number, status: CuttingOrderStatus) {
    const order = await this.findOne(id);
    order.status = status;

    if (status === CuttingOrderStatus.IN_PROGRESS) order.startedAt = new Date();
    if (status === CuttingOrderStatus.DONE || status === CuttingOrderStatus.REWORK)
      order.finishedAt = new Date();

    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }

}
