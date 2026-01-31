// todos/todos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  findAll() {
    return this.todoRepo.find();
  }

  create(task: string, user_id: string) {
    const todo = this.todoRepo.create({ task, user_id });
    return this.todoRepo.save(todo);
  }

  updateStatus(id: number, status: string) {
    return this.todoRepo.update(id, { status });
  }

  delete(id: number) {
    return this.todoRepo.delete(id);
  }
}
