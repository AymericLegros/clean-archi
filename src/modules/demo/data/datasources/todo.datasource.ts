import { FindOneOptions, Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { CreateTodoEntity } from '../dtos/create-todo.dto';
import { UpdateTodoEntity } from '../dtos/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

export interface TodoDataSource {
  findAll(): Promise<TodoEntity[]>;
  findOne(id: number): Promise<TodoEntity>;
  create(todo: CreateTodoEntity): Promise<TodoEntity>;
  update(id: number, todo: UpdateTodoEntity): Promise<TodoEntity>;
  delete(id: number): Promise<boolean>;
}

@Injectable()
export class TodoDataSourceImpl implements TodoDataSource {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  findOne(id: number): Promise<TodoEntity> {
    const options: FindOneOptions<TodoEntity> = { where: { id } };
    return this.todoRepository.findOne(options);
  }
  create(todo: CreateTodoEntity): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }
  update(id: number, todo: UpdateTodoEntity): Promise<TodoEntity> {
    return this.todoRepository.update(id, todo).then(() => this.findOne(id));
  }
  delete(id: number): Promise<boolean> {
    return this.todoRepository
      .softDelete(id)
      .then((result) => result.affected > 0);
  }
}
