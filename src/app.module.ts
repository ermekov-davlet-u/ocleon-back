// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // берем из Vercel
      entities: [Todo],
      synchronize: true, // авто-создание таблиц, для продакшена лучше false
    }),
    TodosModule,
  ],
})
export class AppModule {}
