import { CuttingOrder } from 'src/order/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @OneToMany(() => User, (user) => user.branch)
  users: User[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => CuttingOrder, (job) => job.branch)
  cuttingJobs: CuttingOrder[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
