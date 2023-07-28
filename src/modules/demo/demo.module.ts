import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoEntity } from './data/entities/todo.entity';
import { TodoRepositoryImpl } from './data/repositories/todo.repository-impl';
import { TodoDataSourceImpl } from './data/datasources/Todo.datasource';

import { DemoController } from './presentation/controllers/demo.controller';

import { TodoResolver } from './presentation/resolvers/todo.resolver';

import { CreateTodoUsecase } from './domain/usecases/create-todo.usecase';
import { DeleteTodoUsecase } from './domain/usecases/delete-todo.usecase';
import { GetTodoUsecase } from './domain/usecases/get-todo.usecase';
import { GetTodosUsecase } from './domain/usecases/get-todos.usecase';
import { UpdateTodoUsecase } from './domain/usecases/update-todo.usecase';
import { GetHelloUsecase } from './domain/usecases/get-hello.usecase';
import { UploadFileUsecase } from './domain/usecases/upload-file.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TodoDataSourceImpl, TodoEntity])],
  controllers: [DemoController],
  providers: [
    TodoDataSourceImpl,
    TodoResolver,
    GetHelloUsecase,
    UploadFileUsecase,
    {
      provide: TodoRepositoryImpl,
      inject: [TodoDataSourceImpl],
      useFactory: (todoDataSource: TodoDataSourceImpl) =>
        new TodoRepositoryImpl(todoDataSource),
    },
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
export class DemoModule {}
