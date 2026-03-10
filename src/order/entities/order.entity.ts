import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { Client } from 'src/client/entities/client.entity';
import { Discount } from 'src/discount/entities/discount.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from 'src/branch/entities/branch.entity';
import { Material } from 'src/material/entities/material.entity';

export enum CuttingOrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  REWORK = 'REWORK',
  DEFECT = 'DEFECT',
}

@Entity('cutting_orders')
export class CuttingOrder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, default: () => 'uuid_generate_v4()' })
  uniqueId: string;

  @ManyToOne(() => CuttingJob, { eager: true })
  @JoinColumn({ name: 'cutting_job_id' })
  cuttingJob: CuttingJob;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Material, { eager: true, nullable: true })
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ default: 1 })
  quantity: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  totalAmount: number;

  @ManyToOne(() => Discount, { nullable: true, eager: true })
  @JoinColumn({ name: 'discount_id' })
  discount?: Discount;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  finalAmount?: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: CuttingOrderStatus.NEW,
  })
  status: CuttingOrderStatus;

  @Column({ type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  finishedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ default: false }) // Add this line
  warrantyUsed: boolean; // New property to track if the warranty has been used
}
