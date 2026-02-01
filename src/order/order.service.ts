import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CuttingOrder, CuttingOrderStatus } from './entities/order.entity';
import { CreateCuttingOrderDto } from './dto/create-order.dto';
import { UpdateCuttingOrderDto } from './dto/update-order.dto';
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';

@Injectable()
export class CuttingService {
  constructor(
    @InjectRepository(CuttingOrder)
    private readonly repo: Repository<CuttingOrder>,
  ) { }

  async create(dto: CreateCuttingOrderDto) {
    // Находим полный объект CuttingJob
    const cuttingJob = await this.repo.manager.findOneOrFail(
      CuttingJob,
      { where: { id: dto.cuttingJobId } },
    );

    const order = this.repo.create({
      cuttingJob,
      quantity: dto.quantity || 1,
    });

    return this.repo.save(order);
  }

  findAll() {
    return this.repo.find({
      relations: ['cuttingJob'], // eager=true можно убрать, если не нужен
      order: { id: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['cuttingJob'],
    });
  }

  async update(id: number, dto: UpdateCuttingOrderDto) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) return null;

    if (dto.cuttingJobId) {
      order.cuttingJob = await this.repo.manager.findOneOrFail(CuttingJob, {
        where: { id: dto.cuttingJobId },
      });
    }

    if (dto.quantity !== undefined) order.quantity = dto.quantity;

    return this.repo.save(order);
  }

  async updateStatus(id: number, status: CuttingOrderStatus) {
    const order = await this.repo.findOneBy({ id });

    if (!order) throw new Error('Заказ не найден');

    if (status === CuttingOrderStatus.IN_PROGRESS) {
      order.startedAt = new Date();
    }

    if (status === CuttingOrderStatus.DONE) {
      order.finishedAt = new Date();
    }

    order.status = status;

    return this.repo.save(order);
  }



  remove(id: number) {
    return this.repo.delete(id);
  }
}
