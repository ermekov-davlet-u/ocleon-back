import { Module } from '@nestjs/common';
import { MaterialListService } from './material-list.service';
import { MaterialListController } from './material-list.controller';

@Module({
  controllers: [MaterialListController],
  providers: [MaterialListService],
})
export class MaterialListModule {}
