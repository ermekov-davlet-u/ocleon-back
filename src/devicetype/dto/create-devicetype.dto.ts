import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateDeviceTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
