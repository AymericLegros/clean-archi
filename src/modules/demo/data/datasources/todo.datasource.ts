import { FindOneOptions } from 'typeorm';
import { TodoModel } from '../models/todo.model';
import { Injectable } from '@nestjs/common';

export interface TodoDataSource {
  findAll(): Promise<TodoModel[]>;
  findOne(id: number): Promise<TodoModel>;
  create(todo: TodoModel): Promise<TodoModel>;
  update(id: number, todo: TodoModel): Promise<TodoModel>;
  delete(todo: TodoModel): Promise<boolean>;
}

@Injectable()
export class TodoDataSourceImpl implements TodoDataSource {
  findAll(): Promise<TodoModel[]> {
    return TodoModel.find();
  }
  findOne(id: number): Promise<TodoModel> {
    const options: FindOneOptions = { where: { id } };
    return TodoModel.findOne(options);
  }
  create(todo: TodoModel): Promise<TodoModel> {
    return TodoModel.create(todo).save();
  }
  update(id: number, todo: TodoModel): Promise<TodoModel> {
    return TodoModel.update(id, todo).then(() => todo);
  }
  delete(todo: TodoModel): Promise<boolean> {
    return TodoModel.softRemove(todo).then(() => true);
  }
}
