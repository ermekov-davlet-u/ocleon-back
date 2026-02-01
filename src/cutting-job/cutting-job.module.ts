import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuttingJob } from './entities/cutting-job.entity';
import { CuttingJobService } from './cutting-job.service';
import { CuttingJobController } from './cutting-job.controller';
import { ArmorType } from 'src/armortypes/entities/armortype.entity';
import { DeviceType } from 'src/devicetype/entities/devicetype.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Material } from 'src/material/entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuttingJob, ArmorType, DeviceType, User, Material]), UsersModule],
  providers: [CuttingJobService],
  controllers: [CuttingJobController],
})
export class CuttingJobModule {}
