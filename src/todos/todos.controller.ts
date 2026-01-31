// todos/todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAll() {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() body: { task: string; user_id: string }) {
    return this.todosService.create(body.task, body.user_id);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
    return this.todosService.updateStatus(id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todosService.delete(id);
  }
}
