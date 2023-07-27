import { Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  UploadedFile,
  MemoryStorageFile,
  FileInterceptor,
} from '@blazity/nest-file-fastify';
import { UploadFileUsecase } from '../../domain/usecases/upload-file.usecase';

@Controller('todos')
export class TodoController {
  constructor(private readonly uploadFileUsecase: UploadFileUsecase) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: MemoryStorageFile) {
    this.uploadFileUsecase.execute(file);
  }
}
