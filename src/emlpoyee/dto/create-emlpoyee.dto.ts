import { IsEnum, IsUUID, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { EmployeePosition } from '../entities/emlpoyee.entity';

export class CreateEmployeeDto {
  @IsUUID()
  userId: number;

  @IsEnum(EmployeePosition)
  position: EmployeePosition;

  @IsOptional()
  @IsDateString()
  hireDate?: Date;

  @IsOptional()
  @IsNumber()
  salary?: number;
}
