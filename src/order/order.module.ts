import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuttingOrder } from './entities/order.entity';
import { CuttingOrderService } from './order.service';
import { CuttingController } from './order.controller';
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { Client } from 'src/client/entities/client.entity';
import { Discount } from 'src/discount/entities/discount.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { DeviceType } from 'src/devicetype/entities/devicetype.entity';
import { ArmorType } from 'src/armortypes/entities/armortype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuttingOrder, CuttingJob, Client, Discount, Branch, DeviceType, ArmorType])],
  providers: [CuttingOrderService],
  controllers: [CuttingController],
})
export class CuttingModule {}
