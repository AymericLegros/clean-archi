import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';

@Injectable()
export class DeleteTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: number): Promise<boolean> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return await this.todoRepository.delete(id);
  }
}
