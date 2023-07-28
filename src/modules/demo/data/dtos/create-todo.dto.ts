import { TodoEntity } from '../entities/todo.entity';

export class CreateTodoEntity implements Partial<TodoEntity> {
  title: string;
  completed: boolean;
}
