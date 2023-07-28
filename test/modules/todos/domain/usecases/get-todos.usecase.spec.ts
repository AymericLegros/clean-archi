import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Todo } from '../../../../../src/modules/demo/domain/models/todo.model';
import { GetTodosUsecase } from '../../../../../src/modules/demo/domain/usecases/get-todos.usecase';
import { TodoRepository } from '../../../../../src/modules/demo/domain/repositories/todo.repository';

describe('GetTodosUsecase', () => {
  let usecase: GetTodosUsecase;
  let mockTodoRepository: DeepMocked<TodoRepository>;

  beforeEach(async () => {
    mockTodoRepository = createMock<TodoRepository>();
    usecase = new GetTodosUsecase(mockTodoRepository);
  });

  it('should return a list of todos', async () => {
    // arrange
    const mockTodo: Todo = new Todo();
    mockTodoRepository.findAll.mockResolvedValue([mockTodo]);

    // act
    const result: Todo[] = await usecase.execute();

    // assert
    expect(result).toEqual([mockTodo]);
  });

  it('should throw an error if todo not found', async () => {
    // arrange
    mockTodoRepository.findAll.mockResolvedValue(undefined);

    // act
    const result = usecase.execute();

    // assert
    await expect(result).rejects.toThrowError('Todo not found');
  });
});
