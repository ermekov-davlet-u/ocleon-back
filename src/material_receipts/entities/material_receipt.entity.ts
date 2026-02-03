// material-receipt.entity.ts
import { MaterialReceiptItem } from 'src/material_receipt_item/entities/material_receipt_item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('material_receipts')
export class MaterialReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  number: string; // номер накладной

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => MaterialReceiptItem, (item) => item.receipt, {
    cascade: true,
  })
  items: MaterialReceiptItem[];
}
