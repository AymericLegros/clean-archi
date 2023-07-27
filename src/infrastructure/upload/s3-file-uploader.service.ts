import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3FileUploaderService {
  private readonly s3Client: S3Client;

  private readonly region: string = process.env.AWS_S3_REGION;
  private readonly bucket: string = process.env.AWS_S3_BUCKET;

  constructor() {
    this.s3Client = new S3Client({ region: this.region });
  }

  upload(file: MemoryStorageFile): Promise<void> {
    const key = `${file.fieldname}-${Date.now()}`;
    const contentType = file.mimetype;
    const buffer = file.buffer;

    return this.uploadFile(key, buffer, contentType);
  }

  private async uploadFile(
    key: string,
    file: Buffer,
    contentType: string,
  ): Promise<void> {
    try {
      await this.createBucketIfNotExists(this.bucket);

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ContentType: contentType,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  private async createBucketIfNotExists(bucket: string): Promise<void> {
    try {
      await this.s3Client.send(
        new CreateBucketCommand({
          Bucket: bucket,
        }),
      );
    } catch (error) {
      if (error.name !== 'BucketAlreadyOwnedByYou') {
        throw error;
      }
    }
  }

  private async deleteFile(key: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
