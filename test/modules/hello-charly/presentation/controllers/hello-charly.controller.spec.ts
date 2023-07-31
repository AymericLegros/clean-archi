import { Test } from '@nestjs/testing';
import { HelloCharlyController } from '../../../../../src/modules/hello-charly/presentation/controller/hello-charly.controller';
import { HelloCharlyReceiveDataUseCase } from '../../../../../src/modules/hello-charly/domain/usecases/receive-data.usecase';
import { HelloCharlyGetDatasUseCase } from '../../../../../src/modules/hello-charly/domain/usecases/get-datas.usecase';
import { HelloCharlyData } from '../../../../../src/modules/hello-charly/domain/models/data.model';

describe('HelloCharlyController', () => {
  let helloCharlyController: HelloCharlyController;
  let helloCharlyReceiveDataUseCase: HelloCharlyReceiveDataUseCase;
  let helloCharlyGetDatasUseCase: HelloCharlyGetDatasUseCase;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [HelloCharlyController],
      providers: [HelloCharlyReceiveDataUseCase, HelloCharlyGetDatasUseCase],
    }).compile();

    helloCharlyController = moduleFixture.get(HelloCharlyController);
    helloCharlyReceiveDataUseCase = moduleFixture.get(
      HelloCharlyReceiveDataUseCase,
    );
    helloCharlyGetDatasUseCase = moduleFixture.get(HelloCharlyGetDatasUseCase);
  });

  it('should be defined', () => {
    expect(helloCharlyController).toBeDefined();
  });

  describe('receiveData', () => {
    it('should return "Created"', async () => {
      // arrange
      const params = {};
      const expectedResult = 'Created';
      jest
        .spyOn(helloCharlyReceiveDataUseCase, 'execute')
        .mockImplementation(async () => Promise.resolve(true));

      // act
      const result = await helloCharlyController.receiveData(params);

      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
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
      jest
        .spyOn(helloCharlyGetDatasUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(expectedResult));

      // act
      const result = await helloCharlyController.findAll();

      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});
