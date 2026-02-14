import { Module } from '@nestjs/common';
import { EmployeeController } from './emlpoyee.controller';
import { EmployeeService } from './emlpoyee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/emlpoyee.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, User])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmlpoyeeModule {}
