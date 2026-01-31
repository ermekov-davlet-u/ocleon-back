// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: 'postgresql://postgres:[YOUR-PASSWORD]@db.eajbhliparlkciiepjjx.supabase.co:5432/postgres',
        entities: [Todo],
        synchronize: true,
        extra: {
          ssl: false, // отключаем SSL для pgBouncer
          max: 5, // ограничиваем пул
        },
      }),
    }),
    TodosModule,
  ],
})
export class AppModule {}
