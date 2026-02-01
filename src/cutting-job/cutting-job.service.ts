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
      material: { id: dto.materialId },
      armorType: { id: dto.cuttingTypeId },
      deviceType: { id: dto.deviceTypeId },
      user: { id: firstUser.id }, // передаем объект с id
      filePath: dto.filePath,
      notes: dto.notes,
      quantity: dto.quantity || 1,
    });

    return this.repo.save(job);
  }


  findAll() {
    return this.repo.find({
      relations: {
        armorType: true,
        material: true,
        deviceType: true

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
    const material = await this.repo.manager.findOne('Material', {
      where: { id: dto.materialId },
    });

    const armorType = await this.repo.manager.findOne('ArmorType', {
      where: { id: dto.cuttingTypeId },
    });

    const deviceType = await this.repo.manager.findOne('DeviceType', {
      where: { id: dto.deviceTypeId },
    });


    return this.repo.findOne({
      where: {
        material: {
          id: dto.materialId
        },
        armorType: {
          id: dto.cuttingTypeId
        },
        deviceType: {
          id: dto.deviceTypeId
        }
      },
      relations: ['material', 'armorType', 'deviceType', 'user'],
    });
  }

  update(id: number, dto: UpdateCuttingJobDto) {
    return this.repo.update(id, {
      material: dto.materialId ? { id: dto.materialId } : undefined,
      armorType: dto.cuttingTypeId ? { id: dto.cuttingTypeId } : undefined,
      deviceType: dto.deviceTypeId ? { id: dto.deviceTypeId } : undefined,
      user: dto.userId ? { id: dto.userId } : undefined,
      filePath: dto.filePath,
      notes: dto.notes,
      quantity: dto.quantity,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
