import { Injectable } from '@nestjs/common';
import { Todo } from '../../domain/models/todo.model';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodoInput } from '../../presentation/dtos/create-todo.dto';
import { UpdateTodoInput } from '../../presentation/dtos/update-todo.dto';
import { TodoEntity } from '../entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
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
