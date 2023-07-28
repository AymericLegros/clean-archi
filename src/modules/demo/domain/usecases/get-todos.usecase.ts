import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { Todo } from '../models/todo.model';

@Injectable()
export class GetTodosUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    const todos = await this.todoRepository.findAll();
    if (!todos) {
      throw new NotFoundException('Todo not found');
    }

    return todos;
  }
}
