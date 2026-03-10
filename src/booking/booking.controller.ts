// src/bookings/bookings.controller.ts
import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { BookingsService }   from './booking.service';
import { CreateBookingDto }  from './dto/create-booking.dto';
import { UpdateBookingDto }  from './dto/update-booking.dto';
import { BookingStatus }     from './entities/booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  /** POST /bookings — создать запись (с фронта) */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBookingDto) {
    return this.service.create(dto);
  }

  /** GET /bookings?status=pending&dateFrom=2026-03-10&dateTo=2026-03-17 */
  @Get()
  findAll(
    @Query('status')   status?:   BookingStatus,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo')   dateTo?:   string,
  ) {
    return this.service.findAll({ status, dateFrom, dateTo });
  }

  /** GET /bookings/busy-slots?date=2026-03-10 */
  @Get('busy-slots')
  getBusySlots(@Query('date') date: string) {
    return this.service.getBusySlots(date);
  }

  /** GET /bookings/:id */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  /** PATCH /bookings/:id — изменить статус / время */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookingDto,
  ) {
    return this.service.update(id, dto);
  }

  /** DELETE /bookings/:id */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
