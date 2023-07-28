import { TodoEntity } from '../../data/entities/todo.entity';

export class Todo {
  id: number;
  title: string;
  completed: boolean;
  toComplete(): void {
    this.completed = true;
  }
}
