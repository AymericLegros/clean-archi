import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './data/entities/todo.entity';
import { TodoResolver } from './presentation/resolvers/todo.resolver';
import { CreateTodoUsecase } from './domain/usecases/create-todo.usecase';
import { DeleteTodoUsecase } from './domain/usecases/delete-todo.usecase';
import { GetTodoUsecase } from './domain/usecases/get-todo.usecase';
import { GetTodosUsecase } from './domain/usecases/get-todos.usecase';
import { UpdateTodoUsecase } from './domain/usecases/update-todo.usecase';
import { TodoRepositoryImpl } from './data/repositories/todo.repository-impl';
import { UploadFileUsecase } from './domain/usecases/upload-file.usecase';
import { DemoController } from './presentation/controllers/demo.controller';
import { GetHelloUsecase } from './domain/usecases/get-hello.usecase';
import { TodoDataSourceImpl } from './data/datasources/Todo.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepositoryImpl, TodoEntity])],
  controllers: [DemoController],
  providers: [
    TodoDataSourceImpl,
    TodoRepositoryImpl,
    TodoResolver,
    GetHelloUsecase,
    UploadFileUsecase,
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
