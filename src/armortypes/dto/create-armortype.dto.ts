import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateArmorTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
