// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // берем pooled connection
      entities: [Todo],
      synchronize: true, // в продакшене лучше false
      extra: {
        ssl: {
          rejectUnauthorized: false, // нужно для Supabase
        },
      },
    }),
    TodosModule,
  ],
})
export class AppModule {}
