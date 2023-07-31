import { Module } from '@nestjs/common';
import { S3FileUploaderService } from './upload/s3-file-uploader.service';

@Module({
  providers: [
    // MODULE D'UPLOAD S3
    S3FileUploaderService,
  ],
})
export class CommonModule {}
