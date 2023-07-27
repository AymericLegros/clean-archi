import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { CreateTodoInput } from '../../presentation/dto/create-todo.dto';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class CreateTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(createTodoInput: CreateTodoInput): Promise<Todo> {
    return this.todoRepository.create(createTodoInput);
  }
}
