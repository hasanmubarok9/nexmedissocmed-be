import { Controller, Get, Post, UseGuards, Body, Param } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presigned-url')
  @UseGuards(JwtAuthGuard)
  async getPresignedUrl(@Body() body: { fileExtension: string, contentType: string }) {
    const { fileExtension, contentType } = body;
    const { url, key } = await this.uploadsService.generatePresignedUrl(fileExtension, contentType);

    return {
      presignedUrl: url,
      key,
      imageUrl: this.uploadsService.getImageUrl(key),
    };
  }

  @Get('presigned-url/:key')
  async getPresignedUrlForViewing(@Param('key') key: string) {
    const url = await this.uploadsService.getPresignedUrlForViewing(key);
    return { url };
  }
}
