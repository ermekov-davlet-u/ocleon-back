import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArmorTypesService } from './armortypes.service';
import { UpdateArmortypeDto } from './dto/update-armortype.dto';
import { CreateArmorTypeDto } from './dto/create-armortype.dto';

@Controller('armor-film-types')
export class ArmorTypesController {
  constructor(private readonly service: ArmorTypesService) {}

  @Post()
  create(@Body() dto: CreateArmorTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateArmortypeDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
