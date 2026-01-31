// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:p%21%24c6H8%24A%40tepjW@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
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
