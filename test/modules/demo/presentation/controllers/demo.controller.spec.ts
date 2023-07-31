import { TestingModule, Test } from '@nestjs/testing';
import { DemoController } from '../../../../../src/modules/demo/presentation/controllers/demo.controller';
import { GetHelloUsecase } from '../../../../../src/modules/demo/domain/usecases/get-hello.usecase';
import { UploadFileUsecase } from '../../../../../src/modules/demo/domain/usecases/upload-file.usecase';

describe('DemoController', () => {
  let controller: DemoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoController],
      providers: [GetHelloUsecase, UploadFileUsecase],
    }).compile();

    controller = module.get<DemoController>(DemoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // arrange
      const expectedResult = 'Hello World!';

      // act
      const result = controller.getHello();

      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});
