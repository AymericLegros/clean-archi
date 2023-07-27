import { CreateTodoInput } from '../../presentation/dtos/create-todo.dto';
import { UpdateTodoInput } from '../../presentation/dtos/update-todo.dto';
import { Todo } from '../entities/todo.entity';

export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  findOne(id: number): Promise<Todo>;
  create(input: CreateTodoInput): Promise<Todo>;
  update(id: number, input: UpdateTodoInput): Promise<Todo>;
  delete(id: number): Promise<boolean>;
}
