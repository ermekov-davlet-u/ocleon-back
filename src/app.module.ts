// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d5usijd6ubrc73c0it2g-a',
      port: 5432,
      username: 'ocleon_user',
      password: 'bZVt1CbJvROLLhqX1mH3eyx4WBLxLohG',
      database: 'ocleon',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TodosModule,
  ],
})
export class AppModule {}
