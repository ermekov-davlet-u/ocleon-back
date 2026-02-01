import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Material } from 'src/material/entities/material.entity';
import { ArmorType } from 'src/armortypes/entities/armortype.entity';
import { DeviceType } from 'src/devicetype/entities/devicetype.entity';

@Entity('cutting_jobs')
export class CuttingJob {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @ManyToOne(() => ArmorType)
  @JoinColumn({ name: 'cutting_type_id' })
  armorType: ArmorType;

  @ManyToOne(() => DeviceType)
  @JoinColumn({ name: 'device_type_id' })
  deviceType: DeviceType;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255, nullable: true })
  filePath?: string; // путь к файлу резки

  @Column({ default: 1 })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
