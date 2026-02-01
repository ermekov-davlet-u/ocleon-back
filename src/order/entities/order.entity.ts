import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CuttingOrderStatus {
  NEW = 'NEW',          // создан, еще не запускали
  IN_PROGRESS = 'IN_PROGRESS', // в работе (после "Провести")
  DONE = 'DONE',        // выполнено
  REWORK = 'REWORK',    // брак, повторная резка
}

@Entity('cutting_orders')
export class CuttingOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CuttingJob, { eager: true })
  @JoinColumn({ name: 'cutting_job_id' })
  cuttingJob: CuttingJob;

  @Column({ default: 1 })
  quantity: number;

  @Column({
    type: 'enum',
    enum: CuttingOrderStatus,
    default: CuttingOrderStatus.NEW,
  })
  status: CuttingOrderStatus;

  @Column({ type: 'timestamp', nullable: true })
  startedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}