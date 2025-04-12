import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':postId/:userId')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.likesService.findOne(+userId, +postId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':postId/:userId')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.likesService.remove(+userId, +postId);
  }
}
