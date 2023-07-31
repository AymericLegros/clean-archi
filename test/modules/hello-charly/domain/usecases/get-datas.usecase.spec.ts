import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { HelloCharlyRepository } from '../../../../../src/modules/hello-charly/domain/repositories/hello-charly.repository';
import { HelloCharlyGetDatasUseCase } from '../../../../../src/modules/hello-charly/domain/usecases/get-datas.usecase';
import { HelloCharlyData } from 'src/modules/hello-charly/domain/models/data.model';

describe('HelloCharlyGetDatasUsecase', () => {
  let usecase: HelloCharlyGetDatasUseCase;
  let mockHelloCharlyRepository: DeepMocked<HelloCharlyRepository>;

  beforeEach(async () => {
    mockHelloCharlyRepository = createMock<HelloCharlyRepository>();
    usecase = new HelloCharlyGetDatasUseCase(mockHelloCharlyRepository);
  });

  it('should return an array of datas', async () => {
    // arrange
    const expectedResult: HelloCharlyData[] = [
      {
        data: 'Data 1',
        createdAt: new Date(),
      },
      {
        data: 'Data 2',
        createdAt: new Date(),
      },
    ];

    mockHelloCharlyRepository.findAll.mockResolvedValue(expectedResult);

    // act
    const result: HelloCharlyData[] = await usecase.execute();

    // assert
    expect(result).toEqual(expectedResult);
  });
});
