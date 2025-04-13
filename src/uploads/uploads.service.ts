import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private readonly s3Client: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION') || 'ap-southeast-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey:
          this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
      },
    });
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET') || '';
  }
  // async uploadFile(file: Express.Multer.File): Promise<string> {
  async generatePresignedUrl(
    fileExtension: string,
    contentType: string,
  ): Promise<{
    url: string;
    key: string;
  }> {
    // Generate a unique key for the file
    const key = `images/${uuidv4()}-${fileExtension}`;

    // Create a command to put an object in the S3 bucket
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    // Generate a presigned URL for the command
    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600, // URL will be valid for 1 hour
    });

    return { url, key };
  }

  getImageUrl(key: string): string {
    return `https://${this.bucket}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${key}`;
  }

  async getPresignedUrlForViewing(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: 3600, // URL expires in 1 hour
    });
  }
}
