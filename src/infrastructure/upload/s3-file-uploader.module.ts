import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { S3 } from 'aws-sdk';

export class S3FileUploader {
  private readonly s3: S3;

  private readonly bucket: string = process.env.AWS_S3_BUCKET;

  constructor() {
    this.s3 = new S3();
  }

  upload(file: MemoryStorageFile): Promise<void> {
    const key = `${Date.now()}-${file.fieldname}`;
    const contentType = file.mimetype;
    const buffer = file.buffer;

    return this.uploadFile(key, buffer, contentType);
  }

  private async uploadFile(
    key: string,
    file: Buffer,
    contentType: string,
  ): Promise<void> {
    await this.s3
      .putObject({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: contentType,
      })
      .promise();
  }

  async deleteFile(bucket: string, key: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();
  }
}
