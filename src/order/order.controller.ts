import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCuttingOrderDto } from './dto/create-order.dto';
import { UpdateCuttingOrderDto } from './dto/update-order.dto';
import { CuttingOrderStatus } from './entities/order.entity';
import { CuttingOrderService } from './order.service';

@Controller('cutting-orders')
export class CuttingController {
  constructor(private readonly service: CuttingOrderService) {}

  @Post()
  create(@Body() dto: CreateCuttingOrderDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateCuttingOrderDto) {
    return this.service.update(+id, dto);
  }

  @Patch('/status-change/:id')
  changeStatus(@Param('id') id: number, @Body() dto: any) {
    console.log(id, dto);
    
    return this.service.updateStatus(+id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
