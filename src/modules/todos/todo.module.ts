import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModel } from './data/models/todo.model';
import { TodoResolver } from './resolvers/todo.resolver';
import { CreateTodoUsecase } from './domain/usecases/create-todo.usecase';
import { DeleteTodoUsecase } from './domain/usecases/delete-todo.usecase';
import { GetTodoUsecase } from './domain/usecases/get-todo.usecase';
import { GetTodosUsecase } from './domain/usecases/get-todos.usecase';
import { UpdateTodoUsecase } from './domain/usecases/update-todo.usecase';
import { TodoRepositoryImpl } from './data/repositories/todo.repository-impl';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepositoryImpl, TodoModel])],
  providers: [
    TodoResolver,
    TodoRepositoryImpl,
    {
      provide: GetTodoUsecase,
      inject: [TodoRepositoryImpl],
      useFactory: (todoRepository: TodoRepositoryImpl) =>
        new GetTodoUsecase(todoRepository),
    },
    {
      provide: GetTodosUsecase,
      inject: [TodoRepositoryImpl],
      useFactory: (todoRepository: TodoRepositoryImpl) =>
        new GetTodosUsecase(todoRepository),
    },
    {
      provide: CreateTodoUsecase,
      inject: [TodoRepositoryImpl],
      useFactory: (todoRepository: TodoRepositoryImpl) =>
        new CreateTodoUsecase(todoRepository),
    },
    {
      provide: UpdateTodoUsecase,
      inject: [TodoRepositoryImpl],
      useFactory: (todoRepository: TodoRepositoryImpl) =>
        new UpdateTodoUsecase(todoRepository),
    },
    {
      provide: DeleteTodoUsecase,
      inject: [TodoRepositoryImpl],
      useFactory: (todoRepository: TodoRepositoryImpl) =>
        new DeleteTodoUsecase(todoRepository),
    },
  ],
})
export class TodoModule {}
