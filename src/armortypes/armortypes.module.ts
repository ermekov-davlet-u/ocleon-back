import { Module } from '@nestjs/common';
import { ArmorTypesService } from './armortypes.service';
import { ArmorTypesController } from './armortypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmorType } from './entities/armortype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArmorType])],
  controllers: [ArmorTypesController],
  providers: [ArmorTypesService],
})
export class ArmortypesModule {}
