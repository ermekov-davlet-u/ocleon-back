// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Todo],
      synchronize: true,
      extra: {
        ssl: { rejectUnauthorized: false }, // если Supabase требует SSL
      },
    }),
    TodosModule,
  ],
})
export class AppModule {}
