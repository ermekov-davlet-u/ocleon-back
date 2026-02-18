import { Injectable } from '@nestjs/common';
import { CreateMaterialListDto } from './dto/create-material-list.dto';
import { UpdateMaterialListDto } from './dto/update-material-list.dto';

@Injectable()
export class MaterialListService {
  create(createMaterialListDto: CreateMaterialListDto) {
    return 'This action adds a new materialList';
  }

  findAll() {
    return `This action returns all materialList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materialList`;
  }

  update(id: number, updateMaterialListDto: UpdateMaterialListDto) {
    return `This action updates a #${id} materialList`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialList`;
  }
}
