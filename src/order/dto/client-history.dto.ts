// order/dto/client-history.dto.ts

import { IsString, IsNumber, IsDate } from 'class-validator';

export class ClientHistoryResponse {
  @IsNumber()
  id: number;

  @IsString()
  deviceType: string;

  @IsString()
  armorType: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  finalAmount: number;

  @IsDate()
  createdAt: Date;
}
