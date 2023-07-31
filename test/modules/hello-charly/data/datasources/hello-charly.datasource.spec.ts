import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { HelloCharlyDataSourceImpl } from '../../../../../src/modules/hello-charly/data/datasources/hello-charly.datasource';
import { HelloCharlyDataEntity } from '../../../../../src/modules/hello-charly/data/entities/data.entity';
import { CreateHelloCharlyDataEntity } from '../../../../../src/modules/hello-charly/data/dtos/create-data.dto';

describe('HelloCharlyDataSource', () => {
  let datasource: HelloCharlyDataSourceImpl;
  let mockHelloCharlyDataRepository: DeepMocked<
    Repository<HelloCharlyDataEntity>
  >;

  beforeEach(async () => {
    mockHelloCharlyDataRepository =
      createMock<Repository<HelloCharlyDataEntity>>();
    datasource = new HelloCharlyDataSourceImpl(mockHelloCharlyDataRepository);
  });

  it('should return true if data received', async () => {
    // arrange
    const mockData = new HelloCharlyDataEntity();
    mockData.data = 'test';
    mockHelloCharlyDataRepository.save.mockResolvedValue(mockData);

    // act
    const params = new CreateHelloCharlyDataEntity();
    const result = await datasource.create(params);
    // assert
    expect(result).toEqual(true);
  });

  it('should throw InternalServerErrorException if error', async () => {
    // arrange
    mockHelloCharlyDataRepository.save.mockRejectedValue('error');

    // act
    const params = new CreateHelloCharlyDataEntity();
    const result = datasource.create(params);

    // assert
    await expect(result).rejects.toThrowError('error');
  });

  it('should return a list of data', async () => {
    // arrange
    const mockData = new HelloCharlyDataEntity();
    mockHelloCharlyDataRepository.find.mockResolvedValue([mockData]);

    // act
    const result = await datasource.findAll();

    // assert
    expect(result).toEqual([mockData]);
  });
});
