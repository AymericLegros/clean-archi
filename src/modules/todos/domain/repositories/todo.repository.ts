import { CreateTodoInput } from '../../dto/create-todo.input';
import { UpdateTodoInput } from '../../dto/update-todo.input';
import { Todo } from '../entities/todo.entity';

export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  findOne(id: number): Promise<Todo>;
  create(input: CreateTodoInput): Promise<Todo>;
  update(id: number, input: UpdateTodoInput): Promise<Todo>;
  delete(id: number): Promise<boolean>;
}
