import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFileUsecase {
  async execute(file: MemoryStorageFile) {
    console.log(file);
  }
}
