import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { TodoDataSource } from '../../../../../src/modules/demo/data/datasources/todo.datasource';
import { TodoRepositoryImpl } from '../../../../../src/modules/demo/data/repositories/todo.repository-impl';
import { TodoEntity } from '../../../../../src/modules/demo/data/entities/todo.entity';

describe('TodoRepositoryImpl', () => {
  let repository: TodoRepositoryImpl;
  let mockTodoDataSource: DeepMocked<TodoDataSource>;

  beforeEach(async () => {
    mockTodoDataSource = createMock<TodoDataSource>();
    repository = new TodoRepositoryImpl(mockTodoDataSource);
  });

  it('should return a todo', async () => {
    // arrange
    const mockTodo: TodoEntity = new TodoEntity();
    mockTodoDataSource.findOne.mockResolvedValue(mockTodo);
    // act
    const result = await repository.findOne(1);

    // assert
    expect(result).toEqual(mockTodo);
  });

  it('should return a list of todos', async () => {
    // arrange
    const mockTodo: TodoEntity = new TodoEntity();
    mockTodoDataSource.findAll.mockResolvedValue([mockTodo]);
    // act
    const result = await repository.findAll();
    // assert
    expect(result).toEqual([mockTodo]);
  });
});
