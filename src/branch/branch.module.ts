import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { BranchesController } from './branch.controller';
import { BranchesService } from './branch.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, User])],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
