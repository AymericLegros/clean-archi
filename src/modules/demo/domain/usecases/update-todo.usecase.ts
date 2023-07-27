import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { UpdateTodoInput } from '../../presentation/dtos/update-todo.dto';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class UpdateTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: number, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, updateTodoInput);
    return this.todoRepository.update(id, todo);
  }
}
