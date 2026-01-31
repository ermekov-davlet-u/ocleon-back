// todos/todo.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  task: string;

  @Column({ type: 'text', default: 'Not Started' })
  status: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  inserted_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
