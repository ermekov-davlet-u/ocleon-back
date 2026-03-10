import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { MaterialFile } from './entities/material-file.entity';
import { MaterialsService } from './material.service';
import { MaterialsController } from './material.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Material,
      MaterialFile, // ✅ регистрируем оба репозитория
    ]),
  ],
  controllers: [MaterialsController],
  providers:   [MaterialsService],
  exports:     [MaterialsService],
})
export class MaterialsModule {}
