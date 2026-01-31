// data-source.ts
import { DataSource } from 'typeorm';
import { Todo } from './todos/entities/todo.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://postgres:[YOUR-PASSWORD]@db.eajbhliparlkciiepjjx.supabase.co:5432/postgres',
  entities: [Todo],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
});
