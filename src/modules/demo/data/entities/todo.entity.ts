import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '../../domain/models/todo.model';

@Entity({ name: 'todos' })
export class TodoEntity extends Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;
}
