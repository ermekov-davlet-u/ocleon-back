import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuttingOrder } from './entities/order.entity';
import { CuttingService } from './order.service';
import { CuttingController } from './order.controller';
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuttingOrder, CuttingJob])],
  providers: [CuttingService],
  controllers: [CuttingController],
})
export class CuttingModule {}
