// discount/entities/discount.entity.ts

import { Client } from 'src/client/entities/client.entity';
import { CuttingOrder } from 'src/order/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DiscountType {
  PERCENT = 'PERCENTAGE', // Процентная скидка (value = %)
  FIXED   = 'FIXED',   // Фиксированная сумма (value = сом)
  PRICE_OVERRIDE = 'PRICE_OVERRIDE', // Замена итоговой цены (value = новая цена)
}

/**
 * Бизнес-правило скидки:
 * — MANUAL           → оператор вручную выбирает скидку
 * — SECOND_WRAPPING  → вторая оклейка = фикс. цена 600 сом
 * — REFERRAL         → привёл друга = 15%
 * — SECOND_DEVICE    → второе устройство = 20%
 */
export enum DiscountRule {
  MANUAL           = 'MANUAL',
  SECOND_WRAPPING  = 'SECOND_WRAPPING',
  REFERRAL         = 'REFERRAL',
  SECOND_DEVICE    = 'SECOND_DEVICE',
}

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string; // Отображаемое название: "Вторая оклейка", "Привёл друга"

  @Column({ type: 'varchar', length: 30, default: DiscountRule.MANUAL })
  rule: DiscountRule; // Машиночитаемое правило

  @Column({ type: 'varchar', length: 20 })
  type: DiscountType; // Как считать: PERCENT / FIXED / PRICE_OVERRIDE

  @Column('decimal', { precision: 10, scale: 2 })
  value: number; // 15 → 15% | 600 → 600 сом | 600 → новая цена

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @ManyToOne(() => Client, { nullable: true, eager: true })
  @JoinColumn({ name: 'client_id' })
  client?: Client;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
