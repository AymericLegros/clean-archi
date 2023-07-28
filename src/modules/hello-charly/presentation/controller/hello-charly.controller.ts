import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { HelloCharlyReceiveDataUseCase } from '../../domain/usecases/receive-data.usecase';

@Controller('hello-charly')
export class HelloCharlyController {
  constructor(
    private readonly helloCharlyReceiveDataUseCase: HelloCharlyReceiveDataUseCase,
  ) {}

  @Post('receive-data')
  @HttpCode(200)
  receiveData(@Body() params: Body): string {
    console.log(params);
    const result = this.helloCharlyReceiveDataUseCase.execute(params);
    if (result) {
      return 'Data received';
    }
  }
}
