import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceType } from './entities/devicetype.entity';
import { DeviceTypesController } from './devicetype.controller';
import { DeviceTypesService } from './devicetype.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceType])],
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService],
})
export class DevicetypeModule {}
