import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CuttingJob } from './entities/cutting-job.entity';
import { CreateCuttingJobDto, PreviewCuttingJobDto } from './dto/create-cutting-job.dto';
import { UpdateCuttingJobDto } from './dto/update-cutting-job.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CuttingJobService {
  constructor(
    @InjectRepository(CuttingJob)
    private readonly repo: Repository<CuttingJob>,
    @InjectRepository(User)       // ← добавляем
    private readonly userRepo: Repository<User>,
  ) { }

  async create(dto: CreateCuttingJobDto) {
    // Берем первого пользователя
    const firstUser = await this.userRepo.findOne({
      where: {},
      order: { id: 'ASC' },
    });

    if (!firstUser) {
      throw new Error("Нет ни одного пользователя в базе");
    }

    const job = this.repo.create({
      armorType: { id: dto.cuttingTypeId },
      deviceType: { id: dto.deviceTypeId },
      user: { id: firstUser.id }, // передаем объект с id
      filePath: dto.filePath,
      notes: dto.notes,
      price: dto.price || 1,
    });

    return this.repo.save(job);
  }


  // findAll() {
  //   return this.repo.find({
  //     relations: {
  //       armorType: true,
  //       material: true,
  //       deviceType: true

  //     },
  //     order: { id: 'ASC' },
  //   });
  // }

  async findAll(filters?: {
    armorTypeId?: number;
    materialId?: number;
    deviceTypeId?: number;
  }) {
    return this.repo.find({
      where: {
        ...(filters?.armorTypeId && {
          armorType: { id: filters.armorTypeId },
        }),
        ...(filters?.materialId && {
          material: { id: filters.materialId },
        }),
        ...(filters?.deviceTypeId && {
          deviceType: { id: filters.deviceTypeId },
        }),
      },
      relations: {
        armorType: true,
        deviceType: true,
      },
      order: { id: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['material', 'armorType', 'deviceType', 'user'],
    });
  }

  async findOneByAll(dto: PreviewCuttingJobDto) {
    return this.repo.findOne({
      where: {
        armorType: {
          id: dto.cuttingTypeId,
        },
        deviceType: {
          id: dto.deviceTypeId,
        },
      },
      relations: {
        armorType: true,
        deviceType: true,
      },
    });
  }

  update(id: number, dto: UpdateCuttingJobDto) {
    return this.repo.update(id, {
      armorType: dto.cuttingTypeId ? { id: dto.cuttingTypeId } : undefined,
      deviceType: dto.deviceTypeId ? { id: dto.deviceTypeId } : undefined,
      user: dto.userId ? { id: dto.userId } : undefined,
      filePath: dto.filePath,
      notes: dto.notes,
      price: dto.price,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
