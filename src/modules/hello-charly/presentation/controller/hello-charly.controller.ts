import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { HelloCharlyReceiveDataUseCase } from '../../domain/usecases/receive-data.usecase';
import { HelloCharlyGetDatasUseCase } from '../../domain/usecases/get-datas.usecase';

@Controller('hello-charly')
export class HelloCharlyController {
  constructor(
    private readonly helloCharlyReceiveDataUseCase: HelloCharlyReceiveDataUseCase,
    private readonly helloCharlyGetDatasUseCase: HelloCharlyGetDatasUseCase,
  ) {}

  @Post('receive-data')
  @HttpCode(201)
  async receiveData(@Body() params: Body): Promise<string> {
    await this.helloCharlyReceiveDataUseCase.execute(params);
    return 'Created';
  }

  @Get()
  findAll() {
    const datas = this.helloCharlyGetDatasUseCase.execute();
    return datas;
  }
}
