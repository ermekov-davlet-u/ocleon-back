import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeviceTypesService } from './devicetype.service';
import { CreateDeviceTypeDto } from './dto/create-devicetype.dto';
import { UpdateDevicetypeDto } from './dto/update-devicetype.dto';

@Controller('device-types')
export class DeviceTypesController {
  constructor(private readonly service: DeviceTypesService) {}

  @Post()
  create(@Body() dto: CreateDeviceTypeDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateDevicetypeDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
