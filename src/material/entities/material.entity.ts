import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { MaterialFile } from './material-file.entity';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  barcode: string;

  @Column({ length: 50, nullable: true })
  type?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  thickness?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ default: true })
  isActive: boolean;

  // ✅ Связь с файлами (один материал → много файлов)
  @OneToMany(() => MaterialFile, (file) => file.material, {
    eager: true,        // автоматически подгружать файлы
    cascade: true,
  })
  files: MaterialFile[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
