import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import {
  UploadedFile,
  MemoryStorageFile,
  FileInterceptor,
} from '@blazity/nest-file-fastify';
import { UploadFileUsecase } from '../../domain/usecases/upload-file.usecase';
import { GetHelloUsecase } from '../../domain/usecases/get-hello.usecase';

@Controller('demo')
export class DemoController {
  constructor(
    private readonly getHelloUsecase: GetHelloUsecase,
    private readonly uploadFileUsecase: UploadFileUsecase,
  ) {}

  @Get()
  getHello(): string {
    return this.getHelloUsecase.execute();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: MemoryStorageFile): void {
    this.uploadFileUsecase.execute(file);
  }
}
