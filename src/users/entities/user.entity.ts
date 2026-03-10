import { Branch } from 'src/branch/entities/branch.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  // Хранение enum как строка в MSSQL
  @Column({
    type: 'varchar',
    length: 20,
    default: UserRole.USER,
  })
  isRole: UserRole;

   // Связь с филиалом
   @ManyToOne(() => Branch, (branch) => branch.users, { nullable: true })
   @JoinColumn({ name: 'branch_id' })
   branch: Branch;
}
