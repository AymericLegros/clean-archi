import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateTodoInput } from '../dto/create-todo.input';
import { UpdateTodoInput } from '../dto/update-todo.input';
import { GetTodoUsecase } from '../../domain/usecases/get-todo.usecase';
import { GetTodosUsecase } from '../../domain/usecases/get-todos.usecase';
import { CreateTodoUsecase } from '../../domain/usecases/create-todo.usecase';
import { DeleteTodoUsecase } from '../../domain/usecases/delete-todo.usecase';
import { UpdateTodoUsecase } from '../../domain/usecases/update-todo.usecase';
import { TodoDto } from '../dto/todo.dto';

@Resolver(() => TodoDto)
export class TodoResolver {
  constructor(
    private readonly getTodoUsecase: GetTodoUsecase,
    private readonly getTodosUsecase: GetTodosUsecase,
    private readonly createTodoUsecase: CreateTodoUsecase,
    private readonly updateTodoUsecase: UpdateTodoUsecase,
    private readonly deleteTodoUsecase: DeleteTodoUsecase,
  ) {}

  @Query(() => TodoDto)
  async todo(@Args('id') id: number) {
    return this.getTodoUsecase.execute(id);
  }

  @Query(() => [TodoDto])
  async todos() {
    return this.getTodosUsecase.execute();
  }

  @Mutation(() => TodoDto)
  async createTodo(@Args('input') input: CreateTodoInput) {
    return this.createTodoUsecase.execute(input);
  }

  @Mutation(() => TodoDto)
  async updateTodo(
    @Args('id') id: number,
    @Args('input') input: UpdateTodoInput,
  ) {
    return this.updateTodoUsecase.execute(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id') id: number) {
    return this.deleteTodoUsecase.execute(id);
  }
}
