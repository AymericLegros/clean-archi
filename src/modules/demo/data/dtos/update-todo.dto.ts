import { TodoEntity } from '../entities/todo.entity';

export class UpdateTodoEntity implements Partial<TodoEntity> {
  title?: string;
  completed?: boolean;
}
