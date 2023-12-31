import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { CreateTodoInput } from '../../presentation/dtos/create-todo.dto';
import { Todo } from '../models/todo.model';

@Injectable()
export class CreateTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(createTodoInput: CreateTodoInput): Promise<Todo> {
    return this.todoRepository.create(createTodoInput);
  }
}
