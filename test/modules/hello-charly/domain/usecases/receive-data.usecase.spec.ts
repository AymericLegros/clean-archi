import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { HelloCharlyReceiveDataUseCase } from '../../../../../src/modules/hello-charly/domain/usecases/receive-data.usecase';
import { HelloCharlyRepository } from '../../../../../src/modules/hello-charly/domain/repositories/hello-charly.repository';

describe('HelloCharlyReceiveDataUsecase', () => {
  let usecase: HelloCharlyReceiveDataUseCase;
  let mockHelloCharlyRepository: DeepMocked<HelloCharlyRepository>;

  beforeEach(async () => {
    mockHelloCharlyRepository = createMock<HelloCharlyRepository>();
    usecase = new HelloCharlyReceiveDataUseCase(mockHelloCharlyRepository);
  });

  it('should return true if data received', async () => {
    // arrange
    mockHelloCharlyRepository.create.mockResolvedValue(true);

    // act
    const params = {};
    const result = await usecase.execute(params);

    // assert
    expect(result).toEqual(true);
  });
});
