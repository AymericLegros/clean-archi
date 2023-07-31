import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { TodoRepository } from '../../../../../src/modules/demo/domain/repositories/todo.repository';
import { DeleteTodoUsecase } from '../../../../../src/modules/demo/domain/usecases/delete-todo.usecase';

describe('DeleteTodoUsecase', () => {
  let usecase: DeleteTodoUsecase;
  let mockTodoRepository: DeepMocked<TodoRepository>;

  beforeEach(async () => {
    mockTodoRepository = createMock<TodoRepository>();
    usecase = new DeleteTodoUsecase(mockTodoRepository);
  });

  it('should return true if todo deleted', async () => {
    // arrange
    mockTodoRepository.delete.mockResolvedValue(true);

    // act
    const result = await usecase.execute(1);

    // assert
    expect(result).toEqual(true);
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
