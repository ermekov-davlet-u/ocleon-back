import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Material } from './material.entity';

@Entity('material_files')
export class MaterialFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Material, (material) => material.files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({ length: 255 })
  filePath: string; // путь на диске: uploads/material-123456.jpg

  @Column({ length: 255, nullable: true })
  originalName?: string; // оригинальное имя файла

  @Column({ length: 50, nullable: true })
  mimeType?: string; // image/jpeg, application/pdf и т.д.

  @Column({ type: 'int', nullable: true })
  size?: number; // размер в байтах

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
