// src/bookings/bookings.module.ts
import { Module }           from '@nestjs/common';
import { TypeOrmModule }    from '@nestjs/typeorm';
import { Booking }          from './entities/booking.entity';
import { BookingsService }  from './booking.service';
import { BookingsController } from './booking.controller';
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { DeviceType } from 'src/devicetype/entities/devicetype.entity';

@Module({
  imports:     [TypeOrmModule.forFeature([Booking, CuttingJob, DeviceType])],
  controllers: [BookingsController],
  providers:   [BookingsService],
  exports:     [BookingsService],
})
export class BookingsModule {}
