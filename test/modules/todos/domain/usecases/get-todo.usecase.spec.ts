import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Todo } from '../../../../../src/modules/demo/domain/models/todo.model';
import { GetTodoUsecase } from '../../../../../src/modules/demo/domain/usecases/get-todo.usecase';
import { TodoRepository } from '../../../../../src/modules/demo/domain/repositories/todo.repository';

describe('GetTodoUsecase', () => {
  let usecase: GetTodoUsecase;
  let mockTodoRepository: DeepMocked<TodoRepository>;

  beforeEach(async () => {
    mockTodoRepository = createMock<TodoRepository>();
    usecase = new GetTodoUsecase(mockTodoRepository);
  });

  it('should return a todo', async () => {
    // arrange
    const mockTodo: Todo = { id: 1, title: 'Test Todo', completed: false };
    mockTodoRepository.findOne.mockResolvedValue(mockTodo);
    // act
    const result: Todo = await usecase.execute(1);

    // assert
    expect(result).toEqual(mockTodo);
  });

  it('should throw an error if todo not found', async () => {
    // arrange
    mockTodoRepository.findOne.mockResolvedValue(undefined);
    // act
    const result = usecase.execute(1);

    // assert
    await expect(result).rejects.toThrowError('Todo not found');
  });
});
