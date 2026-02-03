// material-receipt-item.entity.ts
import { Material } from 'src/material/entities/material.entity';
import { MaterialReceipt } from 'src/material_receipts/entities/material_receipt.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('material_receipt_items')
export class MaterialReceiptItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MaterialReceipt, (receipt) => receipt.items)
  @JoinColumn({ name: 'receipt_id' })
  receipt: MaterialReceipt;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;
}
