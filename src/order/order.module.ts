import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuttingOrder } from './entities/order.entity';
import { CuttingOrderService } from './order.service';
import { CuttingController } from './order.controller';
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuttingOrder, CuttingJob, Client])],
  providers: [CuttingOrderService],
  controllers: [CuttingController],
})
export class CuttingModule {}
