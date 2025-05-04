import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION', 'ap-southeast-2'),
    });
  }

  async uploadFile(
    file: Buffer,
    key: string,
    bucket?: string,
    contentType?: string,
  ): Promise<string> {
    const bucketName = bucket || this.configService.get<string>('S3_BUCKET_UPLOADS');

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
    };

    await this.s3Client.send(new PutObjectCommand(params));

    return key;
  }

  async getSignedUrl(
    key: string,
    bucket?: string,
    expiresIn = 3600,
  ): Promise<string> {
    const bucketName = bucket || this.configService.get<string>('S3_BUCKET_UPLOADS');

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  async getFile(key: string, bucket?: string): Promise<Buffer> {
    const bucketName = bucket || this.configService.get<string>('S3_BUCKET_UPLOADS');

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    
    // Convert stream to buffer
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      response.Body.on('data', (chunk) => chunks.push(chunk));
      response.Body.on('end', () => resolve(Buffer.concat(chunks)));
      response.Body.on('error', reject);
    });
  }

  async deleteFile(key: string, bucket?: string): Promise<void> {
    const bucketName = bucket || this.configService.get<string>('S3_BUCKET_UPLOADS');

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }
}
