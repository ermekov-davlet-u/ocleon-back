// create-material-receipt.dto.ts
import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class MaterialReceiptItemDto {
  @IsNumber()
  materialId: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateMaterialReceiptDto {
  @IsString()
  number: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialReceiptItemDto)
  items: MaterialReceiptItemDto[];
}
