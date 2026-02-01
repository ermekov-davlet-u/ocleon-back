import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorType } from './entities/armortype.entity';
import { CreateArmorTypeDto } from './dto/create-armortype.dto';
import { UpdateArmortypeDto } from './dto/update-armortype.dto';

@Injectable()
export class ArmorTypesService {
  constructor(
    @InjectRepository(ArmorType)
    private readonly repo: Repository<ArmorType>,
  ) {}

  create(dto: CreateArmorTypeDto) {
    const type = this.repo.create(dto);
    return this.repo.save(type);
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: UpdateArmortypeDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
