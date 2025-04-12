import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':postId/:userId')
  findOne(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.likesService.findOne(+userId, +postId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':postId/:userId')
  remove(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.likesService.remove(+userId, +postId);
  }
}
