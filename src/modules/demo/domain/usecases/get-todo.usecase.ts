import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { Todo } from '../models/todo.model';

@Injectable()
export class GetTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }
}
