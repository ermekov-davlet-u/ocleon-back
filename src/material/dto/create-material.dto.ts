import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  name: string;

  @IsString()
  barcode: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  thickness?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
