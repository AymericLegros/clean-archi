import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { HelloCharlyDataSource } from '../../../../../src/modules/hello-charly/data/datasources/hello-charly.datasource';
import { HelloCharlyRepositoryImpl } from '../../../../../src/modules/hello-charly/data/repositories/hello-charly.repository-impl';
import { CreateHelloCharlyDataEntity } from '../../../../../src/modules/hello-charly/data/dtos/create-data.dto';
import { HelloCharlyDataEntity } from '../../../../../src/modules/hello-charly/data/entities/data.entity';

describe('HelloCharlyRepositoryImpl', () => {
  let repository: HelloCharlyRepositoryImpl;
  let mockHelloCharlyDataSource: DeepMocked<HelloCharlyDataSource>;

  beforeEach(async () => {
    mockHelloCharlyDataSource = createMock<HelloCharlyDataSource>();
    repository = new HelloCharlyRepositoryImpl(mockHelloCharlyDataSource);
  });

  it('should return true if data received', async () => {
    // arrange
    mockHelloCharlyDataSource.create.mockResolvedValue(true);
    // act
    const params = new CreateHelloCharlyDataEntity();
    const result = await repository.create(params);
    // assert
    expect(result).toEqual(true);
  });

  it('should return a list of data', async () => {
    // arrange
    const mockData = new HelloCharlyDataEntity();
    mockHelloCharlyDataSource.findAll.mockResolvedValue([mockData]);
    // act
    const result = await repository.findAll();
    // assert
    expect(result).toEqual([mockData]);
  });
});
