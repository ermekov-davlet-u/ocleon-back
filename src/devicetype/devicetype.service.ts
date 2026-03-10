import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceType } from './entities/devicetype.entity';
import { CreateDeviceTypeDto } from './dto/create-devicetype.dto';
import { UpdateDevicetypeDto } from './dto/update-devicetype.dto';

@Injectable()
export class DeviceTypesService {
  constructor(
    @InjectRepository(DeviceType)
    private readonly repo: Repository<DeviceType>,
  ) {}

  async createMany(dtos: any[], batchSize = 1000) {
    const savedClients: any = [];
  
    for (let i = 0; i < dtos.length; i += batchSize) {
      const batch = dtos.slice(i, i + batchSize);
      const entities = this.repo.create(batch);
      const result: any = await this.repo.save(entities);
      savedClients.push(...result);
    }
  
    return savedClients;
  }

  create(dto: CreateDeviceTypeDto) {
    const deviceType = this.repo.create(dto);
    return this.repo.save(deviceType);
  }

  findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: UpdateDevicetypeDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
