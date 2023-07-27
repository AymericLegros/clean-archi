import { Injectable } from '@nestjs/common';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodoInput } from '../../presentation/dto/create-todo.dto';
import { UpdateTodoInput } from '../../presentation/dto/update-todo.dto';
import { TodoModel } from '../models/todo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectRepository(TodoModel)
    private readonly todoRepository: Repository<TodoModel>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
  findOne(id: number): Promise<Todo> {
    const options: FindOneOptions = { where: { id } };
    return this.todoRepository.findOne(options);
  }
  create(input: CreateTodoInput): Promise<Todo> {
    return this.todoRepository.save(input);
  }
  update(id: number, input: UpdateTodoInput): Promise<Todo> {
    return this.todoRepository.save({ id, ...input });
  }
  delete(id: number): Promise<boolean> {
    return this.todoRepository
      .softDelete(id)
      .then((result) => result.affected > 0);
  }
}
