// src/bookings/entities/booking.entity.ts
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { DeviceType } from 'src/devicetype/entities/devicetype.entity';
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';

export enum BookingStatus {
  PENDING   = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  clientName: string;

  @Column({ length: 30 })
  clientPhone: string;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  // ─── Relations ───
  @ManyToOne(() => DeviceType, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'device_type_id' })
  deviceType: DeviceType;

  @ManyToOne(() => CuttingJob, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cutting_job_id' })
  cuttingJob: CuttingJob;

  // ─── Timestamps ───
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
