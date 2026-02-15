import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { Client } from 'src/client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CuttingOrderStatus {
  NEW = 'NEW',          
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  REWORK = 'REWORK',
}

@Entity('cutting_orders')
export class CuttingOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CuttingJob, { eager: true })
  @JoinColumn({ name: 'cutting_job_id' })
  cuttingJob: CuttingJob;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

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
