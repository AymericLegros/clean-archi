import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoDataSource } from '../datasources/todo.datasource';
import { CreateTodoEntity } from '../dtos/create-todo.dto';
import { UpdateTodoEntity } from '../dtos/update-todo.dto';
import { TodoEntity } from '../entities/todo.entity';

@Injectable()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly todoDataSource: TodoDataSource) {}

  findAll(): Promise<TodoEntity[]> {
    return this.todoDataSource.findAll();
  }
  findOne(id: number): Promise<TodoEntity> {
    return this.todoDataSource.findOne(id);
  }
  create(input: CreateTodoEntity): Promise<TodoEntity> {
    return this.todoDataSource.create(input);
  }
  update(id: number, input: UpdateTodoEntity): Promise<TodoEntity> {
    return this.todoDataSource.update(id, input);
  }
  delete(id: number): Promise<boolean> {
    return this.todoDataSource.delete(id);
  }
}
