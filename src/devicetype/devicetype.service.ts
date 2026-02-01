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

  create(dto: CreateDeviceTypeDto) {
    const deviceType = this.repo.create(dto);
    return this.repo.save(deviceType);
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
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
