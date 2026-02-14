import { InvoiceItem } from 'src/invoice-item/entities/invoice-item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum InvoiceType {
  INCOMING = 'incoming',   // приход
  OUTGOING = 'outgoing',   // расход
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: InvoiceType })
  type: InvoiceType;

  @Column({ length: 255, nullable: true })
  comment?: string;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, {
    cascade: true,
    eager: true,
  })
  items: InvoiceItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
