import { Module } from '@nestjs/common';
import { Material } from './entities/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsController } from './material.controller';
import { MaterialsService } from './material.service';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialModule {}
