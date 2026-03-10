// src/bookings/dto/create-booking.dto.ts
import {
  IsString, IsNotEmpty, IsInt, IsPositive,
  IsDateString, IsOptional, MaxLength, Matches,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  clientName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]{9,15}$/, { message: 'Неверный формат телефона' })
  clientPhone: string;

  @IsInt()
  @IsPositive()
  deviceTypeId: number;

  @IsInt()
  @IsPositive()
  cuttingJobId: number;

  @IsDateString()
  scheduledAt: string;          // ISO: "2026-03-10T14:00:00"

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
