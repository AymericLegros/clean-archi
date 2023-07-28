import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Todo } from '../../../../../src/modules/demo/domain/models/todo.model';
import { TodoRepository } from '../../../../../src/modules/demo/domain/repositories/todo.repository';
import { CreateTodoUsecase } from '../../../../../src/modules/demo/domain/usecases/create-todo.usecase';

describe('GetTodoUsecase', () => {
  let usecase: CreateTodoUsecase;
  let mockTodoRepository: DeepMocked<TodoRepository>;

  beforeEach(async () => {
    mockTodoRepository = createMock<TodoRepository>();
    usecase = new CreateTodoUsecase(mockTodoRepository);
  });

  it('should return a todo', async () => {
    // arrange
    const mockTodo: Todo = new Todo();
    mockTodo.id = 1;
    mockTodo.title = 'test';
    mockTodo.completed = false;
    mockTodoRepository.create.mockResolvedValue(mockTodo);

    // act
    const result: Todo = await usecase.execute(mockTodo);

    // assert
    expect(result).toEqual(mockTodo);
  });
});
