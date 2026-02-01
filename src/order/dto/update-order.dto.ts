import { PartialType } from '@nestjs/mapped-types';
import { CreateCuttingOrderDto } from './create-order.dto';
import { CuttingOrderStatus } from '../entities/order.entity';

export class UpdateCuttingOrderDto extends PartialType(CreateCuttingOrderDto) {}

export class UpdateCuttingOrderStatusDto {
  status: CuttingOrderStatus;
}

