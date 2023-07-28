import { FindOneOptions } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { Injectable } from '@nestjs/common';

export interface TodoDataSource {
  findAll(): Promise<TodoEntity[]>;
  findOne(id: number): Promise<TodoEntity>;
  create(todo: TodoEntity): Promise<TodoEntity>;
  update(id: number, todo: TodoEntity): Promise<TodoEntity>;
  delete(todo: TodoEntity): Promise<boolean>;
}

@Injectable()
export class TodoDataSourceImpl implements TodoDataSource {
  findAll(): Promise<TodoEntity[]> {
    return TodoEntity.find();
  }
  findOne(id: number): Promise<TodoEntity> {
    const options: FindOneOptions = { where: { id } };
    return TodoEntity.findOne(options);
  }
  create(todo: TodoEntity): Promise<TodoEntity> {
    return TodoEntity.create(todo).save();
  }
  update(id: number, todo: TodoEntity): Promise<TodoEntity> {
    return TodoEntity.update(id, todo).then(() => todo);
  }
  delete(todo: TodoEntity): Promise<boolean> {
    return TodoEntity.softRemove(todo).then(() => true);
  }
}
