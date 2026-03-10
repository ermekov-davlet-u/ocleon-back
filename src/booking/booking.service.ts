// src/bookings/bookings.service.ts
import {
  Injectable, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository }  from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto }  from './dto/create-booking.dto';
import { UpdateBookingDto }  from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly repo: Repository<Booking>,
  ) {}

  // ─── Create ───────────────────────────────
  async create(dto: CreateBookingDto): Promise<Booking> {
    const slot = new Date(dto.scheduledAt);

    // Проверка: слот не занят
    const conflict = await this.repo.findOne({
      where: {
        scheduledAt: slot,
        status: BookingStatus.CONFIRMED,
      },
    });
    if (conflict) {
      throw new BadRequestException('Это время уже занято. Выберите другое.');
    }

    // Проверка: рабочие часы 10:00–20:00
    const hour = slot.getHours();
    if (hour < 10 || hour >= 20) {
      throw new BadRequestException('Запись доступна только с 10:00 до 20:00');
    }

    const booking = this.repo.create({
      clientName:  dto.clientName,
      clientPhone: dto.clientPhone,
      notes:       dto.notes ?? null,
      scheduledAt: slot,
      deviceType:  { id: dto.deviceTypeId },
      cuttingJob:  { id: dto.cuttingJobId },
      status:      BookingStatus.PENDING,
    });

    return this.repo.save(booking);
  }

  // ─── Find All (с фильтрацией) ─────────────
  async findAll(filters?: {
    status?:    BookingStatus;
    dateFrom?:  string;
    dateTo?:    string;
  }): Promise<Booking[]> {
    const qb = this.repo.createQueryBuilder('b')
      .leftJoinAndSelect('b.deviceType', 'dt')
      .leftJoinAndSelect('b.cuttingJob', 'cj')
      .leftJoinAndSelect('cj.armorType',  'at')
      .orderBy('b.scheduledAt', 'ASC');

    if (filters?.status) {
      qb.andWhere('b.status = :status', { status: filters.status });
    }
    if (filters?.dateFrom && filters?.dateTo) {
      qb.andWhere('b.scheduledAt BETWEEN :from AND :to', {
        from: new Date(filters.dateFrom),
        to:   new Date(filters.dateTo),
      });
    }

    return qb.getMany();
  }

  // ─── Find One ─────────────────────────────
  async findOne(id: number): Promise<Booking> {
    const booking = await this.repo.findOne({
      where: { id },
      relations: ['deviceType', 'cuttingJob', 'cuttingJob.armorType'],
    });
    if (!booking) throw new NotFoundException(`Запись #${id} не найдена`);
    return booking;
  }

  // ─── Update ───────────────────────────────
  async update(id: number, dto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);
    if (dto.status)      booking.status      = dto.status;
    if (dto.scheduledAt) booking.scheduledAt = new Date(dto.scheduledAt);
    if (dto.notes !== undefined) booking.notes = dto.notes;
    return this.repo.save(booking);
  }

  // ─── Remove ───────────────────────────────
  async remove(id: number): Promise<void> {
    const booking = await this.findOne(id);
    await this.repo.remove(booking);
  }

  // ─── Busy slots for a date ────────────────
  async getBusySlots(date: string): Promise<string[]> {
    const from = new Date(`${date}T00:00:00`);
    const to   = new Date(`${date}T23:59:59`);
    const bookings = await this.repo.find({
      where: {
        scheduledAt: Between(from, to),
        status: BookingStatus.CONFIRMED,
      },
    });
    return bookings.map(b =>
      b.scheduledAt.toTimeString().slice(0, 5)
    );
  }
}
